require('dotenv').config(); // импорт для работы с env
const bcrypt = require('bcrypt'); // подключаем библиотеку для шифрования
const jwt = require('jsonwebtoken'); // подключаем библиотеку для токенов
const User = require('../models/user'); // подключаем модель пользователей
const BadRequestError = require('../errors/badRequestError'); // подключаем класс ошибок 400
const ForbiddenError = require('../errors/forbiddenError'); // подключаем класс ошибок 403
const NotFoundErrors = require('../errors/notFoundErrors'); // подключаем класс ошибок 404
const ConflictError = require('../errors/conflictError'); // подключаем класс ошибок 409

// переменные окружения
const { JWT_SECRET, SALT_ROUNDS, NODE_ENV } = process.env;

// регистрация нового пользователя
// next используется для централизованной обработки ошибок
// next не прерывает выполнение кода, поэтому код описанный ниже все равно выполнится,
// нужно выходить из метода при помощи return после выполнения блока next
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('Не переданны имя или email или пароль');
  }

  // ищем пользователя по email на случай того что такой пользователь уже есть в бд
  return User.findOne({ email })
    .then((newUser) => {

      if (newUser) {
        next(new ConflictError('Такой пользователь уже существует'));
        return;
      }

      // если пользователя нет в базе, то создаем нового пользователя и
      // шифруем пароль пользователя
      bcrypt.hash(password, Number(SALT_ROUNDS), (err, hash) => User.create({
        name, email, password: hash
      })
        .then((newUser) => {
          // создаем и отдаем токен
          const token = jwt.sign(
            { _id: newUser._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );

          // Api и front находятся на разных доменах
          // secure: true отпрака куки только по https
          res.cookie('jwt', token, {
            maxAge: 6604800,
            httpOnly: false,
            sameSite: true,
            secure: true,
          });
          const userToSend = {
            name: newUser.name,
            email: newUser.email,
          };
          return res.status(200).send({ message: 'Успешный вход в систему', user: userToSend});
        })
        .catch((err) => {
          console.log(err);
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные пользователя'));
            return;
            // В случае непредвиденной ошибки ответ повиснет, если условие if
            // не сработало, то нужно направлять ошибку в блок next, чтобы вернулся код ответа 500:
          }
          next(err);
        }));
    });
};

// авторизация пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Не переданны email или пароль');
  }

  // ищем пользователя по email и дастаем хеш пароля из БД
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new ForbiddenError('Такого пользователя не существует'));
        return;
      }
      bcrypt.compare(password, user.password, (err, passwordMatch) => {
        // проводим проверку пароля предварительно его расшифровав
        if (!passwordMatch) {
          next(new ForbiddenError('Неправельный пароль'));
          return;
        }
        const userToSend = {
          name: user.name,
          email: user.email,
          // Добавьте другие необходимые поля пользователя
        };
        // создаем и отдаем токен
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );

        // Api и front находятся на разных доменах
        // secure: true отпрака куки только по https
        res.cookie('jwt', token, {
          maxAge: 6604800,
          httpOnly: false,
          sameSite: true,
          secure: true,
        });
        return res.status(200).send({ message: 'Успешный вход в систему', user: userToSend});
      });
    })
    .catch((err) => {
      next(err);
    });
};

// выход из учетной записи
// Здесь мы заменили .status(200) на .sendStatus(200),
//чтобы отправить пустой ответ с кодом состояния 200.
//Это завершит обработку запроса и отправит ответ клиенту после удаления cookie.
const exitUser = (req, res, next) => {
  res.clearCookie('jwt');
  res.sendStatus(200);
};

// получить информацию о себе
const getInfoMe = (req, res, next) => {
  const userId = req.user._id;
  return User.findById(userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundErrors('Пользователь не найден'));
        return;
      }
      next(err);

      if (err.name === 'ValidationError') {
        next(new BadRequestError('Передан некорректный id пользователя'));
        return;
      }
      next(err);
    });
};

// обновить данные о пользователе
const updatetUsers = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundErrors('Пользователь не найден'));
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser,
  login,
  exitUser,
  getInfoMe,
  updatetUsers,
};
