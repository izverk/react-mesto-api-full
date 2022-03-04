const cardRoutes = require('express').Router();
const { celebrate } = require('celebrate');
const {
  cardCreationJoiScheme,
  cardParamsJoiScheme,
} = require('../validation/joiSchemes');
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRoutes.post('/', celebrate(cardCreationJoiScheme), createCard);
cardRoutes.get('/', getCards);
cardRoutes.delete('/:cardId', celebrate(cardParamsJoiScheme), deleteCard);
cardRoutes.put('/:cardId/likes', celebrate(cardParamsJoiScheme), likeCard);
cardRoutes.delete('/:cardId/likes', celebrate(cardParamsJoiScheme), dislikeCard);

module.exports = cardRoutes;
