const { celebrate, Joi } = require('celebrate'); // библиотека валидации
Joi.objectId = require('joi-objectid')(Joi); // для избежания ошибки objectId

// данные пользователя при регистрации
const login = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

// данные пользователя при авторизации
const avtorization = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// обновление пользователя
const updateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  login,
  avtorization,
  updateUser,
};
