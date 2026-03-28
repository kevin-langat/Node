import { password as bunPassword } from 'bun'
import type { Context } from 'hono'
import { Database } from 'bun:sqlite'
import { User } from '../../types';
import { sign } from 'hono/jwt'


export async function registerUser(c: Context, db: Database) {
  const { username, password, role } = await c.req.json();

  if (!username || !password) {
    return c.json({
      error: "Username and password are required"
    }, 400)
  }

  if (role !== 'user' && role !== 'admin') {
    return c.json({
      error: 'Invalid role'
    }, 400)
  }

  try {

    const existingUser = db.query('SELECT * FROM users WHERE username = ?').get(username) as User | undefined
    if (existingUser) {
      return c.json({
        error: "User already exists!"
      }, 400);
    }
    const hashedPassword = await bunPassword.hash(password)

    db.run('INSERT INTO users (username, password, role) VALUES(?,?,?)', [
      username,
      hashedPassword,
      role
    ])

    return c.json({
      message: "User created successfully",
    }, 201)

  } catch (error) {
    console.log(error)
    return c.json({
      error: 'Internal server error'
    }, 500)
  }

}

export async function loginUser(c: Context, db: Database) {
  const { username, password } = await c.req.json();

  if (!username || !password) {
    return c.json({
      error: "Username and password are required"
    }, 400)
  }

  try {
    const user = db.query('SELECT * FROM users WHERE username=?').get(username) as User | undefined

    if (!user) {
      return c.json({
        error: "Invalid credentials!"
      }, 400)
    }

    const isPasswordValid = await bunPassword.verify(password, user.password)
    if (!isPasswordValid) {
      return c.json({
        error: "Invalid Password!"
      }, 400)
    }

    const token = await sign({
      userId: user.id,
      role: user.role
    }, process.env.JWT_SECRET || 'JWT_SECRET')

    return c.json({
      token
    })

  } catch (error) {
    console.log(error)
    return c.json({
      error: 'Internal server error'
    }, 500)
  }
}