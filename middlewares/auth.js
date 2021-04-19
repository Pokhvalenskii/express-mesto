const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_TOKEN } = process.env;

// функция для работы с печеньками от постмана
function postmanCookie(req) {
  const cookie = req.headers.cookie;
  if (cookie) {
    const values = cookie.split(';').reduce((res, item) => {
      const data = item.trim().split('=');
      return { ...res, [data[0]]: data[1] };
    }, {});
    return values;
  } return undefined;
}

const auth = (req, res, next) => {
  const token = postmanCookie(req);
  if (!token) {
    next(res.status(401).send({ message: 'Неверный логин или пароль' }));
  } else {
    let payload;
    try {
      payload = jwt.verify(token.jwt, JWT_TOKEN);
    } catch (err) {
      next(res.status(401).send({ message: 'Неверный логин или пароль' }));
    }

    req.user = payload;
    next();
  }
};

module.exports = auth;
