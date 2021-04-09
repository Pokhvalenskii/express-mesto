const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(500).send({ message: 'Сервер недоступен' });
    });
};

const postCards = (req, res) => {
  const { name, link } = req.body;
  // console.log(name, link, req.user._id)
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      } else {
        res.status(500).send({ message: 'Сервер недоступен' });
      }
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  // console.log('REQ:', cardId)
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: '404 — Карточка по указанному _id не найдена.' });
      }
      res.send(card);
    })
    .catch(() => { res.status(500).send({ message: 'Ошибка сервера' }); });
};

const setLike = (req, res) => {
  Card.findOneAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (req.params.cardId.length <= 23) {
        res.status(400).send({ message: '400 — Переданы некорректные данные для постановки/снятии лайка.' });
      }
      res.send(card);
    })
    .catch(() => { res.status(500).send({ message: 'Сервер недоступен' }); });
};

const removeLike = (req, res) => {
  Card.findOneAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (req.params.cardId.length <= 23) {
        res.status(400).send({ message: '400 — Переданы некорректные данные для постановки/снятии лайка.' });
      }
      res.send(card);
    })
    .catch(() => { res.status(500).send({ message: 'Сервер недоступен' }); });
};

module.exports = {
  getCards, postCards, removeLike, setLike, deleteCardById,
};
