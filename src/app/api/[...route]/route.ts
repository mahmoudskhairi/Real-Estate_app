import { handle } from 'hono/vercel'
import app from '@/server/app'

export const runtime = 'nodejs' // Prisma needs nodejs runtime

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)
