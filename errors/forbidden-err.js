class Forbidden extends Error {
  constructor() {
    super('Вы не можете удалить карточку');
    this.statusCode = 403;
  }
}

module.exports = Forbidden;
