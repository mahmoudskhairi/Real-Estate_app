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

// GET /api/products - List all products
export async function GET(request: NextRequest) {
  try {
    await verifyAuth(request)
    
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })

    // Return array directly
    return NextResponse.json(products)
  } catch (error) {
    console.error('[PRODUCTS] List error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

// POST /api/products - Create new product (ADMIN/SUPERVISOR only)
export async function POST(request: NextRequest) {
  try {
    const currentUser = await verifyAuth(request)
    
    if (!['ADMIN', 'SUPERVISOR'].includes(currentUser.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json()
    const { name, description, category, price, metadata } = body

    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        type: category || 'Real Estate',
        price: parseFloat(price),
        metadata: {
          ...metadata,
          description: description || '',
        },
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('[PRODUCTS] Create error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
