class NotFoundError extends Error {
  constructor() {
    super('Пользователь по указанному id не найден');
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
