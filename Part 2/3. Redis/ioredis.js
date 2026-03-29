const Redis = require('ioredis');

const redis = new Redis();

async function ioRedisExample() {
  try {
    await redis.set('key', 'value');
    const val = await redis.get('key');
    console.log(val);
  } catch (error) {
    console.log(error);
  } finally {
    redis.quit();
  }
}
ioRedisExample();
