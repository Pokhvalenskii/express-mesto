const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;
const router = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '606f61da65411b610ca5c525',
  };
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log('server started');
});
