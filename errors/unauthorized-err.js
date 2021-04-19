class UnauthorizedError extends Error {
  constructor() {
    super('Неправильный email или пароль');
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
