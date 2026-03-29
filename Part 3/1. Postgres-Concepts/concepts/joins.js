const db = require('../db/db');

async function getUsersWithPosts() {
  const query = `
 SELECT users.id, users.username, users.email, posts.title, posts.content
 FROM users
 INNER JOIN posts ON users.id = posts.user_id`;

  try {
    const res = await db.queryDatabase(query);
    return res.rows;
  } catch (error) {
    console.log('Some error occurred', error);
  }
}

async function getAllUsersWithTheirPosts() {
  const query = `
  SELECT users.id, users.username, users.email, posts.title, posts.content
  FROM users
  LEFT JOIN posts ON users.id = posts.user_id
  `;
  try {
    const res = await db.queryDatabase(query);
    console.log('Get all users and their posts query run successfully');
    return res.rows;
  } catch (error) {
    console.log('Some error occurred', error);
  }
}

module.exports = { getUsersWithPosts, getAllUsersWithTheirPosts };
