const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // Avoid sending multiple responses
  }
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong!',
  });
};

module.exports = errorHandler;