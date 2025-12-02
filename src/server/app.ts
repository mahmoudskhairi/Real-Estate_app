import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'
import auth from './routes/auth'
import users from './routes/users'
import leads from './routes/leads'
import products from './routes/products'
import clients from './routes/clients'
import claims from './routes/claims'
import prisma from './db'

const app = new Hono().basePath('/api')

app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', secureHeaders())
app.use('*', cors())

// Health check endpoint
app.get('/health', async (c) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    const userCount = await prisma.user.count()
    
    return c.json({
      status: 'ok',
      database: 'connected',
      userCount,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        hasJwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV,
      }
    })
  } catch (error) {
    return c.json({
      status: 'error',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        hasJwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV,
      }
    }, 500)
  }
})

app.route('/auth', auth)
app.route('/users', users)
app.route('/leads', leads)
app.route('/products', products)
app.route('/clients', clients)
app.route('/claims', claims)

export default app
