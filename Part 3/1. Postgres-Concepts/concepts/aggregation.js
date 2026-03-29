const db = require('../db/db');

async function countPostsByUser() {
  const query = `
  SELECT users.username, COUNT(posts.id) AS post_count
  FROM users
  LEFT JOIN posts ON users.id = posts.user_id
  GROUP BY users.id, users.username
  `;

  try {
    const res = await db.queryDatabase(query);
    return res.rows;
  } catch (error) {
    console.log('Some error occurred', error);
  }
}
async function averagePostPerUser() {
  const query = `
    SELECT AVG(post_count) as average_posts
    FROM(
    SELECT COUNT(posts.id) as post_count
    FROM users
    LEFT JOIN posts ON users.id = posts.user_id
    GROUP BY users.id
    ) as user_per_counts
    `;
  try {
    const res = await db.queryDatabase(query);
    return res.rows;
  } catch (error) {
    console.log('Some error occurred', error);
  }
}
module.exports = { countPostsByUser, averagePostPerUser };
