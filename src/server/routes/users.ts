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
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  role: z.enum(['ADMIN', 'SUPERVISOR', 'OPERATOR', 'CLIENT']),
})

// Admin only routes
users.get('/', roleMiddleware(['ADMIN']), async (c) => {
  const allUsers = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  })
  return c.json(allUsers)
})

users.post('/', roleMiddleware(['ADMIN']), zValidator('json', createUserSchema), async (c) => {
  const { email, password, name, role } = c.req.valid('json')

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return c.json({ error: 'User already exists' }, 400)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
    },
    select: { id: true, email: true, name: true, role: true },
  })

  return c.json(newUser)
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
  const id = c.req.param('id')
  const updateData = c.req.valid('json')
  const currentUser = c.get('user')

  // Users can only update their own profile unless they're admin
  if (currentUser.id !== id && currentUser.role !== 'ADMIN') {
    return c.json({ message: 'Forbidden: You can only update your own profile' }, 403)
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: true,
        theme: true,
      },
    })

    return c.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return c.json({ message: 'Failed to update user' }, 500)
  }
})

export default users
