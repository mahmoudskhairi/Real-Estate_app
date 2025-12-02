import { Hono } from 'hono'
import prisma from '../db'
import { authMiddleware } from '../middleware/auth'

const clients = new Hono()

clients.use('*', authMiddleware)

clients.get('/', async (c) => {
  const allClients = await prisma.client.findMany({
    include: {
      user: { select: { name: true, email: true } },
      products: { include: { product: true } },
    },
  })
  return c.json(allClients)
})

clients.get('/:id', async (c) => {
  const id = c.req.param('id')
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      products: { include: { product: true } },
      claims: true,
    },
  })
  
  if (!client) return c.json({ error: 'Client not found' }, 404)
  
  return c.json(client)
})

export default clients
