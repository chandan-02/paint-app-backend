
const ErrorResponse = require("../utils/ErrorResponse");

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.errors = err.errors;

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message.trim() || "Server Error",
    errors: error.errors,
  });
};
