const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ServerError = require('../errors/server-error');
const ConflictError = require('../errors/conflict-err');

const { JWT_TOKEN } = process.env;

const signInUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError();
      } else {
        bcrypt.compare(password, user.password, ((err, isValid) => {
          if (err) {
            throw new ServerError();
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
            throw new UnauthorizedError();
          }
        }));
      }
    }).catch(next);
};

const createUsers = (req, res, next) => {
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
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError();
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
              .then((date) => res.status(201).send(date));
          });
      }
    }).catch(next);
};

const getUser = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      next(new ServerError());
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      } res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user.id,
    { $set: { name: req.body.name, about: req.body.about } },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) { throw new NotFoundError(); }
      res.send(user);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user.id,
    { $set: { avatar: req.body.avatar } },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) { throw new NotFoundError(); }
      res.send(user);
    })
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => { res.status(201).send(user); })
    .catch(() => { next(new ServerError()); });
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
