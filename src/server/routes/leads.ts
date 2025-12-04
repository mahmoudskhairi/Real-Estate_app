import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import prisma from '../db'
import { authMiddleware, roleMiddleware } from '../middleware/auth'
import bcrypt from 'bcryptjs'

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

// POST /api/leads/:id/convert
leads.post('/:id/convert', roleMiddleware(['ADMIN', 'SUPERVISOR', 'OPERATOR']), async (c) => {
  const leadId = c.req.param('id');
  const currentUser = c.get('user');

  try {
    // 1. Find the lead
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return c.json({ message: 'Lead not found' }, 404);
    }

    if (lead.status !== 'WON') {
      return c.json({ message: 'Only "WON" leads can be converted' }, 400);
    }

    // 2. Check if a user with this email already exists
    let user = await prisma.user.findUnique({
      where: { email: lead.email },
    });

    // 3. If user doesn't exist, create a new one
    if (!user) {
      // Generate a random password (or handle this differently)
      const password = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await prisma.user.create({
        data: {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          password: hashedPassword,
          role: 'CLIENT',
        },
      });
      
      console.log(`New user created from lead. Email: ${user.email}, Temp Password: ${password}`);
    }

    // 4. Check if a client profile already exists for this user
    const existingClient = await prisma.client.findUnique({
        where: { userId: user.id },
    });

    // 5. If not, create a new client profile
    if (!existingClient) {
        await prisma.client.create({
            data: {
                userId: user.id,
                // You can add more fields here if needed, e.g., from lead metadata
            },
        });
    }

    // 6. Optionally, delete the lead after conversion
    await prisma.lead.delete({
      where: { id: leadId },
    });

    return c.json({ message: 'Lead converted to client successfully', userId: user.id }, 200);

  } catch (error) {
    console.error('Error converting lead:', error);
    return c.json({ message: 'Internal server error' }, 500);
  }
});


export default leads
