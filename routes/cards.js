const router = require('express').Router();
const {getCards, postCards, removeLike, setLike, deleteCardById} = require('../controllers/cards')

router.post('/', postCards);
router.get('/', getCards);
router.delete('/:cardId/likes', removeLike);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', setLike);

module.exports = router;