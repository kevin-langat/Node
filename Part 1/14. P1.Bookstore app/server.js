require('dotenv').config();
const express = require('express');
const connectToDb = require('./database/db');
const booksRoutes = require('./routes/books-routes');
const app = express();
const PORT = process.env.PORT || 3000;

// using the database controller
connectToDb();

// middleware -> express.json
app.use(express.json());

// defining all the routes in server 4.04
app.use('/api/books', booksRoutes);

// listening to the port
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
