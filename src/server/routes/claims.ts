import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import prisma from '../db'
import { authMiddleware } from '../middleware/auth'

const claims = new Hono()

claims.use('*', authMiddleware)

const createClaimSchema = z.object({
  title: z.string(),
  description: z.string(),
  clientId: z.string().optional(), // Optional for CLIENT users
})

claims.get('/', async (c) => {
  const user = c.get('user')
  
  // If user is CLIENT, only show their claims
  if (user.role === 'CLIENT') {
    // Find the client profile associated with this user
    const clientProfile = await prisma.client.findUnique({
      where: { userId: user.id },
    })
    
    if (!clientProfile) {
      return c.json([]) // No client profile yet
    }
    
    const userClaims = await prisma.claim.findMany({
      where: { clientId: clientProfile.id },
      include: {
        client: { include: { user: { select: { name: true } } } },
        operator: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    return c.json(userClaims)
  }
  
  // For ADMIN, SUPERVISOR, OPERATOR - show all claims
  const allClaims = await prisma.claim.findMany({
    include: {
      client: { include: { user: { select: { name: true } } } },
      operator: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
  return c.json(allClaims)
})

claims.post('/', zValidator('json', createClaimSchema), async (c) => {
  const user = c.get('user')
  const { title, description, clientId } = c.req.valid('json')
  
  let finalClientId = clientId
  
  // If user is CLIENT, automatically find their client profile
  if (user.role === 'CLIENT') {
    const clientProfile = await prisma.client.findUnique({
      where: { userId: user.id },
    })
    
    if (!clientProfile) {
      // Create client profile if it doesn't exist
      const newClientProfile = await prisma.client.create({
        data: { userId: user.id },
      })
      finalClientId = newClientProfile.id
    } else {
      finalClientId = clientProfile.id
    }
  } else {
    // Non-client users must provide clientId
    if (!clientId) {
      return c.json({ error: 'clientId is required for non-client users' }, 400)
    }
  }
  
  const claim = await prisma.claim.create({
    data: {
      title,
      description,
      clientId: finalClientId,
      status: 'SUBMITTED',
    },
    include: {
      client: { include: { user: { select: { name: true } } } },
      operator: { select: { name: true } },
    },
  })
  
  return c.json(claim)
})

claims.patch('/:id/status', zValidator('json', z.object({ status: z.enum(['SUBMITTED', 'IN_REVIEW', 'RESOLVED']) })), async (c) => {
  const id = c.req.param('id')
  const { status } = c.req.valid('json')
  
  const claim = await prisma.claim.update({
    where: { id },
    data: { status },
  })
  
  return c.json(claim)
})

// Placeholder for S3 Presigned URL
claims.post('/upload-url', zValidator('json', z.object({ filename: z.string(), contentType: z.string() })), async (c) => {
  const { filename, contentType } = c.req.valid('json')
  // In a real app, use AWS SDK to generate presigned URL
  // const command = new PutObjectCommand({ Bucket: '...', Key: filename, ContentType: contentType })
  // const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
  
  return c.json({ 
    uploadUrl: `https://fake-s3-url.com/${filename}`, 
    publicUrl: `https://fake-s3-url.com/${filename}` 
  })
})

export default claims
