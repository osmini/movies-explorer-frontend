import {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'; // импортируем Routes

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
  //const [title, setTitle] = useState(userName); // имя пользователя

  // подписка на новигацию
  const location = useLocation();
  const navigate = useNavigate();

  // запрос на регистрацию
  function handleRegistr(registerName, registerEmail, registerPassword){
    ApiAuth.postRegistrUser(registerName, registerEmail, registerPassword)
    .then(() =>{
      const result = {
        popup: true,
        registr: true
      };
      handleTooltipPopupOpen(result);
      navigate('/signin');
      setRegAnsve('Вы успешно зарегистрировались!');
    })
    .catch(() => {
      const result = {
        popup: true,
        registr: false
      };
      handleTooltipPopupOpen(result);
      setRegAnsve('Что-то прошло не так! Попробуйте ещё раз.');
    })
  }

  // запрос  на авторизацию
  function handleLogin(registerEmail, registerPassword){

    ApiAuth.postAutoriseUser(registerEmail, registerPassword)
    .then((data) =>{
      setLoggenIn(true);
      setUserName(data.user.name);
      setUserEmail(data.user.email);
      navigate('/');
    })
    .catch(() => {
      const result = {
        popup: true,
        registr: false
      };
      handleTooltipPopupOpen(result);
      setRegAnsve('Что-то прошло не так! Попробуйте ещё раз.');
    })
  }

  // проверяем токен при первой загрузки
  useEffect(()=>{
    
    if (cookies.jwt){
      setLoggenIn(true);
      ApiAuth.getCheakTokenUser()
      .then((data) =>{
        if(data){
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
    localStorage.removeItem('shortMoviesSave');
    localStorage.removeItem('inputTitleMovies');
    localStorage.removeItem('inputTitleMoviesSave');
    localStorage.removeItem('movies');

    setInputTitleMovies('');
    setInputTitleMoviesSave('');
    setMovies([]);  
  }

  // обновить данные о пользователе
  function handleUpdateUser(date) {
    ApiUsers.patchInfoUserForServer(date)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // Загрузка данных из localStorage при монтировании компонента
  useEffect(() => {
    if (loggenIn) {
      const savedShortMovies = JSON.parse(localStorage.getItem('shortMovies'));
      const savedShortMoviesSave = JSON.parse(localStorage.getItem('shortMoviesSave'));
      const savedInputTitleMovies = localStorage.getItem('inputTitleMovies');
      const savedInputTitleMoviesSave = localStorage.getItem('inputTitleMoviesSave');
      const searhMovaes = (JSON.parse(localStorage.getItem('movies')));
    
      // Проверяем, есть ли сохраненные данные в localStorage
      if (savedShortMovies) {
        setShortMovies(savedShortMovies);
      }
      if (savedShortMoviesSave) {
        setShortMoviesSave(savedShortMoviesSave);
      }
      if (savedInputTitleMovies) {
        setInputTitleMovies(savedInputTitleMovies);
      }
      if (savedInputTitleMoviesSave) {
        setInputTitleMoviesSave(savedInputTitleMoviesSave);
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
      localStorage.setItem('shortMoviesSave', shortMoviesSave);
    }
  }, [loggenIn, shortMovies, shortMoviesSave]);

  useEffect(() => {
    if (loggenIn) {
      localStorage.setItem('inputTitleMovies', inputTitleMovies);
      localStorage.setItem('inputTitleMoviesSave', inputTitleMoviesSave);
    }
  }, [loggenIn, inputTitleMovies, inputTitleMoviesSave]);

  //api получить все фильмы из яндекс
  function getMoviesFromApi(){
    
    setPreloder(true);
  
    MoviesApi.getMovies()
    .then((movies) => {
      if ('inputTitleMovies' in localStorage) {
        setInputTitleMovies(localStorage.getItem('inputTitleMovies'));
      }
      if (inputTitleMovies !== ""){
        setMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
    setPreloder(false)); // завершаем загрузку 
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
          image: 'https://api.nomoreparties.co' + movie.image.url,
          trailerLink: movie.trailerLink,
          thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
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
        <Login
          name = 'registr'
          title = 'Добро пожаловать!'
          buttonTitle = 'Зарегистрироваться'
          text = 'Уже зарегистрированы?'
          textLink = 'Войти'
          urlLink = '/signin'
          handleRegistr = {handleRegistr}
        />
      }/>

      <Route path="/signin" element={
        <Login
          name = 'avtorize'
          title = 'Рады видеть!'
          buttonTitle = 'Войти'
          text = 'Ещё не зарегистрированы?'
          textLink = 'Регистрация'
          urlLink = '/signup'
          handleLogin = {handleLogin}
        />
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
            setUserName = {setUserName}
            userEmail = {userEmail}
            onSignOut = {onSignOut}
            handleUpdateUser = {handleUpdateUser}
          />
        }
        loggenIn = {loggenIn} 
        />
      }/>

      <Route path="*" element= {
        <NotPage />
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