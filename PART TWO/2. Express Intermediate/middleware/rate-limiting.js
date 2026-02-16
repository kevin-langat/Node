const { rateLimit } = require('express-rate-limit');

const rateLimiter = (maxReqs, time) => {
  return rateLimit({
    windowMs: time,
    limit: maxReqs,
    message: 'Too may requests',
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  });
};
module.exports = { rateLimiter };
