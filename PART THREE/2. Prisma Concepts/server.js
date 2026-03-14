require('dotenv').config();
const express = require('express');
const authorRoutes = require('./routes/author-routes');
const bookRoutes = require('./routes/book-routes');
const promClient = require('prom-client');

const register = new promClient.Registry();
promClient.collectDefaultMetrics(register);

const httpRequestsCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

const app = express();
app.use(express.json());

app.use('/api/author', authorRoutes);
app.use('/api/book', bookRoutes);

app.listen(process.env.PORT, () =>
  console.log(`App running on port ${process.env.PORT}`),
);
