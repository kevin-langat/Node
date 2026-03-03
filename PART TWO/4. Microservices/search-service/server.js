require('dotenv').config();
const dns = require('dns');
const express = require('express');
const helmet = require('helmet');
const Redis = require('ioredis');
const cors = require('cors');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/error-handler');
const { connectToRabbitMQ, consumeEvent } = require('./utils/rabbitmq');
const searchRoutes = require('./routes/search-routes');
const { connectToDb } = require('./db/db');
const {
  handlePostCreated,
  handlePostDeleted,
} = require('./handlers/search-event-handler');

const app = express();
const PORT = process.env.PORT;
dns.setServers(['8.8.8.8', '1.1.1.1']);
connectToDb();

const redisClient = new Redis(process.env.REDIS_URL);
app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
  logger.info(`Received a ${req.method} request to ${req.url}`);
  logger.info(`Request body ${req.body}`);
  next();
});

app.use('/api/search', searchRoutes);
app.use(errorHandler);

(async function startServer() {
  try {
    await connectToRabbitMQ();

    // cosume events
    await consumeEvent('post.created', handlePostCreated);
    await consumeEvent('post.deleted', handlePostDeleted);
  } catch (error) {
    logger.error(`Some error occurred while connecting to RabbitMQ: ${PORT}`);
    process.exit(1);
  }
})();
app.listen(PORT, () => {
  logger.info(`Search service running on port: ${PORT}`);
});
