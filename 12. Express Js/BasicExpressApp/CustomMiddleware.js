const express = require('express');
const app = express();

const requestTimestampLogger = (req, res, next) => {
  const timeStamp = new Date().toISOString();
  req.requestTime = timeStamp;
  console.log(`${timeStamp} from ${req.method} to ${req.url}`);
  next();
};

app.use(requestTimestampLogger);

app.get('/', (req, res) => {
  res.send('This is homepage.Open the about page');
});

app.get('/about', (req, res) => {
  res.send(
    `This is the about page. The request time is ${new Date(req.requestTime)}`
  );
});

app.listen(8000);
