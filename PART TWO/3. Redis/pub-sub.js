const redis = require('redis');

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

client.on('error', (error) => console.log('Redis error occurred!', error));

async function testAdditionalFeatures() {
  try {
    await client.connect();
    // const subscriber = client.duplicate(); //create a new client;
    // await subscriber.connect(); //connect to redis server for the subscriber;
    // await subscriber.subscribe('dummy-channel', (message, channel) => {
    //   console.log(`Received a message from ${channel}: ${message}`);
    // });

    // await client.publish('dummy-channel', 'some dummy data from publisher');
    // await client.publish('dummy-channel', 'some new data from publisher');

    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // await subscriber.unsubscribe('dummy-channel');
    // await subscriber.quit();
    // pipelines and transactions
    const multi = client.multi();
    multi.set('key-transactions1', 'value1');
    multi.set('key-transactions2', 'value2');
    multi.get('key-transactions1');
    multi.get('key-transactions2');

    const results = await multi.exec();
    console.log(results);

    // pipeline
    const pipeline = client.multi();
    multi.set('key-pipeline1', 'value1');
    multi.set('key-pipeline2', 'value2');
    multi.get('key-pipeline1');
    multi.get('key-pipeline2');
    const pipelineResults = await multi.exec();
    console.log(pipelineResults);

    // batch data operations
    // const pipelineOne = client.multi();
    // for (let i = 0; 1 < 10; i++) {
    //   pipeline.set(`User:${i}:action`, `Action ${i}`);
    // }
    // await pipelineOne.exec();
    const dummyExample = client.multi();
    multi.decrBy('account:1234:balance', 100);
    multi.incrBy('account:0000:balance', 100);
    const finalResults = await multi.exec();
    console.log(finalResults, 'res');

    // perfomance tests
    console.log('perfomance tests');
    console.time('without pipelining');
    for (let i = 0; i < 1000; i++) {
      await client.set(`user${i}`, `user_value${i}`);
    }
    console.timeEnd('without pipelining');

    console.time('with pipelining');
    const bigPipeline = client.multi();
    for (let i = 0; i < 1000; i++) {
      bigPipeline.set(`user_pipeline_key${i}`, `user_pipeline_value${i}`);
    }
    await bigPipeline.exec();
    console.timeEnd('with pipelining');
  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
  }
}
testAdditionalFeatures();
