const db = require('../db/db');

async function createUsersTable(text) {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )
  `;

  try {
    await db.queryDatabase(createTableQuery);
    console.log('Users table created successfully');
  } catch (error) {
    console.log('some error occurred while creating users table');
  }
}

async function insertUser(username, email) {
  const insertUsersQuery = `
  INSERT INTO users (username, email)
  VALUES ($1, $2)
  RETURNING *
  `;

  try {
    const res = await db.queryDatabase(insertUsersQuery, [username, email]);
    console.log('Users inserted successfully', res.rows[0]);
  } catch (error) {
    console.log(
      'some error occurred while inserting users info to  table',
      error,
    );
  }
}
async function getAllUsers() {
  const allUsers = `SELECT * FROM users`;

  try {
    const res = await db.queryDatabase(allUsers);
    console.log('Query successfully run');
    return res.rows;
  } catch (error) {
    console.log(
      'some error occurred while getting all users from table',
      error,
    );
  }
}
async function updateUserEmail(username, email) {
  const updateEmail = `
  UPDATE users
  SET email = $2
  WHERE username = $1
  RETURNING *
  `;

  try {
    const res = await db.queryDatabase(updateEmail, [username, email]);
    if (res.rows.length > 0) {
      console.log('Email update query successfully run');
      return res.rows[0];
    } else {
      console.log('Email update query failed: No user with such username');
      return null;
    }
  } catch (error) {
    console.log('some error occurred while updating user email', error);
  }
}

async function deleteUser(email) {
  const deleteQuery = `
  DELETE FROM users
  WHERE email = $1
  RETURNING *
  `;

  try {
    const res = await db.queryDatabase(deleteQuery, [email]);
    if (res.rows.length > 0) {
      console.log('User deletion query run successfully');
      return res.rows[0];
    } else {
      console.log('User deletion query failed: No user with such email');
      return null;
    }
  } catch (error) {
    console.log('some error occurred while deleting user', error);
  }
}
module.exports = {
  createUsersTable,
  insertUser,
  getAllUsers,
  updateUserEmail,
  deleteUser,
};
