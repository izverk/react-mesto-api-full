const routes = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { NotFoundError } = require('../errors/index');

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

// обработка не существующего маршрута
routes.use((req, res, next) => {
  next(new NotFoundError('Запрошена не существующая страница'));
});

module.exports = routes;
