const mongoose = require('mongoose'); // подключаем mongoose
const validator = require('validator'); // подключаем библиотеку валидатор

// описываем схему пользователя
// require: trye - поле обязательно
// minlength: 2 - минимальное количество символов в поле
// maxlength: 30 - максимальное количество символов
const userSchame = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Некорректный email',
      },
      required: [true, 'Поле "email" должно быть заполнено'],
    },
    password: {
      type: String,
      required: [true, 'Поле "password" должно быть заполнено'],
      select: false, // запрет на возвращение хеш пароля
    },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      required: [true, 'Поле "name" должно быть заполнено'],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchame);
