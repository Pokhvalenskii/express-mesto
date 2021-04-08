const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const { PORT = 3000 } = process.env;

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

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: String
  },
  about: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: String
  },
  avatar: {
    required: true,
    type: String
  }
});

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

const User = mongoose.model('user', userSchema);
const Card = mongoose.model('card', cardSchema);

////////////////// USER /////////////////////
app.get('/', (req, res) => {
  res.send('hello server');
  console.log('hello console');
});

app.post('/users', (req, res) => {
  console.log('add user')
  const date = req.body;
  console.log(date)
  User.create(date).then((user) => res.send(user))
});

app.get('/users', (req, res) => {
  User.find({}).then((users) => res.send(users));
});

app.get('/users/:userId', (req, res) => {
  const {userId} = req.params;
  console.log('REQ: ', userId)
  User.findById(userId).then((user) => res.send(user));
})
////////////////// USER /////////////////////
////////////////// CARDS ////////////////////

app.get('/cards', (req, res) => {
  Card.find({}).then(cards => res.send(cards));
  console.log('getCards');
});

app.post('/cards', (req, res) => {
  const {name, link} = req.body;
  console.log(name, link, req.user._id)
  Card.create({name:name, link:link, owner:req.user._id}).then(card => res.send(card));
});

app.delete('/cards/:cardId', (req, res) => {
  const { cardId } = req.params;
  console.log('REQ:', cardId)
  Card.findByIdAndDelete(cardId).then(card => res.send(card));
});

////////////////// CARDS ////////////////////

app.listen(PORT, () => {
  console.log('server started')
});
