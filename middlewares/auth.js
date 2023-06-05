const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/NotAuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'mysecretkey');
  } catch (err) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
