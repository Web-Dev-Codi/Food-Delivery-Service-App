const errorHandler = (err, req, res, next) => {
  // If status code wasn't already set, default to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Set status code
  res.status(statusCode);

  // Send error response
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    timestamp: new Date().toISOString(),
  });
};

// Preserves any status code that was set (like 404 from the notFound middleware)
// Defaults to 500 if no status code was set
// Returns JSON with the error message
// Includes stack traces only in development mode
// Adds a timestamp to help with debugging
