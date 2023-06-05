const { celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const { isURL } = require('validator');

const BadRequestError = require('../errors/BadRequestError');

const validationUrl = (url) => {
  if (isURL(url)) {
    return url;
  }

  throw new BadRequestError('Переданы некорректные данные при обновлении аватара.');
};

const validationId = (id) => {
  if (mongoose.isValidObjectId(id)) {
    return id;
  }

  throw new BadRequestError('Передан некорректный ID');
};

const validationUpdateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string().custom(validationUrl).required(),
    }),
});

const validationGetUserById = celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().custom(validationId).required(),
    }),
});

const validationCreateUser = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validationUrl),
    }),
});

const validationLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
});

const validationCreateCard = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().custom(validationUrl).required(),
    }),
});

const validationCardId = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().custom(validationId).required(),
    }),
});

module.exports = {
  validationUpdateUser,
  validationUpdateAvatar,
  validationGetUserById,
  validationCreateUser,
  validationLogin,
  validationCreateCard,
  validationCardId,
};
