// сообщения ответов сервера
const userNotFound = 'Пользователь не найден';
const cardNotFound = 'Карточка с указанным _id не найдена';
const incorrectData = 'Переданы некорректные данные';
const mongoDuplicateKey = 'Пользователь с таким email уже существует';
const successfulAuthorization = 'Успешная авторизация';
const authorizationRequired = 'Требуется авторизация';
const cantDeleteNotOwnCard = 'Нельзя удалить чужую карточку';
const incorrectEmailOrPassword = 'Неверный email или пароль';
const incorrectCardLink = 'Некорректный формат ссылки на карточку';
const incorrectAvatarLink = 'Некорректный формат ссылки на картинку аватара';

// количество проходов для хеширования пароля пользователя
const saltRounds = 10;

// код ошибки дублирования уникального ключа MongoDB
const mongoDuplicateKeyErrorCode = 11000;

// ключ для токена
const secretKey = 'secret-key-for-token-14sprint';

// массив разрешенных доменов для кросс-доменных запросов
const allowedCors = [
  'http://izverk.students.nomoredomains.xyz',
  'http://localhost:3000',
  'https://izverk.students.nomoredomains.xyz',
  'https://localhost:3000',
];

// список разрешенных методов для кросс-доменных запросов
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  userNotFound,
  cardNotFound,
  incorrectData,
  saltRounds,
  mongoDuplicateKeyErrorCode,
  mongoDuplicateKey,
  incorrectEmailOrPassword,
  successfulAuthorization,
  authorizationRequired,
  cantDeleteNotOwnCard,
  incorrectCardLink,
  incorrectAvatarLink,
  secretKey,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
