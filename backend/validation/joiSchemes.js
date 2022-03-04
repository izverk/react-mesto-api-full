const { Joi } = require('celebrate');

exports.userCreationJoiScheme = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

exports.userUpdateJoiScheme = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

exports.avatarUpdateJoiScheme = {
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^https?:\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/),
  }),
};

exports.userParamsJoiScheme = {
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
};

exports.cardCreationJoiScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/),
  }),
};

exports.cardParamsJoiScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
};
