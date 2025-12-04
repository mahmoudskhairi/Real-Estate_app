import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import bcrypt from 'bcryptjs'
import prisma from '../db'
import { authMiddleware } from '../middleware/auth'

const clients = new Hono()

clients.use('*', authMiddleware)

const createClientSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
})

clients.get('/', async (c) => {
  const allClients = await prisma.client.findMany({
    include: {
      user: { select: { name: true, email: true, phone: true } },
      operator: { select: { id: true, name: true, email: true } },
      products: { include: { product: true } },
    },
  })
  
  // Transform to match frontend expectations
  const transformedClients = allClients.map(client => ({
    id: client.id,
    name: client.user.name || 'N/A',
    email: client.user.email,
    phone: client.user.phone,
    operatorId: client.operatorId,
    operatorName: client.operator?.name || 'Unassigned',
    operatorEmail: client.operator?.email,
    createdAt: client.createdAt,
  }))
  
  return c.json(transformedClients)
})

clients.post('/', zValidator('json', createClientSchema), async (c) => {
  const data = c.req.valid('json')
  
  try {
    // Check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })
    
    if (existingUser) {
      return c.json({ message: 'User with this email already exists' }, 400)
    }
    
    // Create user with CLIENT role and a default password
    const defaultPassword = await bcrypt.hash('client123', 10)
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        password: defaultPassword,
        role: 'CLIENT',
      },
    })
    
    // Create client profile linked to user
    const client = await prisma.client.create({
      data: {
        userId: user.id,
      },
      include: {
        user: { select: { name: true, email: true, phone: true } },
      },
    })
    
    // Return in format expected by frontend
    return c.json({
      id: client.id,
      name: client.user.name || 'N/A',
      email: client.user.email,
      phone: client.user.phone,
      createdAt: client.createdAt,
    })
  } catch (error) {
    console.error('Error creating client:', error)
    return c.json({ message: 'Failed to create client' }, 500)
  }
})

clients.get('/:id', async (c) => {
  const id = c.req.param('id')
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      products: { include: { product: true } },
      claims: true,
    },
  })
  
  if (!client) return c.json({ error: 'Client not found' }, 404)
  
  return c.json(client)
})

export default clients
