import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import bcrypt from 'bcryptjs'
import prisma from '../db'
import { authMiddleware, roleMiddleware } from '../middleware/auth'

const users = new Hono()

users.use('*', authMiddleware)
users.use('*', roleMiddleware(['ADMIN']))

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  role: z.enum(['ADMIN', 'SUPERVISOR', 'OPERATOR', 'CLIENT']),
})

users.get('/', async (c) => {
  const allUsers = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  })
  return c.json(allUsers)
})

users.post('/', zValidator('json', createUserSchema), async (c) => {
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

export default users
