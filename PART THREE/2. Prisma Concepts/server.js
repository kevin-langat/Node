require('dotenv').config();
const express = require('express');
const authorRoutes = require('./routes/author-routes');
const app = express();
app.use(express.json());

app.use('/api/author', authorRoutes);

app.listen(process.env.PORT, () =>
  console.log(`App running on port ${process.env.PORT}`),
);
