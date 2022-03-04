const Card = require('../models/card');
const {
  sendData,
} = require('../utils/utils');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/index');
const {
  cardNotFound,
  incorrectData,
  cantDeleteNotOwnCard,
  incorrectCardLink,
} = require('../utils/constants');

exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: owner } = req.user;
  Card.create({ name, link, owner })
    .then((card) => {
      sendData({ dataType: 'card' }, 201, card, res);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' && err.message.includes(incorrectCardLink)) {
        next(new BadRequestError(incorrectCardLink));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(incorrectData));
      } else next(err);
    });
};

exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      sendData({ dataType: 'cards' }, 200, cards, res);
    })
    .catch(next);
};

exports.deleteCard = (req, res, next) => {
  const currentUserId = req.user._id;
  // сначала ищем и проверяем карточку
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(cardNotFound);
      }
      const ownerId = card.owner.toString();
      if (ownerId !== currentUserId) {
        throw new ForbiddenError(cantDeleteNotOwnCard);
      }
      Card.findByIdAndRemove(req.params.cardId) // удаляем карточку после всех проверок
        .then((removedCard) => {
          sendData({ dataType: 'card' }, 200, removedCard, res);
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new BadRequestError(incorrectData));
          } else next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(incorrectData));
      } else next(err);
    });
};

exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавляем _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(cardNotFound);
      }
      sendData({ dataType: 'card' }, 200, card, res);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(incorrectData));
      } else next(err);
    });
};

exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убираем _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(cardNotFound);
      }
      sendData({ dataType: 'card' }, 200, card, res);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(incorrectData));
      } else next(err);
    });
};
