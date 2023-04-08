class ErrorHandler extends Error {
  // Error is an inbuilt class of Node-js where we are inheriting of that class features
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default ErrorHandler;
