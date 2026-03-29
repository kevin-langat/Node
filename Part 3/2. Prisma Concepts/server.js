require('dotenv').config();
const express = require('express');
const authorRoutes = require('./routes/author-routes');
const bookRoutes = require('./routes/book-routes');
const promClient = require('prom-client');


const app = express();
app.use(express.json());

const register = new promClient.Registry();
promClient.collectDefaultMetrics(register);

const httpRequestsCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

register.registerMetric(httpRequestsCounter);

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
  });
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.use('/api/author', authorRoutes);
app.use('/api/book', bookRoutes);

app.listen(process.env.PORT, '0.0.0.0', () =>
  console.log(`App running on port 340  ${process.env.PORT}`),
);
