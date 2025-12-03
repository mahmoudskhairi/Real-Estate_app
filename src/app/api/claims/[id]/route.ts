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

// GET /api/claims/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await verifyAuth(request)
    
    const claim = await prisma.claim.findUnique({
      where: { id: params.id },
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
      }
    })

    if (!claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
    }

    // Access control
    if (currentUser.role === 'OPERATOR' && claim.operatorId !== currentUser.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    
    if (currentUser.role === 'CLIENT' && claim.client.userId !== currentUser.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    return NextResponse.json({ claim })
  } catch (error) {
    console.error('[CLAIMS] Get error:', error)
    return NextResponse.json({ error: 'Failed to fetch claim' }, { status: 500 })
  }
}

// PATCH /api/claims/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await verifyAuth(request)
    
    const body = await request.json()
    const { title, description, status, operatorId } = body

    const existingClaim = await prisma.claim.findUnique({
      where: { id: params.id },
      include: { client: true }
    })

    if (!existingClaim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
    }

    // Clients cannot update status or operator
    if (currentUser.role === 'CLIENT' && existingClaim.client.userId !== currentUser.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const updateData: any = {}
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (status && currentUser.role !== 'CLIENT') updateData.status = status
    if (operatorId !== undefined && currentUser.role !== 'CLIENT') updateData.operatorId = operatorId

    const claim = await prisma.claim.update({
      where: { id: params.id },
      data: updateData,
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
        }
      }
    })

    return NextResponse.json({ claim })
  } catch (error) {
    console.error('[CLAIMS] Update error:', error)
    return NextResponse.json({ error: 'Failed to update claim' }, { status: 500 })
  }
}

// DELETE /api/claims/[id] (ADMIN/SUPERVISOR only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await verifyAuth(request)
    
    if (!['ADMIN', 'SUPERVISOR'].includes(currentUser.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    await prisma.claim.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Claim deleted successfully' })
  } catch (error) {
    console.error('[CLAIMS] Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete claim' }, { status: 500 })
  }
}
