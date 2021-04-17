const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    minlength: 2,
    maxlength: 30,
    type: String,
    default: 'Жак-ив-кусто',
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  about: {
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  avatar: {
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    type: String,
  },
});

module.exports = mongoose.model('user', userSchema);
