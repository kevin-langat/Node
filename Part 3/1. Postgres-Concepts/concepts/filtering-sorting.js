const db = require('../db/db');

async function getUsersWhere(condition) {
  const getUsersQuery = `
SELECT * FROM users
WHERE ${condition}
  `;

  try {
    const res = await db.queryDatabase(getUsersQuery);
    return res.rows;
  } catch (error) {
    console.log('some error occurred', error);
  }
}

async function getSortedUsers(column, order = 'ASC') {
  const sortUsersQuery = `
  SELECT * FROM users
  ORDER BY ${column} ${order}
  `;

  try {
    const res = await db.queryDatabase(sortUsersQuery);
    return res.rows;
  } catch (error) {
    console.log('some error occurred', error);
  }
}

async function getPaginatedUsers(limit, offset) {
  const getPaginatedUsersQuery = `
  SELECT * FROM users
  ORDER BY id ASC
  LIMIT $1 OFFSET $2
  `;

  try {
    const res = await db.queryDatabase(getPaginatedUsersQuery, [limit, offset]);
    return res.rows;
  } catch (error) {
    console.log('some error occurred', error);
  }
}

module.exports = { getUsersWhere, getSortedUsers, getPaginatedUsers };
