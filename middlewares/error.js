const checkError = (err, req, res, next) => {
  switch (err.statusCode) {
    case 400:
      res.status(err.statusCode).send({ message: err.message });
      break;
    case 401:
      res.status(err.statusCode).send({ message: err.message });
      break;
    case 402:
      res.status(err.statusCode).send({ message: err.message });
      break;
    case 403:
      res.status(err.statusCode).send({ message: err.message });
      break;
    case 404:
      res.status(err.statusCode).send({ message: err.message });
      break;
    case 409:
      res.status(err.statusCode).send({ message: err.message });
      break;
    case 500:
      res.status(err.statusCode).send({ message: err.message });
      break;
    default:
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
  }
  next();
};

module.exports = checkError;
