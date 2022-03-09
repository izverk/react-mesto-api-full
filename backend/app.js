// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, errors } = require('celebrate');
const routes = require('./routes/index');
const { auth } = require('./middlewares/auth');
const { handleErrors } = require('./middlewares/handleErrors');
const { login, createUser } = require('./controllers/users');
const { userCreationJoiScheme } = require('./validation/joiSchemes');

const { PORT = 3001 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

// // раздача статичных файлов фронтенда
// app.use(express.static(path.join(__dirname, 'public')));

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
