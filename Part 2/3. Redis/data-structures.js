const redis = require('redis');

const client = redis.createClient({
  host: 'localhost',
  port: 6378,
});

(async function redisDataStructures() {
  try {
    await client.connect();
    console.log('Connected to redis');
    await client.set('user:name', 'Kevin Langat');
    const name = await client.get('user:name');
    console.log(name);
    // mset-setting multiple values
    // mget-getting multiple values

    await client.mSet([
      'user:email',
      'kevinlangat54@gmail.com',
      'user:age',
      '21',
      'user:country',
      'Kenya',
    ]);
    const [email, age, country] = await client.mGet([
      'user:email',
      'user:age',
      'user:country',
    ]);
    console.log(email, age, country, 'getting multiple key value values');
    // lists
    // LPUSH - insert a element at the start of the list
    // RPUSH - insert an element at the end of the list
    // LRANGE- will retrieve elements from a specific range in the lists
    // LPOP - will remove and return the first element in the list
    //  RPOP - will remove and return the last element in the list

    // await client.lPush('Notes', ['note 1', 'note 2', 'note 3']);
    const extractAllNotes = await client.lRange('Notes', 0, -1);
    console.log(extractAllNotes);

    // lPop
    const firstNote = await client.lPop('Notes');
    console.log(firstNote, 'firstNote');

    // getting remaining notes
    const remainingNotes = await client.lRange('Notes', 0, -1);
    console.log(remainingNotes, 'remainingNotes');

    // sAdd- add one or more members
    await client.sAdd('user:nickName', ['John', 'Doe', 'xyz']);
    const extractUserNickNames = await client.SMEMBERS('user:nickName');
    console.log(extractUserNickNames, 'Extract User Nick Names');

    // checking if the member is present
    const isDoeInNickNames = await client.sIsMember('user:nickName', 'xyz');
    console.log(isDoeInNickNames, 'is Doe in nick names');

    //remove one or more keys
    await client.sRem('user:nickName', 'Doe');
    const extractCurrentNickName = await client.sMembers('user:nickName');
    console.log(
      extractCurrentNickName,
      'current nick names after removing Doe',
    );

    // sorted sets
    // zAdd
    await client.zAdd('cart', [
      {
        score: 100,
        value: 'cart 1',
      },
      {
        score: 150,
        value: 'cart 2',
      },
      {
        score: 50,
        value: 'cart 3',
      },
    ]);

    const getCartItems = await client.zRange('cart', 0, -1);
    console.log(getCartItems, 'get cart items');

    const extractAllCartItemsWithScore = await client.zRangeWithScores('cart', 0, -1);

    console.log(extractAllCartItemsWithScore, "extract All Cart Items With Score");

    const cartTwoRank = await client.zRank('cart', 'cart 2');
    console.log(cartTwoRank, "ranking where cart 2 is based on its score");

    // hashes = HSET, HGET, HGETALL, HDEL
    await client.hSet('product:1', {
      name: "Product 1",
      description: "Product 1 description",
      rating: "5",
    });
    const getProductRating = await client.hGet('product:1', 'rating');;
    console.log(getProductRating, "Get product rating");
    const getProductDetails = await client.hGetAll('product:1');
    console.log(getProductDetails, "Get all product details");

    // deleting product rating key and value
    await client.hDel('product:1', 'rating');
    const updatedProductDetails = await client.hGetAll('product:1');
    console.log(updatedProductDetails, 'updated product details after deleting');
  } catch (error) {
    console.error(error);
  } finally {
    client.quit();
  }
})();
