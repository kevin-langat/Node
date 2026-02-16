const redis = require('redis');

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

// event listener
client.on('error', (err) => console.log('Redis client error occurred', err));

async function testRedisConnection() {
  try {
    await client.connect();
    console.log('Connected to redis');

    await client.set('name', 'Kevin L');
    const extractValue = await client.get('name');
    console.log(extractValue);
    const deleteCount = await client.del('name');
    const updateValue = await client.get('name');
    console.log(updateValue, deleteCount);

    // increment and decrement operations
    await client.set('count', "50");
    const incrementCount = await client.incr("count");
    console.log(incrementCount, "incrementCount");
    const decrementCount = await client.decr("count");
    console.log(decrementCount, "decrementCount");
    //doing decrement 5 times
    await client.decr("count");
    await client.decr("count");
    await client.decr("count");
    await client.decr("count");
    await client.decr("count");
    console.log(await client.get("count"), "decrement of 5 times");
  } catch (error) {
    console.log(error);
  } finally {
    await client.quit();
  }
}

testRedisConnection();
