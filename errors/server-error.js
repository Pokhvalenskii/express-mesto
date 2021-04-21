class ServerError extends Error {
  constructor() {
    super('Внутренняя ошибка сервера');
    this.statusCode = 500;
  }
}

module.exports = ServerError;
