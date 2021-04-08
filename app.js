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
mongoose.model('card', cardSchema);




app.get('/', (req, res) => {
  res.send('hello server');
  console.log('hello console');
});

app.post('/users', (req, res) => {
  console.log('add user')
  const date = req.body;
  // const date = {...req.body}
  console.log(date)
  User.create(date).then((user) => res.send(user))
});

app.listen(PORT, () => {
  console.log('server started')
});