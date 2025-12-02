import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import prisma from '../db'
import { authMiddleware } from '../middleware/auth'

const leads = new Hono()

leads.use('*', authMiddleware)

const createLeadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']).optional(),
  operatorId: z.string().optional(),
})

leads.get('/', async (c) => {
  const allLeads = await prisma.lead.findMany({
    include: { operator: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return c.json(allLeads)
})

leads.post('/', zValidator('json', createLeadSchema), async (c) => {
  const data = c.req.valid('json')
  const lead = await prisma.lead.create({ data })
  return c.json(lead)
})

leads.patch('/:id/status', zValidator('json', z.object({ status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']) })), async (c) => {
  const id = c.req.param('id')
  const { status } = c.req.valid('json')
  
  const lead = await prisma.lead.update({
    where: { id },
    data: { status },
  })
  
  return c.json(lead)
})

export default leads
