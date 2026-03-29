// custom error class
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'APIError';
  }
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); //log the stack error;

  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    });
  } else if (err.name === 'validationError') {
    return res.status(400).json({
      status: 'error',
      message: 'validation error',
    });
  } else {
    return res.status(400).json({
      status: 'error',
      message: 'some error occurred',
    });
  }
};
module.exports = { APIError, globalErrorHandler, asyncHandler };
