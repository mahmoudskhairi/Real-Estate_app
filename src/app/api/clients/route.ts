import { NextRequest, NextResponse } from 'next/server'
import { verify } from 'hono/jwt'
import prisma from '@/server/db'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  if (!token) throw new Error('Not authenticated')
  
  const payload = await verify(token, JWT_SECRET) as any
  const user = await prisma.user.findUnique({ where: { id: payload.id } })
  if (!user) throw new Error('User not found')
  
  return user
}

// GET /api/clients - List all clients
export async function GET(request: NextRequest) {
  try {
    const currentUser = await verifyAuth(request)
    
    const whereClause: any = {}
    
    // Clients can only see themselves
    if (currentUser.role === 'CLIENT') {
      whereClause.userId = currentUser.id
    }

    const clients = await prisma.client.findMany({
      where: whereClause,
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        products: {
          include: { product: true }
        },
        claims: {
          include: {
            operator: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ clients })
  } catch (error) {
    console.error('[CLIENTS] List error:', error)
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}

// POST /api/clients - Create new client (ADMIN only)
export async function POST(request: NextRequest) {
  try {
    const currentUser = await verifyAuth(request)
    
    if (currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const client = await prisma.client.create({
      data: { userId },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    return NextResponse.json({ client }, { status: 201 })
  } catch (error) {
    console.error('[CLIENTS] Create error:', error)
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}
