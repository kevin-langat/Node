const { Pool } = require('pg');

// create a new pool instance to manage db connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgre-sangam-basics',
  password: 'K42173008k',
  port: 5432,
});

async function queryDatabase(text, params) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(
      `Executed query:, ${{ text, duration, rows: result.rowCount }}`,
    );

    return result;
  } catch (err) {
    console.error('Connection error', err.stack);
    return err.stack;
  }
}

module.exports = { queryDatabase };
