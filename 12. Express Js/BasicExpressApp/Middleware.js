const express = require('express');
const app = express();

// define middleware
const myMiddleware = (req, res, next) => {
  console.log('This function ran on every request');
  req.requestTime = Date.now();
  next();
};

app.use(myMiddleware);
app.get('/', (req, res) => {
  res.send('This is homepage.Open the about page');
});

app.get('/about', (req, res) => {
  res.send(
    `This is the about page. The request time is ${new Date(req.requestTime)}`
  );
});

app.listen(8000);
