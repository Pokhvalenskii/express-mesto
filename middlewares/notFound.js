const NotFoundError = require('../errors/not-found-err');

const notFound = (req, res, next) => {
  next(new NotFoundError());
};

module.exports = notFound;
