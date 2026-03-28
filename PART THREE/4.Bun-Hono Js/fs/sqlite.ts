import { Database } from 'bun:sqlite'

async function sqliteDemo() {
  const db = new Database("bundb.sqlite")

  // create table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `
  )
  console.log('users table created users successfully')

  // insert some data
  const insertUser = db.prepare(`
    INSERT INTO users (name, email)
    VALUES(?, ?)  
    `);
  // insertUser.run("Kevin Langat", "kevinl@gmail.com");
  // insertUser.run("John Doe", "johndoe@gmail.com");
  // insertUser.run("Vannessa Cruz", "vannessa01@gmail.com");
  // console.log('data inserted successfully')

  const extractAllUsers = db.query('SELECT * FROM users').all();
  // console.log(extractAllUsers)

  // db.run('UPDATE users SET name = ? WHERE email = ?', [
  //   "Vannessa Monnet",
  //   "vannessa01@gmail.com"
  // ])
  // console.log("User's details updated successfully")

  // const getUpdatedUserInfo = db.query('SELECT * FROM users WHERE email=?').get('vannessa01@gmail.com')
  // console.log(getUpdatedUserInfo, "Updated user")

  db.run('DELETE FROM users WHERE email=?', ['johndoe@gmail.com'])
  const extractRemainingUsers = db.query('SELECT * FROM users').all();
  console.log("Remainign Users", extractRemainingUsers)
}
sqliteDemo()