const db = require('../db/db');

async function createPostsTable() {
  const createPostTableQuery = `
  CREATE TABLE IF NOT EXISTS posts(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP
  )`;

  try {
    await db.queryDatabase(createPostTableQuery);
    console.log('Posts table created successfully');
  } catch (error) {
    console.log('some error occurred', error);
  }
}
async function createANewPost(title, content, userId) {
  const createPostQuery = `
  INSERT INTO posts (title, content, user_id, created_at)
  VALUES ($1, $2, $3, $4)
  RETURNING *`;
  try {
    const res = await db.queryDatabase(createPostQuery, [
      title,
      content,
      userId,
      new Date(),
    ]);
    return res.rows[0];
  } catch (error) {
    console.log('some error occurred', error);
  }
}

async function deletePost(id) {
  const query = `
  DELETE FROM posts
  WHERE id = $1
  RETURNING *
  `;
  try {
    const res = await db.queryDatabase(query, [id]);
    console.log(`Post of id ${id} deleted successfully`);
    return res.rows[0];
  } catch (error) {
    console.log('some error occurred', error);
  }
}
module.exports = { createPostsTable, deletePost, createANewPost };
