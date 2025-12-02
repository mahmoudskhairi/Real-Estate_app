import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import prisma from '../db'
import { authMiddleware } from '../middleware/auth'

const products = new Hono()

products.use('*', authMiddleware)

const createProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  metadata: z.record(z.any()).optional(), // bedrooms, bathrooms, etc.
})

products.get('/', async (c) => {
  const allProducts = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return c.json(allProducts)
})

products.post('/', zValidator('json', createProductSchema), async (c) => {
  const { name, price, metadata } = c.req.valid('json')
  
  const product = await prisma.product.create({
    data: {
      name,
      price,
      metadata: metadata || {},
    },
  })
  
  return c.json(product)
})

export default products
