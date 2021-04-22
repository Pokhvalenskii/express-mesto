const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ServerError = require('../errors/server-error');
const Forbidden = require('../errors/forbidden-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      next(new ServerError());
    });
};

const postCards = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user.id })
    .then((card) => res.send(card))
    .catch(() => {
      next(new ServerError());
    });
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (card) {
        if (JSON.stringify(card.owner) === JSON.stringify(req.user.id)) {
          Card.findByIdAndDelete(cardId).then(() => res.status(201).send({ message: 'карточка удалена' }));
        } else {
          throw new Forbidden();
        }
      }
    })
    .catch(next);
};

const setLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user.id } }, { new: true })
    .then((card) => {
      if (!card) { throw new NotFoundError(); }
      res.send(card);
    })
    .catch(next);
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user.id } }, { new: true })
    .then((card) => {
      if (!card) { throw new NotFoundError(); }
      res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards, postCards, removeLike, setLike, deleteCardById,
};
