import type { Context } from 'hono'
import { Database } from 'bun:sqlite'
import { Task, User } from '../../types';

export async function createTask(c: Context, db: Database) {
  const userId = c.get('jwtPayload').userId;
  const userRole = c.get('jwtPayload').role;

  const { title, description } = await c.req.json()
  if (!userId) {
    return c.json({
      error: "Unauthenticated! Please login to create taks."
    }, 403)
  }
  if (userRole !== 'admin') {
    return c.json({
      error: "Unauthorised! Only admin can create new posts."
    }, 403)
  }
  try {
    const res = db.query('INSERT INTO tasks (user_id, title, description) VALUES(?,?,?) RETURNING *').get(userId, title, description) as Task

    return c.json(res, 201)


  } catch (error) {
    console.log(error)
    return c.json({
      message: "Some error occurred",
      error,
    }, 500)
  }
}

export async function getAllTasks(c: Context, db: Database) {
  try {
    const extractAllTasks = db.query('SELECT * FROM tasks').all() as Tasks[]
    return c.json(extractAllTasks, 200)

  } catch (error) {
    console.log(error)
    return c.json({
      message: "Some error occurred",
      error,
    }, 500)
  }
}
export async function getTask(c: Context, db: Database) {
  const taskId = c.req.param('id')
  try {
    const getSingleTask = db.query('SELECT * FROM tasks WHERE id=?').get(taskId) as Task | undefined

    if (!getSingleTask) {
      return c.json({
        error: "Task not found! Please retry"
      }, 404)

    }
    return c.json(getSingleTask, 200)
  } catch (error) {
    console.log(error)
    return c.json({
      message: "Some error occurred",
      error,
    }, 500)
  }
}
export async function updateTask(c: Context, db: Database) {
  const userId = c.get('jwtPayload').userId;
  const userRole = c.get('jwtPayload').role
  const taskId = c.req.param('id');
  const { title, description } = await c.req.json()
  try {
    const user = db.query('SELECT * FROM users WHERE id=?').get(userId) as User | undefined
    const getTask = db.query('SELECT * FROM tasks WHERE id=? ').get(taskId) as Task | undefined
    if (!userId) {
      return c.json({
        error: "Unauthenticated! Please login to create taks."
      }, 403)
    }
    if (userRole !== 'admin') {
      return c.json({
        error: "Unauthorised! Only admin can update posts."
      }, 403)
    }
    if (!user) {
      return c.json({
        error: "Unauthenticated!. User not found."
      }, 403)
    }
    if (!getTask) {
      return c.json({
        error: "Task not found."
      }, 403)
    }
    if (getTask.user_id !== userId) {
      return c.json({
        error: "You're not allowed to edit this task."
      }, 403)
    }

    const updatedTask = db.query(`
      UPDATE tasks
      SET title = ?,
      description = ?
      WHERE id = ?
      RETURNING *
      `).get(
      title || getTask.title,
      description || getTask.description,
      taskId
    ) as Task

    return c.json(updatedTask, 200)
  } catch (error) {
    console.log(error)
    return c.json({
      message: "Some error occurred",
      error,
    }, 500)
  }
}
export async function deleteTask(c: Context, db: Database) {
  const userId = c.get('jwtPayload').userId;
  const userRole = c.get('jwtPayload').role
  const taskId = c.req.param('id');
  try {
    const user = db.query('SELECT * FROM users WHERE id=?').get(userId) as User | undefined
    const getTask = db.query('SELECT * FROM tasks WHERE id=? ').get(taskId) as Task | undefined
    if (!userId) {
      return c.json({
        error: "Unauthenticated! Please login to delete the task."
      }, 403)
    }
    if (userRole !== 'admin') {
      return c.json({
        error: "Unauthorised! Only admin can update posts."
      }, 403)
    }
    if (!user) {
      return c.json({
        error: "Unauthenticated!. User not found."
      }, 403)
    }
    if (!getTask) {
      return c.json({
        error: "Task not found."
      }, 403)
    }
    if (getTask.user_id !== userId) {
      return c.json({
        error: "You're not allowed to delete this task."
      }, 403)
    }

    const deletedTask = db.query(`DELETE FROM tasks WHERE id=?`).run(taskId)

    if (deletedTask.changes === 0) {
      return c.json({
        error: "Task not found."
      }, 403)
    }
    return c.json({
      message: "Task deleted successfully"
    }, 200)
  } catch (error) {
    console.log(error)
    return c.json({
      message: "Some error occurred",
      error,
    }, 500)
  }
}

