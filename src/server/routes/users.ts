import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import bcrypt from 'bcryptjs'
import prisma from '../db'
import { authMiddleware, roleMiddleware } from '../middleware/auth'

const users = new Hono()

// Apply auth middleware to all routes
users.use('*', authMiddleware)

const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'SUPERVISOR', 'OPERATOR', 'CLIENT']),
  supervisorId: z.string().optional(),
  operatorId: z.string().optional(),
})

// Helper function to check if user can create specific role
function canCreateRole(currentUserRole: string, targetRole: string): boolean {
  switch (currentUserRole) {
    case 'ADMIN':
      return ['SUPERVISOR', 'OPERATOR', 'CLIENT'].includes(targetRole);
    case 'SUPERVISOR':
      return ['OPERATOR', 'CLIENT'].includes(targetRole);
    case 'OPERATOR':
      return ['CLIENT'].includes(targetRole);
    case 'CLIENT':
      return false;
    default:
      return false;
  }
}

// Helper function to filter users based on current user's role
function filterUsersByRole(users: any[], currentUser: any, operatorsOfSupervisor: any[]) {
  switch (currentUser.role) {
    case 'ADMIN':
      return users; // Can see all users
    case 'SUPERVISOR':
      // Can see their assigned operators and clients of those operators
      const operatorIds = operatorsOfSupervisor.map(op => op.id);
      return users.filter(u => 
        (u.role === 'OPERATOR' && u.supervisorId === currentUser.id) || 
        (u.role === 'CLIENT' && u.clientProfile && operatorIds.includes(u.clientProfile.operatorId))
      );
    case 'OPERATOR':
       // Can only see clients assigned to them
      return users.filter(u => u.role === 'CLIENT' && u.clientProfile && u.clientProfile.operatorId === currentUser.id);
    case 'CLIENT':
      return []; // Can't see any other users
    default:
      return [];
  }
}

// GET /users - List users based on role permissions
users.get('/', roleMiddleware(['ADMIN', 'SUPERVISOR', 'OPERATOR']), async (c) => {
  try {
    const currentUser = c.get('user')
    const { role } = c.req.query()

    let whereClause: any = {};

    if (role) {
      whereClause.role = role.toUpperCase();
    }
    
    let operatorsOfSupervisor: any[] = [];
    if (currentUser.role === 'SUPERVISOR') {
        operatorsOfSupervisor = await prisma.user.findMany({
            where: { supervisorId: currentUser.id, role: 'OPERATOR' },
            select: { id: true }
        });
    }

    // Get all users
    const allUsers = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        supervisorId: true,
        supervisor: { select: { name: true } },
        clientProfile: {
          select: {
            operatorId: true,
            operator: { select: { name: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    })

    const usersWithOperator = allUsers.map(u => ({
      ...u,
      operator: u.clientProfile?.operator
    }));
    
    // Filter based on current user's role
    const filteredUsers = filterUsersByRole(usersWithOperator, currentUser, operatorsOfSupervisor)
    
    return c.json(filteredUsers)
  } catch (error) {
    console.error('Error fetching users:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// POST /users - Create new user (with role hierarchy validation)
users.post('/', roleMiddleware(['ADMIN', 'SUPERVISOR', 'OPERATOR']), zValidator('json', createUserSchema), async (c) => {
  try {
    const currentUser = c.get('user')
    const { name, email, phone, password, role, supervisorId, operatorId } = c.req.valid('json')
    
    // Check if current user can create this role
    if (!canCreateRole(currentUser.role, role)) {
      return c.json({ 
        error: `You don't have permission to create ${role} users` 
      }, 403)
    }

    if (supervisorId && !['ADMIN', 'SUPERVISOR'].includes(currentUser.role)) {
        return c.json({ error: 'You do not have permission to assign a supervisor.' }, 403);
    }

    if (operatorId && !['ADMIN', 'SUPERVISOR'].includes(currentUser.role)) {
        return c.json({ error: 'You do not have permission to assign an operator to a client.' }, 403);
    }
    
    // Check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return c.json({ error: 'User with this email already exists' }, 400)
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        role,
        supervisorId: supervisorId || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })
    
    // If creating a CLIENT, also create the client profile
    if (role === 'CLIENT') {
      await prisma.client.create({
        data: {
          userId: newUser.id,
          operatorId: operatorId || null,
        },
      })
    }
    
    console.log(`User created: ${email} with role ${role} by ${currentUser.email}`)
    return c.json(newUser, 201)
  } catch (error) {
    console.error('Error creating user:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  smsNotifications: z.boolean().optional(),
  theme: z.enum(['dark', 'light']).optional(),
})

users.patch('/:id', zValidator('json', updateUserSchema), async (c) => {
  try {
    const currentUser = c.get('user')
    const userId = c.req.param('id')
    const updateData = c.req.valid('json')
    
    // Get the target user
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, email: true },
    })
    
    if (!targetUser) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    // Users can only update themselves unless they have management permissions
    if (userId !== currentUser.id) {
      // Check if current user can manage this user
      const filteredUsers = filterUsersByRole([targetUser], currentUser.role)
      if (filteredUsers.length === 0) {
        return c.json({ error: 'Access denied' }, 403)
      }
      
      // If trying to change role, check permissions
      if (updateData.role && !canCreateRole(currentUser.role, updateData.role)) {
        return c.json({ 
          error: `You don't have permission to assign ${updateData.role} role` 
        }, 403)
      }
    }
    
    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: true,
        theme: true,
        updatedAt: true,
      },
    })
    
    console.log(`User updated: ${targetUser.email} by ${currentUser.email}`)
    return c.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// DELETE /users/:id - Delete user (ADMIN only)
users.delete('/:id', roleMiddleware(['ADMIN']), async (c) => {
  try {
    const currentUser = c.get('user')
    const userId = c.req.param('id')
    
    // Prevent self-deletion
    if (userId === currentUser.id) {
      return c.json({ error: 'Cannot delete your own account' }, 400)
    }
    
    // Get the target user
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true },
    })
    
    if (!targetUser) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    // Delete related records first for CLIENT users
    if (targetUser.role === 'CLIENT') {
      // Delete client profile and related records
      const client = await prisma.client.findUnique({
        where: { userId },
        select: { id: true }
      })
      
      if (client) {
        // Delete claims and related data
        await prisma.attachment.deleteMany({
          where: { claim: { clientId: client.id } }
        })
        await prisma.comment.deleteMany({
          where: { claim: { clientId: client.id } }
        })
        await prisma.activityLog.deleteMany({
          where: { claim: { clientId: client.id } }
        })
        await prisma.claim.deleteMany({
          where: { clientId: client.id }
        })
        
        // Delete client products
        await prisma.clientProduct.deleteMany({
          where: { clientId: client.id }
        })
        
        // Delete client profile
        await prisma.client.delete({
          where: { id: client.id }
        })
      }
    }
    
    // Delete other related records for any user
    await prisma.comment.deleteMany({
      where: { userId }
    })
    await prisma.activityLog.deleteMany({
      where: { userId }
    })
    
    // Update leads and claims to remove operator references
    await prisma.lead.updateMany({
      where: { operatorId: userId },
      data: { operatorId: null }
    })
    await prisma.claim.updateMany({
      where: { operatorId: userId },
      data: { operatorId: null }
    })
    
    // Finally delete the user
    await prisma.user.delete({
      where: { id: userId },
    })
    
    console.log(`User deleted: ${targetUser.email} by ${currentUser.email}`)
    return c.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

export default users
