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

// GET /api/clients/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await verifyAuth(request)
    
    const client = await prisma.client.findUnique({
      where: { id: params.id },
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
          }
        }
      }
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // Clients can only see themselves
    if (currentUser.role === 'CLIENT' && client.userId !== currentUser.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    return NextResponse.json({ client })
  } catch (error) {
    console.error('[CLIENTS] Get error:', error)
    return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 })
  }
}

// DELETE /api/clients/[id] (ADMIN only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await verifyAuth(request)
    
    if (currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    await prisma.client.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Client deleted successfully' })
  } catch (error) {
    console.error('[CLIENTS] Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 })
  }
}
