const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUser, getUserById, updateUser, updateAvatar, getMe,
} = require('../controllers/users');

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2),
  }),
}), updateAvatar);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2),
  }),
}), updateUser);

router.get('/:userId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().required().max(24),
  }),
}), getUserById);

router.get('/me', getMe);
router.get('/', getUser);
router.use(auth);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
