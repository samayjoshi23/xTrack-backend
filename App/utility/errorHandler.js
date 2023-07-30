function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Check for additional arguments
  const { customStatusCode, customMessage } = err;
  const status = customStatusCode || statusCode;
  const errorMessage = customMessage ? customMessage : message;

  res.status(status).json({ error: errorMessage });
}

module.exports = errorHandler;
