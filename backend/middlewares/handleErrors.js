exports.handleErrors = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(
    `Ошибка! Код: ${statusCode} Сообщение: ${message}`,
    'Объект ошибки:',
    err,
  );
  res.status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});
