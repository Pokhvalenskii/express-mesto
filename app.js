const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

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
})




app.get('/', (req, res) => {
  res.send('hello server');
});



app.listen(PORT, () => {
  console.log('server started')
});