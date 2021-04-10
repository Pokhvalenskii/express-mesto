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
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: '404 — Карточка по указанному _id не найдена.' });
      } else { res.send(card); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: '400 - Переданы некорректные данные при запросе' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) { res.status(404).send({ message: '404 — Карточка с указанным _id не найдена.' }); }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: '400 - Переданы некорректные данные при запросе' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) { res.status(404).send({ message: '404 — Карточка с указанным _id не найдена.' }); }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: '400 - Переданы некорректные данные при запросе' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  getCards, postCards, removeLike, setLike, deleteCardById,
};
