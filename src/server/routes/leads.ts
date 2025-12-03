import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import prisma from '../db'
import { authMiddleware } from '../middleware/auth'

const leads = new Hono()

leads.use('*', authMiddleware)

const createLeadSchema = z.object({
  // Accept both old format (name, email) and new format (title, contactName, etc)
  name: z.string().optional(),
  title: z.string().optional(),
  email: z.string().email().optional(),
  contactEmail: z.string().email().optional(),
  phone: z.string().optional(),
  contactName: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']).optional(),
  operatorId: z.string().optional(),
}).refine(
  (data) => (data.name || data.contactName) && (data.email || data.contactEmail),
  { message: 'Either name/email or contactName/contactEmail must be provided' }
)

leads.get('/', async (c) => {
  const allLeads = await prisma.lead.findMany({
    include: { operator: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return c.json(allLeads)
})

leads.post('/', zValidator('json', createLeadSchema), async (c) => {
  const data = c.req.valid('json')
  
  // Transform frontend data to match schema
  const leadData = {
    name: data.name || data.contactName || 'Unknown',
    email: data.email || data.contactEmail || '',
    phone: data.phone,
    status: data.status || 'NEW',
    operatorId: data.operatorId,
  }
  
  const lead = await prisma.lead.create({ 
    data: leadData,
    include: { operator: { select: { name: true } } }
  })
  
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
