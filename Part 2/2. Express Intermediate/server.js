require('dotenv').config();
const express = require('express');
const { configureCors } = require('./config/cors-config');
const { requestLogger } = require('./middleware/cutom-middleware');
const { globalErrorHandler } = require('./middleware/error-handler');
const { urlVersioning } = require('./middleware/API-versioning');
const { rateLimiter } = require('./middleware/rate-limiting');
const router = require('./routes/items-routes');
const app = express();

app.use(express.json());
app.use(configureCors());
app.use(requestLogger);
app.use(globalErrorHandler);
app.use(urlVersioning('v1'));
app.use(rateLimiter(100, 15 * 60 * 1000));

app.use('/api/v1', router);

app.listen(5500, () => console.log('App running on port 5500'));
