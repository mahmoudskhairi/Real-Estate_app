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
  try {
    const { email, password } = c.req.valid('json')

    console.log('[AUTH] Login attempt for:', email)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      console.log('[AUTH] User not found:', email)
      return c.json({ error: 'Invalid credentials' }, 401)
    }

    console.log('[AUTH] User found, verifying password')
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      console.log('[AUTH] Invalid password for:', email)
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

    console.log('[AUTH] Login successful for:', email)
    return c.json({ 
      user: { 
        id: user.id, 
        email: user.email, 
        role: user.role, 
        name: user.name,
        phone: user.phone,
        emailNotifications: user.emailNotifications,
        pushNotifications: user.pushNotifications,
        smsNotifications: user.smsNotifications,
        theme: user.theme,
      } 
    })
  } catch (error) {
    console.error('[AUTH] Login error:', error)
    return c.json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' }, 500)
  }
})

auth.get('/me', async (c) => {
  try {
    const user = c.get('user')
    if (!user) {
      return c.json({ error: 'Not authenticated' }, 401)
    }

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
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

    if (!fullUser) {
      return c.json({ error: 'User not found' }, 404)
    }

    return c.json(fullUser)
  } catch (error) {
    console.error('[AUTH] Error fetching user:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
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
