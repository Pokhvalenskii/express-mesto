class ConflictError extends Error {
  constructor() {
    super('Пользователь с таким email уже существует');
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
