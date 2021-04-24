const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const pattern = /(http|https):\/\/[\d\w-]+\.\w.*/;

const {
  getUser, getUserById, updateUser, updateAvatar, getMe,
} = require('../controllers/users');

router.get('/me', getMe);
router.get('/', getUser);

router.get('/:userId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().required().length(24),
  }),
}), getUserById);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(pattern).required(),
  }),
}), updateAvatar);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

module.exports = router;
