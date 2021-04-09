const User = require('../models/user');

const postUsers = (req, res) => {
  const date = req.body;
  User.create(date)
    .then((user) => res.send(user))
    .catch((err) => {
      // console.log('POST ERR', err.name);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      } else {
        res.status(500).send({ message: 'Сервер недоступен' });
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
  // console.log('UPDATE USER', req.user._id);
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { $set: { name:name, about:about } }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) { res.status(404).send({ message: '404 — Пользователь с указанным _id не найден.' }); }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: '400 - Переданы некорректные данные при запросе' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

const updateAvatar = (req, res) => {
  // console.log('UPDATE AVATAR')
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { $set: { avatar: avatar } }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) { res.status(404).send({ message: '404 — Пользователь с указанным _id не найден.' }); }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: '400 - Переданы некорректные данные при запросе' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  postUsers, getUser, getUserById, updateUser, updateAvatar,
};
