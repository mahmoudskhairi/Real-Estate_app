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

// GET /api/claims - List all claims
export async function GET(request: NextRequest) {
  try {
    const currentUser = await verifyAuth(request)
    
    const whereClause: any = {}
    
    // Operators only see assigned claims
    if (currentUser.role === 'OPERATOR') {
      whereClause.operatorId = currentUser.id
    }
    
    // Clients only see their claims
    if (currentUser.role === 'CLIENT') {
      const client = await prisma.client.findUnique({
        where: { userId: currentUser.id }
      })
      if (client) {
        whereClause.clientId = client.id
      }
    }

    const claims = await prisma.claim.findMany({
      where: whereClause,
      include: {
        client: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            }
          }
        },
        operator: {
          select: { id: true, name: true, email: true }
        },
        comments: {
          include: {
            user: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        attachments: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ claims })
  } catch (error) {
    console.error('[CLAIMS] List error:', error)
    return NextResponse.json({ error: 'Failed to fetch claims' }, { status: 500 })
  }
}

// POST /api/claims - Create new claim
export async function POST(request: NextRequest) {
  try {
    const currentUser = await verifyAuth(request)
    
    const body = await request.json()
    const { title, description, clientId } = body

    if (!title || !description || !clientId) {
      return NextResponse.json({ error: 'Title, description, and clientId are required' }, { status: 400 })
    }

    // If user is a client, verify they're creating claim for themselves
    if (currentUser.role === 'CLIENT') {
      const client = await prisma.client.findUnique({
        where: { userId: currentUser.id }
      })
      if (client?.id !== clientId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
      }
    }

    const claim = await prisma.claim.create({
      data: {
        title,
        description,
        status: 'SUBMITTED',
        clientId,
      },
      include: {
        client: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            }
          }
        }
      }
    })

    return NextResponse.json({ claim }, { status: 201 })
  } catch (error) {
    console.error('[CLAIMS] Create error:', error)
    return NextResponse.json({ error: 'Failed to create claim' }, { status: 500 })
  }
}
