const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_TOKEN } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_TOKEN);
  } catch (err) {
    next(res.status(401).send({ message: 'Неверный логин или пароль' }));
  }

  req.user = payload;
  next();
};

module.exports = auth;
