require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const mediaRoutes = require('./routes/media-routes');
const errorHandler = require('./middleware/error-handler');
const logger = require('./utils/logger');
const dns = require('dns');
const { connectToRabbitMQ, consumeEvent } = require('./utils/rabbitmq');
const { handlePostDeleted } = require('./handlers/media-event-handlers');
const app = express();

dns.setServers(['8.8.8.8', '1.1.1.1']);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.info('Connected to Mongo DB');
    console.log('Mongo db connected successfully');
  })
  .catch((e) => {
    logger.error('Some error occurred while connecting to Mongo db', e);
    console.error('Some error occurred while connecting to Mongo db', e);
  });

// app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Received a ${req.method} request to ${req.url}`);
  logger.info(`Request body ${req.body}`);
  next();
});

app.use('/api/media', mediaRoutes);
app.use(errorHandler);

(async function startServer() {
  try {
    await connectToRabbitMQ();
    await consumeEvent('post.deleted', handlePostDeleted);
  } catch (error) {
    logger.error(`Some error occurred while connecting to RabbitMQ: ${PORT}`);
    process.exit(1);
  }
})();

app.listen(process.env.PORT, () => {
  logger.info(`Media service running on port: ${process.env.PORT}`);
  console.log(`Media service running on port: ${process.env.PORT}`);
});
