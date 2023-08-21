const { celebrate, Joi } = require('celebrate'); // библиотека валидации
Joi.objectId = require('joi-objectid')(Joi); // для избежания ошибки objectId

const URL_CELEBRATE = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// Данные о фильме
const createMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_CELEBRATE),
    trailerLink: Joi.string().required().pattern(URL_CELEBRATE),
    thumbnail: Joi.string().required().pattern(URL_CELEBRATE),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// удалить фильм
const delMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  createMovie,
  delMovie,
};
