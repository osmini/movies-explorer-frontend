import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'; // импортируем Routes

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props){

  const {movies, preloder, handleLikeClick, handleDeleteClick, savedMovies, setDattonChange, dattonChange} = props;

  // подписка на новигацию
  const location = useLocation();
  
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [startVisibleMovies, setStartVisibleMovies] = useState(1);

  // проверяем размер экрана
  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth !== screenWidth) {
        setScreenWidth(newScreenWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);

  useEffect(() => {
    if (screenWidth >= 1140) {
      setStartVisibleMovies(12);
    } 
    if (screenWidth < 1139 ) {
      setStartVisibleMovies(8);
    }
    if (screenWidth < 767 ) {
      setStartVisibleMovies(5);
    }
  }, [screenWidth, movies]);

  // функция добавления карточек по кнопке
  function loadMoreMovies() {
    if (screenWidth >= 1140) {
      setStartVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 3);
    } 
    if (screenWidth < 1139 ) {
      setStartVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 2);
    }
  }

  return (

    <article className="moviesCardList" aria-label="карточки фильмов" >

      {preloder && <Preloader/>}

        {movies.length === 0 ? (
          <p className='moviesCardList__notFiand'>Ничего не найдено</p>
        ) : (
        <ul className="moviesCardList__wrapper" >
          {movies.slice(0, startVisibleMovies).map((movie) => (
            
            <MoviesCard 
            movie={movie}
            handleLikeClick={handleLikeClick}
            handleDeleteClick={handleDeleteClick}
            savedMovies={savedMovies}
            key={location.pathname === "/movies" ? movie.id : movie._id }
            setDattonChange = {setDattonChange}
            dattonChange = {dattonChange}
          />
          ))}
        </ul>
        )}

        {movies.length === 0 || startVisibleMovies >=  movies.length || location.pathname === "/saved-movies" ? (null):( 
          <button className="moviesCardList__button hoverBatton" onClick={loadMoreMovies} type="button" name="moviesCardList_button" aria-label="Кнопка показать фильмы">Ещё</button>
        )}

    </article>
    
  );
}

export default MoviesCardList;