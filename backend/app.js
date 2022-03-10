// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, errors } = require('celebrate');
const routes = require('./routes/index');
const { auth } = require('./middlewares/auth');
const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('./utils/constants');
const { handleErrors } = require('./middlewares/handleErrors');
const { login, createUser } = require('./controllers/users');
const { userCreationJoiScheme } = require('./validation/joiSchemes');

const { PORT = 3001 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

// CORS
// обработчик простых CORS-запросов
app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }
  next();
});
// обработчик предварительных CORS-запросов
app.use((req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.set('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

// роуты, не требующие авторизации (регистрация и вход)
app.post('/signup', celebrate(userCreationJoiScheme), createUser);
app.post('/signin', celebrate(userCreationJoiScheme), login);

// защита маршрутов авторизацией (проверка токена)
app.use(auth);

// маршрутизация
app.use(routes);

// обработчик ошибок валидации celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(handleErrors);

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  })
    .then(() => { console.log('Установлено соединение с БД!'); })
    .catch((err) => { console.log('Ошибка при соединении с БД!:', err); });

  app.listen(PORT, () => {
    console.log(`Приложение запущено на порту ${PORT}!`);
  });
};

main();
