require('dotenv').config();
const express = require('express');
const connectToMongo = require('./db/database');
const router = require('./routes/auth-routes');
const dashboardRouter = require('./routes/dashboard-routes');
const adminRoutes = require('./routes/adminRoutes');
const imageRouter = require('./routes/image-router');
const videoRouter = require('./routes/videoRoutes');
const app = express();
app.use(express.json());

// connect to db
connectToMongo();

//
// initialize routes
app.use('/users', router);
app.use('/dashboard', dashboardRouter);
app.use('/admin', adminRoutes);
app.use('/image', imageRouter);
app.use('/video', videoRouter);

// listen for port 5500
app.listen(process.env.PORT, () =>
  console.log(`App running on port ${process.env.PORT}`)
);
