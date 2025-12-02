import { Context, Next } from 'hono'
import { getCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

export async function authMiddleware(c: Context, next: Next) {
  const token = getCookie(c, 'token')
  
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const payload = await verify(token, JWT_SECRET)
    c.set('user', payload)
    await next()
  } catch (e) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
}

export function roleMiddleware(allowedRoles: string[]) {
  return async (c: Context, next: Next) => {
    const user = c.get('user')
    if (!user || !allowedRoles.includes(user.role)) {
      return c.json({ error: 'Forbidden' }, 403)
    }
    await next()
  }
}
