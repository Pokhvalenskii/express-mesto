const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getCards, postCards, removeLike, setLike, deleteCardById,
} = require('../controllers/cards');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2),
  }),
}), postCards);

router.get('/', getCards);
router.use(auth);
router.post('/', postCards);
router.delete('/:cardId/likes', removeLike);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', setLike);

module.exports = router;
