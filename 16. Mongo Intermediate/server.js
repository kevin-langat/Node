require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./Routes/product-router');
const bookRouter = require('./Routes/book-routes');
const app = express();
app.use(express.json());

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo Db Connected'))
  .catch((e) => console.log(e));

app.use('/products', router);
app.use('/books', bookRouter);

app.listen(process.env.PORT, () =>
  console.log(`App running on port ${process.env.PORT}`)
);
