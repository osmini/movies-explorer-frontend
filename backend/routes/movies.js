const router = require('express').Router(); // подключаем библиотеку express для работы с роутерами

// импорт всех контролеров для работы с пользователями
const {
  getMovies, createMovies, delMovies,
} = require('../controllers/movies');

// валидация приходящих на сервер данных
const celebrates = require('../middlewares/celebrateMovies');

// обработка запроса получения всех сохраненных пользователем фильмов
router.get('/', getMovies);

// создать запись о фильме
router.post('/', celebrates.createMovie, createMovies);

// обработка запроса  на удаления фильма
router.delete('/:id', celebrates.delMovie, delMovies);

// экспортируем модуль
module.exports = router;
