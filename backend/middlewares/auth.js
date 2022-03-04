const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/index');
const {
  authorizationRequired,
  secretKey,
} = require('../utils/constants');

// Авторизация пользователя
exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    // res.status(401).send({ message: authorizationRequired });
    return next(new UnauthorizedError(authorizationRequired));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new UnauthorizedError(authorizationRequired));
  }
  req.user = payload;
  next();
};
