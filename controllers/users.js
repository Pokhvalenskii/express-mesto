const User = require('../models/user')

const postUsers = (req, res) => {
  console.log('add user')
  const date = req.body;
  User.create(date)
    .then((user) => res.send(user))
    .catch((err) => {
      if(err.name === 'ValidationError'){
        res.status(400).send({message: `${Object.values(err.errors).map((error) => error.message).join(', ')}`});
      } else {
        res.status(500).send({message: 'Сервер недоступен'});
      }
    })
};

const getUserl = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(500).send({message: 'Сервер недоступен'});
    });
};

const getUserById = (req, res) => {
  const {userId} = req.params;
  User.findById(userId)
    .then((user) => {
      if(!user){
        res.status(404).send({message: '404 — Пользователь по указанному _id не найден.'});
      } res.send(user);
    })
    .catch((err) => {res.status(500).send({message: 'Ошибка сервера'})})
};

const updateUser = (req, res) => {
  console.log('UPDATE USER')
  const{name, about} = req.body;
  User.findOneAndUpdate(req.user._id, {name: name, about:about})
    .then(user => {
      console.log(user.name.length)
      if((user.name.length < 2 || user.name.length > 30) || (user.about.length < 2 || user.about.length > 30)) {
        res.status(400).send({message: '400 — Переданы некорректные данные при обновлении профиля. '});
      }
      res.send(user)
    })
    .catch((err)=>{res.status(404).send({message: '404 — Пользователь с указанным _id не найден.'})});
};

const updateAvatar = (req, res) => {
  console.log('UPDATE AVATAR')
  const{avatar} = req.body;
  User.findOneAndUpdate(req.user._id, {avatar: avatar})
    .then(user => {
      if(!user){
        res.status(400).send({message: '400 — Переданы некорректные данные при обновлении профиля. '})
      }
      res.send(user);
    })
    .catch((err)=>{res.status(404).send({message: '404 — Пользователь с указанным _id не найден.'})});
};

module.exports = { postUsers, getUserl, getUserById, updateUser, updateAvatar}