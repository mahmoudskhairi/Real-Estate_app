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

// GET /api/leads - List all leads
export async function GET(request: NextRequest) {
  try {
    const currentUser = await verifyAuth(request)
    
    const whereClause: any = {}
    
    // Operators only see their assigned leads
    if (currentUser.role === 'OPERATOR') {
      whereClause.operatorId = currentUser.id
    }

    const leads = await prisma.lead.findMany({
      where: whereClause,
      include: {
        operator: {
          select: { id: true, name: true, email: true }
        },
        products: {
          include: {
            product: true
          }
        },
        comments: {
          include: {
            user: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ leads })
  } catch (error) {
    console.error('[LEADS] List error:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

// POST /api/leads - Create new lead
export async function POST(request: NextRequest) {
  try {
    const currentUser = await verifyAuth(request)
    
    const body = await request.json()
    const { name, email, phone, status, operatorId } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        status: status || 'NEW',
        operatorId: operatorId || null,
      },
      include: {
        operator: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    return NextResponse.json({ lead }, { status: 201 })
  } catch (error) {
    console.error('[LEADS] Create error:', error)
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }
}
