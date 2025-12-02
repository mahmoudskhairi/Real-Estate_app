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
  clientId: z.string(),
})

claims.get('/', async (c) => {
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
  const { title, description, clientId } = c.req.valid('json')
  
  const claim = await prisma.claim.create({
    data: {
      title,
      description,
      clientId,
      status: 'SUBMITTED',
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
