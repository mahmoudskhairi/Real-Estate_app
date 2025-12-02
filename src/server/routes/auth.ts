import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import bcrypt from 'bcryptjs'
import prisma from '../db'

const auth = new Hono()
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json')

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 day
  }

  const token = await sign(payload, JWT_SECRET)

  setCookie(c, 'token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return c.json({ user: { id: user.id, email: user.email, role: user.role, name: user.name } })
})

auth.post('/logout', (c) => {
  setCookie(c, 'token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',
    maxAge: 0,
  })
  return c.json({ message: 'Logged out' })
})

export default auth
