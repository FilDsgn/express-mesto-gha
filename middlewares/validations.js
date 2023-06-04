const { celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const { isUrl } = require('validator');

const BadRequestError = require('../errors/BadRequestError');

const validationUrl = (url) => {
  if (isUrl(url)) {
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
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string().custom(validationUrl).required(),
    }),
});

const validationGetUserById = celebrate({
  body: Joi.object()
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
  body: Joi.object()
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
