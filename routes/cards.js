const cardRoutes = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationCardId,
} = require('../middlewares/validations');

cardRoutes.get('/', getCards);
cardRoutes.post('/', validationCreateCard, createCard);
cardRoutes.delete('/:cardId', validationCardId, deleteCard);
cardRoutes.put('/:cardId/likes', validationCardId, likeCard);
cardRoutes.delete('/:cardId/likes', validationCardId, dislikeCard);

module.exports = cardRoutes;
