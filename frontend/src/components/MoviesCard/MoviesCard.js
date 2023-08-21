import {Link, useLocation} from 'react-router-dom'; // импортируем Routes
import {useState, useEffect} from 'react';

function MoviesCard(props){
  const {movie, handleLikeClick, handleDeleteClick, savedMovies} = props; 

  // подписка на новигацию
  const location = useLocation();

  const[dattonChange,  setDattonChange] = useState(false); // карточка сохранилась или нет
  const baseUrl = 'https://api.nomoreparties.co/';

  // Приводим время в формат час минуты
  const formatTime = (duration) => {
    const min = duration % 60;
    const hour = Math.floor(duration / 60);
    return hour ? `${hour}ч ${min}м` : `${min}м`;
  };

  //проверить что этот фильм есть в нашей библиотеке
  useEffect(() => {

    if (savedMovies) {
      const hasMovie = savedMovies.some((savedMovie) => savedMovie.nameRU === movie.nameRU);
      if (hasMovie) {
        setDattonChange(true);
      }
    }
  }, [movie, savedMovies]);
  
  

  // Обработчик клика сохранить фильм себе
  const cardSave = () => {
    handleLikeClick(movie);
    if (!dattonChange){
      setDattonChange(true)
    } else {
      setDattonChange(false)
    }
  };

  // Обработчик клика удалить фильм
  const cardDelete = () => {
    handleDeleteClick(movie);
    
  };

  

  return (

    <article className="moviesCard" >
    
      <Link to={movie.trailerLink} target="_blank">
        <img className="moviesCard__img" src={
            movie.image.url ? 
            baseUrl + movie.image.url : 
            movie.image} alt={movie.nameRU}/>
      </Link>
      {location.pathname === "/saved-movies" ? (<button  className="moviesCard__button hoverBatton button_dell" type="button" onClick={cardDelete} aria-label="кнопка удалить">Удалить</button>) : (

      <button  className={!dattonChange ? "moviesCard__button hoverBatton" : "moviesCard__button hoverBatton button_dell"} type="button" onClick={cardSave} aria-label="кнопка удалить">{!dattonChange ? 'Сохранить' : 'Удалить'}</button>)}

      <div className="moviesCard__info">
        <h2 className="moviesCard__info-title">{movie.nameRU}</h2>
        <p className="moviesCard__info-duration">{formatTime(movie.duration)}</p>

      </div>

    </article>
  );
}

export default MoviesCard;