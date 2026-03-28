import { Hono } from 'hono'
import { initDatabase } from '../db/db'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { loginUser, registerUser } from './controllers/auth'
const app = new Hono()

const db = initDatabase()
app.use("*", cors());
app.use("*", logger());

const registerSchema = z.object({
  username: z.string().min(3).max(25),
  password: z.string().min(5),
  role: z.enum(["user", "admin"]).optional()
})

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})

app.post('/register-user', zValidator('json', registerSchema), (c) => registerUser(c, db))

// login
app.post('/login-user', zValidator('json', loginSchema), (c) => loginUser(c, db))

app.get('/', (c) => {
  return c.text('Hello, User & Task management using bun and hono!')
})

app.get('/db-test', (c) => {
  const result = db.query('SELECT sqlite_version()').get();

  return c.json({
    message: "Database connected successfully",
    sqlite_version: result,
  })
})

export default app
