const express = require('express');

const app = express();

// application level settings
app.set('view engine', 'ejs');

// routing
app.get('/products', (req, res) => {
  res.send('products page');
});

// posting
app.post('/api/users/register', (req, res) => {
  res.json({
    success: true,
    message: 'User registered successfully',
  });
});

// manage error handling
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: 'some error occurred',
  });
});
