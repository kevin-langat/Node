require('dotenv').config();
const {
  countPostsByUser,
  averagePostPerUser,
} = require('./concepts/aggregation');
const {
  createUsersTable,
  insertUser,
  getAllUsers,
  updateUserEmail,
  deleteUser,
} = require('./concepts/basic-queries');
const {
  getUsersWhere,
  getSortedUsers,
  getPaginatedUsers,
} = require('./concepts/filtering-sorting');
const {
  getUsersWithPosts,
  getAllUsersWithTheirPosts,
} = require('./concepts/joins');
const {
  createPostsTable,
  createANewPost,
  deletePost,
} = require('./concepts/relationships');

async function testBasicQueries() {
  try {
    await createUsersTable();
    await insertUser('Kevin Langat K', 'kevinLangat1@gmail.com');
    await insertUser('John Doe', 'doe@gmail.com');
    await insertUser('Yeimy Montoya', 'montoya@gmail.com');
    await insertUser('Vanessa cruz', 'vannessa@gmail.com');
    await insertUser('Charly Flow', 'flow1@gmail.com');
    // all users
    const allUsers = await getAllUsers();
    console.log(allUsers);
    // update user email
    const updateRes = await updateUserEmail('John Doe', 'johndoe12@gmail.com');
    console.log(updateRes);
    // delete user
    const deleteRes = await deleteUser('flow2@gmail.com');
    console.log(deleteRes);
  } catch (err) {
    console.log('Some error occurred', err);
  }
}
async function runBasicQueries() {
  try {
    await testBasicQueries();
  } catch (err) {
    console.log('Some error occurred', err);
  }
}
// runBasicQueries();
async function testFilterQueries() {
  try {
    // get users with a username staring with 'z'
    // const zFilteredUsers = await getUsersWhere("username LIKE 'K%'");

    // sort users in asscending order
    // const sortUsersInAscOrder = await getSortedUsers('created_at', 'ASC');

    // get paginated users
    const paginatedUsers = await getPaginatedUsers(3, 3);
    console.log(paginatedUsers);
  } catch (err) {
    console.log('Some error occurred', err);
  }
}
// testFilterQueries();

async function testRelationshipsQueries() {
  try {
    // create the post table
    // await createPostsTable();
    // Insert a post
    const res = await createANewPost(
      'Antelope',
      'This is a post about an Antelope',
      7,
    );
    console.log('Post created successfully', res);
    // delete post
    // const res = await deletePost(5);
    // console.log(res);
  } catch (err) {
    console.log('Some error occurred', err);
  }
}

// testRelationshipsQueries();

// test join queries
async function testJoinsQueries() {
  try {
    // const res = await getUsersWithPosts();
    // get all the users and their posts
    const res = await getAllUsersWithTheirPosts();
    console.log(res);
  } catch (error) {
    console.log('Some error occurred', err);
  }
}
// testJoinsQueries();

async function testAggregationQueries() {
  try {
    // const res = await countPostsByUser();
    const res = await averagePostPerUser();
    console.log(res);
  } catch (error) {
    console.log('Some error occurred', err);
  }
}
testAggregationQueries();
