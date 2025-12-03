import { NextRequest, NextResponse } from 'next/server'
import { verify } from 'hono/jwt'
import prisma from '@/server/db'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  if (!token) throw new Error('Not authenticated')
  
  const payload = await verify(token, JWT_SECRET) as any
  const user = await prisma.user.findUnique({ where: { id: payload.id } })
  if (!user) throw new Error('User not found')
  
  return user
}

// GET /api/users/[id] - Get single user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await verifyAuth(request)
    
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('[USERS] Get error:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

// PATCH /api/users/[id] - Update user profile
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await verifyAuth(request)
    
    // Users can only update their own profile unless they're admin
    if (currentUser.role !== 'ADMIN' && currentUser.id !== params.id) {
      return NextResponse.json({ error: 'Forbidden: You can only update your own profile' }, { status: 403 })
    }

    const body = await request.json()
    console.log('[USERS] Update request for user:', params.id, 'Data:', body)
    
    const { 
      email, 
      password, 
      name, 
      phone,
      role, 
      emailNotifications, 
      pushNotifications, 
      smsNotifications, 
      theme 
    } = body

    const updateData: any = {}
    if (email !== undefined) updateData.email = email
    if (name !== undefined) updateData.name = name
    if (phone !== undefined) updateData.phone = phone
    if (password) updateData.password = await bcrypt.hash(password, 10)
    if (role && currentUser.role === 'ADMIN') updateData.role = role
    if (emailNotifications !== undefined) updateData.emailNotifications = emailNotifications
    if (pushNotifications !== undefined) updateData.pushNotifications = pushNotifications
    if (smsNotifications !== undefined) updateData.smsNotifications = smsNotifications
    if (theme !== undefined) updateData.theme = theme

    console.log('[USERS] Updating with data:', updateData)

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
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
        updatedAt: true,
      }
    })

    console.log('[USERS] Update successful:', user)
    return NextResponse.json(user)
  } catch (error) {
    console.error('[USERS] Update error:', error)
    return NextResponse.json({ 
      error: 'Failed to update user',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// DELETE /api/users/[id] - Delete user (ADMIN only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await verifyAuth(request)
    
    if (currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    if (currentUser.id === params.id) {
      return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 })
    }

    await prisma.user.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('[USERS] Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
