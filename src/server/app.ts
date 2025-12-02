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

const app = new Hono().basePath('/api')

app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', secureHeaders())
app.use('*', cors())

app.route('/auth', auth)
app.route('/users', users)
app.route('/leads', leads)
app.route('/products', products)
app.route('/clients', clients)
app.route('/claims', claims)

export default app
