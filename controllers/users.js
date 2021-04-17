const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
require('dotenv').config();
const User = require('../models/user');

const { JWT_TOKEN } = process.env;

const signInUser = (req, res) => {
  const { email, password } = req.body;
  console.log('sadfsdfasdf', req.body);
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(401).send({ message: 'email или пароль неправильный' });
      } else {
        bcrypt.compare(password, user.password, ((err, isValid) => {
          console.log('err: ', err, ' isValid: ', isValid);
          if (err) {
            res.status(403).send({ error: err });
          }
          if (isValid) {
            const token = jwt.sign({
              id: user._id,
            }, JWT_TOKEN);
            res.cookie('jwt', token, {
              httpOnly: true,
              sameSite: true,
              maxAge: 3600000 * 24 * 7,
            }).status(201).send({ message: 'Login', token });
          } else {
            res.status(401).send({ message: 'email или пароль неправильный' });
          }
        }));
      }
    });
};

const createUsers = (req, res) => {
  const {
    name,
    email,
    about,
    avatar,
    password,
  } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: 'Email и пароль не могут быть пустыми' });
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (user) {
        res.status(400).send({ message: 'Пользователь с таким Email уже существует' });
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => {
            User.create({
              name,
              email,
              about,
              avatar,
              password: hash,
            })
              .then((date) => res.status(201).send(date))
              .catch((err) => {
                if (err.name === 'ValidationError') {
                  res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
                } else {
                  res.status(500).send({ message: 'Сервер недоступен' });
                }
              });
          });
      }
    });
};

const getUser = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(500).send({ message: 'Сервер недоступен' });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      // console.log(user);
      if (!user) {
        res.status(404).send({ message: '404 — Пользователь по указанному _id не найден.' });
      } res.send(user);
    })
    .catch((err) => {
      // console.log('erRRRRRr', err.name);
      if (err.name === 'CastError') {
        res.status(400).send({ message: '400 - Переданы некорректные данные при запросе' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user.id,
    { $set: { name: req.body.name, about: req.body.about } },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) { res.status(404).send({ message: '404 — Пользователь с указанным _id не найден.' }); }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(400).send({ message: '400 - Переданы некорректные данные при запросе' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user.id,
    { $set: { avatar: req.body.avatar } },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) { res.status(404).send({ message: '404 — Пользователь с указанным _id не найден.' }); }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(400).send({ message: '400 - Переданы некорректные данные при запросе' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

const getMe = (req, res) => {
  User.findById(req.user.id)
    .then((user) => { res.status(201).send(user); });
};

module.exports = {
  createUsers,
  getUser,
  getUserById,
  updateUser,
  updateAvatar,
  signInUser,
  getMe,
};
