class DuplicateMongoError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = DuplicateMongoError;
