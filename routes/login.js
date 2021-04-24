const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { signInUser } = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2),
    password: Joi.string().required().min(2),
  }),
}), signInUser);

module.exports = router;
