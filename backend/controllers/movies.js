const Movies = require('../models/movie'); // подключаем модель пользователей
const BadRequestError = require('../errors/badRequestError'); // подключаем класс ошибок 400
const ForbiddenError = require('../errors/forbiddenError'); // подключаем класс ошибок 403
const NotFoundErrors = require('../errors/notFoundErrors'); // подключаем класс ошибок 404

// получить все фильмы пользователя
const getMovies = (req, res, next) => Movies.find({ owner: req.user._id })
  .then((movies) => {
    if (!movies) {
      next(new NotFoundErrors({ message: 'Фильмы не найдены' }));
      return false;
    }
    return res.status(200).send(movies);
  })
  .catch((err) => {
    next(err);
  });

// создать фильм
const createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  return Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((newMovie) => res.status(201).send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('переданы некорректные данные о фильме'));
        return;
      }
      next(err);
    });
};

// удалить сохраненный фильм по id
const delMovies = (req, res, next) => {
  const owner = req.user._id;

  // проверка наличия фильма и прав на удаление
  Movies.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundErrors('фильм не найден'));
        return;
      }

      if (movie.owner.toString() !== owner) {
        next(new ForbiddenError('Вы не можите удалить чужой фильм'));
        return;
      }
      return Movies.deleteOne(movie)
        .then(() => res.status(200).send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id фильма'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovies,
  delMovies,
};
