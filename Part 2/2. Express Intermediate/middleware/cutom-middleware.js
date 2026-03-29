function requestLogger(req, res, next) {
  const method = req.method;
  const timeStamp = new Date().toISOString();
  const url = req.url;
  const userAgent = req.get('User-Agent');
  console.log(`${timeStamp} ${method} ${url} - ${userAgent}`);

  // add the timeStamp to be used on next funcs
  req.timeStamp = timeStamp;
  next();
}

module.exports = { requestLogger };