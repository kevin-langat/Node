import { Hono } from 'hono'
import { initDatabase } from '../db/db'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { loginUser, registerUser } from './controllers/auth'
import { jwt } from 'hono/jwt'
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from './controllers/tasks'

const app = new Hono()
const db = initDatabase()
app.use("*", cors());
app.use("*", logger());

const auth = jwt({
  secret: process.env.JWT_SECRET || "JWT_SECRET",
  alg: 'HS256',
})
const registerSchema = z.object({
  username: z.string().min(3).max(25),
  password: z.string().min(5),
  role: z.enum(["user", "admin"]).optional()
})

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})

const tasksSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
})

app.post('/register-user', zValidator('json', registerSchema), (c) => registerUser(c, db))

// login 26
app.post('/login-user', zValidator('json', loginSchema), (c) => loginUser(c, db))

// tasks routes 
app.post('/tasks', auth, zValidator('json', tasksSchema), (c) => createTask(c, db))
app.get('/tasks', auth, (c) => getAllTasks(c, db))
app.get('/tasks/:id', auth, (c) => getTask(c, db))
app.put('/tasks/:id', auth, zValidator('json', tasksSchema), (c) => updateTask(c, db))
app.delete('/tasks/:id', auth, (c) => deleteTask(c, db))


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
