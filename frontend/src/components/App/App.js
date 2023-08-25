import {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import {Routes, Route, useNavigate, Navigate, useLocation} from 'react-router-dom'; // импортируем Routes

import Header  from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotPage from '../NotPage/NotPage';
import Footer  from '../Footer/Footer';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import ApiAuth from '../../utils/ApiAuth';
import ApiUsers from '../../utils/ApiUsers';
import MoviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';

// Импортируем объект кloggenInsetUserDataонтекста
import CurrentUserContext from '../../contexts/CurrentUserContext';

import { IMG_URL } from '../../data/data';

function App() {

  const [tooltipPopupOpen, setTooltipPopupOpen] = useState(false);   // открытие попапа
  const [registrIn, setRegistrIn] = useState(false); // стейт регистрации
  const [regAnsve, setRegAnsve] = useState(''); // стейт сообщения в попап регистрации
  const [loggenIn, setLoggenIn] = useState(false); // стейт логина
  const [currentUser , setCurrentUser ] = useState({}); // текущий пользователя
  const [userEmail, setUserEmail] = useState(''); // стейт информации о пользователе
  const [userName, setUserName] = useState(''); // стейт информации о пользователе
  const [movies, setMovies] = useState([]); //карточки фильмов
  const [preloder, setPreloder] = useState(false); //прелодер
  const [inputTitleMovies, setInputTitleMovies] = useState(''); // фильтр по названию фильма
  const [inputTitleMoviesSave, setInputTitleMoviesSave] = useState(''); // фильтр по названию фильма сохранок
  const [shortMovies, setShortMovies] = useState(false); // фильтр по короткометражкам
  const [shortMoviesSave, setShortMoviesSave] = useState(false); // фильтр по короткометражкам сохранок
  const [moviesPfilter, setMoviesPfilter] = useState([]); //карточки фильмов c фильтром
  const [moviesPfilterSave, setMoviesPfilterSave] = useState([]); //карточки фильмов c фильтром для сохранок
  const [savedMovies, setSavedMovies] = useState([]);  // сохранение фильма себе
  const [cookies] = useCookies(['jwt']); // читаем из куки
  const [formValid, setFormValid] = useState(false); // валидация формы

  // подписка на новигацию
  const location = useLocation();
  const navigate = useNavigate();

  // запрос на регистрацию
  function handleRegistr(registerName, registerEmail, registerPassword){
    ApiAuth.postRegistrUser(registerName, registerEmail, registerPassword)
    .then((data) =>{
      setLoggenIn(true);
      setUserName(data.user.name);
      setUserEmail(data.user.email);
      const result = {
        popup: true,
        registr: true
      };
      navigate('/movies');
      setRegAnsve('Вы успешно зарегистрировались!');
      handleTooltipPopupOpen(result);
      setFormValid(true);
    })
    .catch(() => {
      const result = {
        popup: true,
        registr: false
      };
      handleTooltipPopupOpen(result);
      setRegAnsve('Что-то прошло не так! Попробуйте ещё раз.');
      setFormValid(true);
    })
  }

  // запрос  на авторизацию
  function handleLogin(registerEmail, registerPassword){
    ApiAuth.postAutoriseUser(registerEmail, registerPassword)
    .then((data) =>{
      setLoggenIn(true);
      console.log();
      setUserName(data.user.name);
      setUserEmail(data.user.email);
      navigate('/movies');
    })
    .catch(() => {
      const result = {
        popup: true,
        registr: false
      };
      handleTooltipPopupOpen(result);
      setRegAnsve('Что-то прошло не так! Попробуйте ещё раз.');
    })
    .finally(() => {
      setFormValid(true);
    })
  }

  // проверяем токен при первой загрузки
  useEffect(()=>{
    
    if (cookies.jwt){
      setLoggenIn(true);
      ApiAuth.getCheakTokenUser()
      .then((data) =>{
        if(data){
          if (!loggenIn){
            localStorage.setItem('shortMovies', false);
            localStorage.setItem('inputTitleMovies', '');
          }
          setUserName(data.name);
          setUserEmail(data.email);
          navigate(location.pathname);
        };
      })
      .catch((err) => {
      
        console.log(err);
      })
      } else {
        setLoggenIn(false);
    }
  }, []);

  // обработчик выхода из профиля
  function onSignOut(){
    setLoggenIn(false);
  
    ApiAuth.exitUser()
      .catch((err) => {
        console.log(err);
      });

    localStorage.removeItem('shortMovies');
    localStorage.removeItem('inputTitleMovies');
    localStorage.removeItem('movies');

    setInputTitleMovies('');
    setInputTitleMoviesSave('');
    setMovies([]);  
  }

  // обновить данные о пользователе
  function handleUpdateUser(date) {
    ApiUsers.patchInfoUserForServer(date)
    .then((user) => {
      setUserName(user.name);
      setUserEmail(user.email);
      const result = {
        popup: true,
        registr: true
      };
      handleTooltipPopupOpen(result);
      setRegAnsve('Изменения внесены');
    })
    .catch((err) => {
      const result = {
        popup: true,
        registr: false
      };
      handleTooltipPopupOpen(result);
      setRegAnsve('Что-то прошло не так! Попробуйте ещё раз.');
      console.log(err);
    })
    .finally(() => {
      setFormValid(true);
    })
  }

  // Загрузка данных из localStorage при монтировании компонента
  useEffect(() => {
    if (loggenIn) {
      const savedShortMovies = JSON.parse(localStorage.getItem('shortMovies'));
      const savedInputTitleMovies = localStorage.getItem('inputTitleMovies');
      const searhMovaes = (JSON.parse(localStorage.getItem('movies')));
    
      // Проверяем, есть ли сохраненные данные в localStorage
      if (savedShortMovies) {
        setShortMovies(savedShortMovies);
      }
      if (savedInputTitleMovies) {
        setInputTitleMovies(savedInputTitleMovies);
      }
      if (searhMovaes) {
        setMovies(searhMovaes);
      }
    }
  }, [loggenIn]);

  // Сохранение данных в localStorage при изменении соответствующих состояний
  useEffect(() => {
    if (loggenIn) {
      localStorage.setItem('shortMovies', shortMovies);
    }
  }, [loggenIn, shortMovies, shortMoviesSave]);

  useEffect(() => {
    if (loggenIn) {
      localStorage.setItem('inputTitleMovies', inputTitleMovies);
    }
  }, [loggenIn, inputTitleMovies]);

  //api получить все фильмы из яндекс
  function getMoviesFromApi() {
    setPreloder(true);
  
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
  
    if (storedMovies) {
      setMovies(storedMovies);
      setPreloder(false);
    } else {
      MoviesApi.getMovies()
        .then((movies) => {
          if (inputTitleMovies !== "") {
            setMovies(movies);
            localStorage.setItem('movies', JSON.stringify(movies));
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setPreloder(false));
    }
  }
  
  
  //фильтр фильмов api
  useEffect(() => {
    let filteredMovies = movies;
  
    if (shortMovies) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration <= 40);
    } else {
      filteredMovies = filteredMovies.filter((movie) => movie.duration > 1);
    }
  
    if (inputTitleMovies !== "") {
      const searchQuery = inputTitleMovies.toLowerCase();
      filteredMovies = filteredMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery) ||
        movie.nameEN.toLowerCase().includes(searchQuery)
      )
    }
  
    setMoviesPfilter(filteredMovies);
  
  }, [movies, shortMovies, inputTitleMovies]);

  // Получаю сохранённые фильмы
  useEffect(() => {
    if (loggenIn) {
      MainApi.getSavedMovies()
        .then((movies) => setSavedMovies(movies.reverse()))
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggenIn]);

  //фильтр сохраненых фильмов 
  useEffect(() => {
    let filteredMoviesSave = savedMovies;
  
    if (shortMoviesSave) {
      filteredMoviesSave = filteredMoviesSave.filter((movie) => movie.duration <= 40);
    } else {
      filteredMoviesSave = filteredMoviesSave.filter((movie) => movie.duration > 1);
    }
  
    if (inputTitleMoviesSave !== "") {
      const searchQuerySave = inputTitleMoviesSave.toLowerCase();
      filteredMoviesSave = filteredMoviesSave.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuerySave) ||
        movie.nameEN.toLowerCase().includes(searchQuerySave)
      )
    }
  
    setMoviesPfilterSave(filteredMoviesSave);
  
  }, [savedMovies, shortMoviesSave, inputTitleMoviesSave]);
    
  // сохранить фильм себе или удалить если карточка уже есть у вас
  const handleLikeClick = (movie) => {
    const isMovieSaved = savedMovies.some((item) => item.movieId === movie.id);
    if (!isMovieSaved) {
      MainApi.saveMovie({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: IMG_URL + movie.image.url,
          trailerLink: movie.trailerLink,
          thumbnail: IMG_URL + movie.image.formats.thumbnail.url,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        })
        .then((savedMovie) => setSavedMovies([savedMovie, ...savedMovies]))
        .catch((err) => console.log(err));
    } else {
      const savedMovieId = savedMovies.find(
        (item) => item.movieId === movie.id
      )._id;
      MainApi.deleteMovie(savedMovieId)
        .then(() => {
          setSavedMovies((state) =>
            state.filter((item) => item.movieId !== movie.id)
          );
        })
        .catch((err) => console.log(err));
    }
  };

  //Удалить фильм из сохранок
  const handleDeleteClick = (movie) => {
    MainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item.movieId !== movie.movieId)
        );
      })
      .catch((err) => console.log(err));
  };

  // работа с попапами
  function handleTooltipPopupOpen(result){
    setTooltipPopupOpen(result.popup);
    setRegistrIn(result.registr)
  }

  // закрытие попапов на крестик
  function closeAllPopups(){
    setTooltipPopupOpen(false);
  }

  //  обработчик закрытие попап на Escape
  const isOpen = tooltipPopupOpen

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  return (

  <CurrentUserContext.Provider value={currentUser}>
    {location.pathname === "/"  && <Header 
      loggenIn= {loggenIn}
      userEmail = {userEmail}
      onSignOut = {onSignOut}
    />} 
    {location.pathname === "/movies"  && <Header 
      loggenIn= {loggenIn}
      userEmail = {userEmail}
      onSignOut = {onSignOut}
    />} 
    {location.pathname === "/saved-movies"  && <Header 
      loggenIn= {loggenIn}
      userEmail = {userEmail}
      onSignOut = {onSignOut}
    />} 
    {location.pathname === "/profile"  && 
    <Header
      loggenIn= {loggenIn}
      userEmail = {userEmail}
      onSignOut = {onSignOut}
    />} 

    <Routes>

      <Route path="/signup" element={
        loggenIn ? <Navigate to="/" /> : (
        <Login
          name = 'registr'
          title = 'Добро пожаловать!'
          buttonTitle = 'Зарегистрироваться'
          text = 'Уже зарегистрированы?'
          textLink = 'Войти'
          urlLink = '/signin'
          handleRegistr = {handleRegistr}
          formValid = {formValid}
          setFormValid = {setFormValid}
        />
        )
      }/>

      <Route path="/signin" element={
        loggenIn ? <Navigate to="/" /> : (
        <Login
          name = 'avtorize'
          title = 'Рады видеть!'
          buttonTitle = 'Войти'
          text = 'Ещё не зарегистрированы?'
          textLink = 'Регистрация'
          urlLink = '/signup'
          handleLogin = {handleLogin}
          formValid = {formValid}
          setFormValid = {setFormValid}
        />
        )
      }/>

      <Route path="/" element={
        <Main />
      }/>

      <Route path="/movies" element={
        <ProtectedRoute 
          element={
          <Movies 
            getMoviesFromApi = {getMoviesFromApi}
            setInputTitleMovies = {setInputTitleMovies}
            setShortMovies = {setShortMovies}
            preloder = {preloder}
            movies = {moviesPfilter}
            shortMovies = {shortMovies}
            inputTitleMovies = {inputTitleMovies}
            setMoviesPfilter = {setMoviesPfilter}
            setMovies = {setMovies}
            handleLikeClick = {handleLikeClick}
            savedMovies = {savedMovies}
          />
        }
        loggenIn={loggenIn} 
        />
      }/>

      <Route path="/saved-movies" element={
        <ProtectedRoute 
          element={
          <SavedMovies 
          getMoviesFromApi = {getMoviesFromApi}
          setInputTitleMoviesSave = {setInputTitleMoviesSave}
          inputTitleMoviesSave = {inputTitleMoviesSave}
          setShortMoviesSave = {setShortMoviesSave}
          preloder = {preloder}
          shortMoviesSave = {shortMoviesSave}
          setMoviesPfilterSave = {setMoviesPfilterSave}
          setMovies = {setMovies}
          handleLikeClick = {handleLikeClick}
          savedMovies = {moviesPfilterSave}
          handleDeleteClick = {handleDeleteClick}
          />
        }
        loggenIn={loggenIn} 
        />
      }/>

      <Route path="/profile" element={
        <ProtectedRoute 
        element={
          <Profile 
            userName = {userName}
            userEmail = {userEmail}
            onSignOut = {onSignOut}
            handleUpdateUser = {handleUpdateUser}
          />
        }
        loggenIn = {loggenIn} 
        />
      }/>

      <Route path="*" element= {
        <NotPage 
          loggenIn={loggenIn} 
        />
      }/>   

    </Routes>

    <InfoTooltip 
      onClose={closeAllPopups} 
      tooltipPopupOpen={tooltipPopupOpen} 
      registrIn={registrIn} 
      regAnsve={regAnsve}
    /> 

    {location.pathname === "/"  && <Footer />} 
    {location.pathname === "/movies"  && <Footer />} 
    {location.pathname === "/saved-movies"  && <Footer />} 
    
  </CurrentUserContext.Provider>   
  );
}

export default App;