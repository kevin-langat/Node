require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');
const { connectToDb } = require('./db/db');
const logger = require('./utils/logger');
const { rateLimit } = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes/identity-routes');

// connect to mongo db
connectToDb();

const redisClient = new Redis(process.env.REDIS_URL);

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'DELETE', 'POST'],
  }),
);

app.use((req, res, next) => {
  logger.info(`Received a ${req.method} request to ${req.url}`);
  logger.info(`Request body ${req.body}`);
  next();
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 10,
  duration: 1,
});

app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => next())
    .catch(() => {
      logger.warn(`Rate limit reached for ip ${req.ip}`);
      res.status(429).json({
        success: false,
        message: 'Too many requests',
      });
    });
});

const sensitiveEndPointLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Sensitive endpoint rate limit exceeded for ip ${req.ip}`);

    res.status(429).json({
      success: false,
      message: 'Too many requests',
    });
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});
// apply the rate limiter on this endpoint
app.use('/api/auth/register', sensitiveEndPointLimiter);

app.use('/api/auth', routes);

// error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Identity servicess started on port ${process.env.PORT}`);
  logger.info(`Identity servicess started on port ${process.env.PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection at', promise, 'reason', reason);
});
