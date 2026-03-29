const cors = require('cors');

const configureCors = () => {
  return cors({
    // origins,
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'https://customdomain.com',
      ];

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Now allowed by cors'));
      }
    },

    // methods allowed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // headers
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Version'],
    exposedHeaders: ['X-Total-Count', 'Content-Range'],
    credentials: true, //enable support for cookies
    maxAge: 600 // cache the preflight responses for 10 mins 
  });
};


module.exports = { configureCors };