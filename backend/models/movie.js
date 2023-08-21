const mongoose = require('mongoose'); // подключаем mongoose
const validator = require('validator'); // подключаем библиотеку валидатор

// описываем схему пользователя
// require: trye - поле обязательно
// minlength: 2 - минимальное количество символов в поле
// maxlength: 30 - максимальное количество символов
const movieSchame = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Отсутствует страна создания фильма'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
    },
    director: {
      type: String,
      required: [true, 'Отсутствует режисер фильма'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
    },
    duration: {
      type: Number,
      required: [true, 'Отсутствует длительность фильма'],
    },
    year: {
      type: String,
      required: [true, 'Отсутствует год выпуска фильма'],
    },
    description: {
      type: String,
      required: [true, 'Отсутствует описание фильма'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
    },
    image: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректная ссылка на постер к фильму',
      },
      required: [true, 'Отсутствует ссылка на постер к фильму'],
    },
    trailerLink: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректная ссылка на трейлер к фильму',
      },
      required: [true, 'Отсутствует ссылка на трейлер к фильму'],
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректная ссылка на миниатюру к фильму',
      },
      required: [true, 'Отсутствует ссылка на миниатюру к фильму'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: [true, 'Отсутствует id фильма от сервиса MoviesExplorer'],
    },
    nameRU: {
      type: String,
      required: [true, 'Отсутствует название фильма на руссаком языке'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
    },
    nameEN: {
      type: String,
      required: [true, 'Отсутствует название фильма на английском языке'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchame);
