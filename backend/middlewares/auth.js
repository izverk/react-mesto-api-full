const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/index');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  authorizationRequired,
  secretKey,
} = require('../utils/constants');

// Авторизация пользователя
exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new UnauthorizedError(authorizationRequired));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : secretKey);
  } catch (err) {
    return next(new UnauthorizedError(authorizationRequired));
  }
  req.user = payload;
  next();
};
