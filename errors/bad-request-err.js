class BadRequestError extends Error {
  constructor() {
    super('Неправильный, некорректный запрос');
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
