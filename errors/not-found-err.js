class NotFoundError extends Error {
  constructor() {
    super('404 - Не найдено');
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
