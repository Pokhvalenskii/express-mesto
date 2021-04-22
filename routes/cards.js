const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const pattern = /(http|https):\/\/[\d\w-]+\.\w.*/;

const {
  getCards, postCards, removeLike, setLike, deleteCardById,
} = require('../controllers/cards');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(pattern).required(),
  }),
}), postCards);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().max(24),
  }),
}), removeLike);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().max(24),
  }),
}), setLike);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().max(24),
  }),
}), deleteCardById);

router.get('/', getCards);
router.post('/', postCards);
router.delete('/:cardId/likes', removeLike);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', setLike);

module.exports = router;
