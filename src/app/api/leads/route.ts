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

    // Map to format the response
    const formattedLeads = leads.map(lead => ({
      id: lead.id,
      title: lead.name,
      description: lead.phone || '',
      status: lead.status,
      contactName: lead.name,
      contactEmail: lead.email,
      assignedToId: lead.operatorId,
      createdAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
    }))

    return NextResponse.json(formattedLeads)
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
    const { title, description, contactName, contactEmail, status, operatorId } = body

    if (!title || !contactEmail) {
      return NextResponse.json({ error: 'Title and contact email are required' }, { status: 400 })
    }

    const lead = await prisma.lead.create({
      data: {
        name: contactName || title,
        email: contactEmail,
        phone: description || '',
        status: status || 'NEW',
        operatorId: operatorId || null,
      },
      include: {
        operator: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    return NextResponse.json({
      id: lead.id,
      title: lead.name,
      description: lead.phone || '',
      status: lead.status,
      contactName: lead.name,
      contactEmail: lead.email,
      assignedToId: lead.operatorId,
      createdAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
    }, { status: 201 })
  } catch (error) {
    console.error('[LEADS] Create error:', error)
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }
}
