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

// GET /api/leads/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await verifyAuth(request)
    
    const lead = await prisma.lead.findUnique({
      where: { id: params.id },
      include: {
        operator: {
          select: { id: true, name: true, email: true }
        },
        products: {
          include: { product: true }
        },
        comments: {
          include: {
            user: { select: { name: true, email: true } }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Operators can only see their own leads
    if (currentUser.role === 'OPERATOR' && lead.operatorId !== currentUser.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    return NextResponse.json({ lead })
  } catch (error) {
    console.error('[LEADS] Get error:', error)
    return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 })
  }
}

// PATCH /api/leads/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await verifyAuth(request)
    
    const body = await request.json()
    const { name, email, phone, status, operatorId } = body

    const existingLead = await prisma.lead.findUnique({
      where: { id: params.id }
    })

    if (!existingLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Operators can only update their own leads
    if (currentUser.role === 'OPERATOR' && existingLead.operatorId !== currentUser.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const updateData: any = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (phone !== undefined) updateData.phone = phone
    if (status) updateData.status = status
    if (operatorId !== undefined) updateData.operatorId = operatorId

    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: updateData,
      include: {
        operator: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    return NextResponse.json({ lead })
  } catch (error) {
    console.error('[LEADS] Update error:', error)
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
  }
}

// DELETE /api/leads/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await verifyAuth(request)
    
    if (currentUser.role === 'OPERATOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    await prisma.lead.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Lead deleted successfully' })
  } catch (error) {
    console.error('[LEADS] Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 })
  }
}
