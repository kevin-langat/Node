import { Hono } from 'hono'
import { initDatabase } from '../db/db'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
const app = new Hono()

const db = initDatabase()
app.use("*", cors());
app.use("*", logger());

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
