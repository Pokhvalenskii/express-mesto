const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const pattern = /(http|https):\/\/[\d\w\-]+\.\w.*/;

const {
  getCards, postCards, removeLike, setLike, deleteCardById,
} = require('../controllers/cards');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(pattern).required(),
  }),
}), postCards);

router.get('/', getCards);
router.post('/', postCards);
router.delete('/:cardId/likes', removeLike);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', setLike);

module.exports = router;
