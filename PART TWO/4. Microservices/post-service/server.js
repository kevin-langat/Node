require('dotenv').config();
const dns = require('dns');
const express = require('express');
const helmet = require('helmet');
const Redis = require('ioredis');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/error-handler');
const postRoutes = require('./routes/post-routes');
const { connectToDb } = require('./db/db');

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

app.use(
  '/api/posts',
  (req, res, next) => {
    req.redisClient = redisClient;
    next();
  },
  postRoutes,
);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Post service running on port: ${PORT}`);
  console.log(`Post service running on port: ${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection at', promise, 'reason', reason);
});
