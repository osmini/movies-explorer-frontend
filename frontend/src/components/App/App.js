import React from 'react';
import { Routes, Route, useLocation} from 'react-router-dom'; // импортируем Routes


import Header  from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotPage from '../NotPage/NotPage';
import Footer  from '../Footer/Footer';

function App() {

  // подписка на новигацию
  const location = useLocation();

  return (
<>
      {location.pathname === "/"  && <Header />} 
      {location.pathname === "/movies"  && <Header />} 
      {location.pathname === "/saved-movies"  && <Header />} 
      {location.pathname === "/profile"  && <Header />} 

      <Routes>

        <Route path="/signup" element={
          <Login
            title = 'Добро пожаловать!'
            buttonTitle = 'Зарегистрироваться'
            text = 'Уже зарегистрированы?'
            textLink = 'Войти'
            urlLink = '/signin'
          />
        }/>

        <Route path="/signin" element={
          <Login
            title = 'Рады видеть!'
            buttonTitle = 'Войти'
            text = 'Ещё не зарегистрированы?'
            textLink = 'Регистрация'
            urlLink = '/signup'
          />
        }/>

        <Route path="/" element={
          <Main />
        }/>

        <Route path="/movies" element={
          <Movies 
            titleButonCard = 'Сохранить'
          />
        }/>

        <Route path="/saved-movies" element={
          <SavedMovies 
            titleButonCard = 'Удалить'
          />
        }/>

        <Route path="/profile" element={
          <Profile />
        }/>

        <Route path="*" element= {
          <NotPage />
        }/>   

      </Routes>

      {location.pathname === "/"  && <Footer />} 
      {location.pathname === "/movies"  && <Footer />} 
      {location.pathname === "/saved-movies"  && <Footer />} 
  </>    
  );
}

export default App;