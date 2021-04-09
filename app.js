const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { PORT = 3000 } = process.env;
const router = require('./routes/index')


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id:'606f61da65411b610ca5c525' //newUser
  };
  next();
})

// const userSchema = new mongoose.Schema({
//   name: {
//     required: true,
//     minlength: 2,
//     maxlength: 30,
//     type: String
//   },
//   about: {
//     required: true,
//     minlength: 2,
//     maxlength: 30,
//     type: String
//   },
//   avatar: {
//     required: true,
//     type: String
//   }
// });

const cardSchema = new mongoose.Schema({
  name: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: String
  },
  link: {
    required: true,
    type: String
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

// const User = mongoose.model('user', userSchema);
const Card = mongoose.model('card', cardSchema);

////////////////// USER /////////////////////
// app.post('/users', (req, res) => {
//   console.log('add user')
//   const date = req.body;
//   // console.log(date)
//   User.create(date)
//     .then((user) => res.send(user))
//     .catch((err) => {
//       if(err.name === 'ValidationError'){
//         res.status(400).send({message: `${Object.values(err.errors).map((error) => error.message).join(', ')}`});
//       } else {
//         res.status(500).send({message: 'Сервер недоступен'});
//       }
//     })
// });

app.use(router);


// app.get('/users', (req, res) => {
//   User.find({})
//     .then((users) => res.send(users))
//     .catch((err) => {
//       res.status(500).send({message: 'Сервер недоступен'});
//     });
// });

// app.get('/users/:userId', (req, res) => {
//   const {userId} = req.params;
//   User.findById(userId)
//     .then((user) => {
//       if(!user){
//         res.status(404).send({message: '404 — Пользователь по указанному _id не найден.'});
//       } res.send(user);
//     }).catch((err) => {res.status(500).send({message: 'Ошибка сервера'})})
// });

////////////////// USER /////////////////////
////////////////// CARDS ////////////////////

app.get('/cards', (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch((err) => {
      res.status(500).send({message: 'Сервер недоступен'});
    });
  // console.log('getCards');
});

app.post('/cards', (req, res) => {
  const {name, link} = req.body;
  console.log(name, link, req.user._id)
  Card.create({name:name, link:link, owner:req.user._id})
    .then(card => res.send(card))
    .catch((err) => {
      if(err.name === 'ValidationError'){
        res.status(400).send({message: `${Object.values(err.errors).map((error) => error.message).join(', ')}`});
      } else {
        res.status(500).send({message: 'Сервер недоступен'});
      }
    });
});

app.delete('/cards/:cardId', (req, res) => {
  const { cardId } = req.params;
  console.log('REQ:', cardId)
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if(!card){
        res.status(404).send({message: '404 — Карточка по указанному _id не найдена.'});
      }
      res.send(card);
    })
    .catch((err) => {res.status(500).send({message: 'Ошибка сервера'})})
});

////////////////// CARDS ////////////////////
////////////////// PATCH ////////////////////
// app.patch('/users/me', (req, res) => {
//   const{name, about} = req.body;
//   User.findOneAndUpdate(req.user._id, {name: name, about:about})
//     .then(user => {
//       console.log(user.name.length)
//       if((user.name.length < 2 || user.name.length > 30) || (user.about.length < 2 || user.about.length > 30)) {
//         res.status(400).send({message: '400 — Переданы некорректные данные при обновлении профиля. '});
//       }
//       res.send(user)
//     })
//     .catch((err)=>{res.status(404).send({message: '404 — Пользователь с указанным _id не найден.'})});
// });

// app.patch('/users/me/avatar', (req, res) => {
//   const{avatar} = req.body;
//   User.findOneAndUpdate(req.user._id, {avatar: avatar})
//     .then(user => {if(!user){res.status(400).send({message: '400 — Переданы некорректные данные при обновлении профиля. '})}})
//     .catch((err)=>{res.status(404).send({message: '404 — Пользователь с указанным _id не найден.'})});
// });

app.put('/cards/:cardId/likes', (req, res) => {
  console.log('LIKE')
  Card.findOneAndUpdate(req.params.cardId,{$addToSet:{likes:req.user._id}},{ new: true })
    .then(card => {if(req.params.cardId.length <= 23){
      res.status(400).send({message: '400 — Переданы некорректные данные для постановки/снятии лайка.'})
      }
      res.send(card);
  })
    .catch((err)=>{res.status(500).send({message: 'Сервер недоступен'})});
});

app.delete('/cards/:cardId/likes', (req, res) => {
  console.log('LIKE')
  Card.findOneAndUpdate(req.params.cardId,{$pull:{likes:req.user._id}},{ new: true })
  .then(card => {if(req.params.cardId.length <= 23){
    res.status(400).send({message: '400 — Переданы некорректные данные для постановки/снятии лайка.'})
    }
    res.send(card);
})
  .catch((err)=>{res.status(500).send({message: 'Сервер недоступен'})});
});






app.listen(PORT, () => {
  console.log('server started')
});
