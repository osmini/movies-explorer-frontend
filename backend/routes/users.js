const router = require('express').Router(); // подключаем библиотеку express для работы с роутерами

// импорт всех контролеров для работы с пользователями
const {
  getInfoMe, updatetUsers,
} = require('../controllers/users');

// валидация приходящих на сервер данных
const celebrates = require('../middlewares/celebrateUser');

// обработка запроса получения инфы о себе
router.get('/users/me', getInfoMe);

// обработка запроса обновления данных пользователя
router.patch('/users/me', celebrates.updateUser, updatetUsers);

// экспортируем модуль
module.exports = router;
