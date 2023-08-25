import {Link, useLocation} from 'react-router-dom'; // импортируем Routes
import {useState, useEffect} from 'react';

import { IMG_URL } from '../../data/data';

function MoviesCard(props){
  const {movie, handleLikeClick, handleDeleteClick, savedMovies, dattonChange, setDattonChange} = props; 

  // подписка на новигацию
  const location = useLocation();

  const [likeDell,  setLikeDell] = useState(false); // видимость кнопки лайка
  const [isLiked, setIsLiked] = useState(false); // Используем простое состояние для отслеживания состояния кнопки

  const baseUrl = IMG_URL;

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
        setIsLiked(hasMovie); // Установка состояния кнопки
      }
    }, [movie, savedMovies]); 
  
  // Обработчик клика сохранить фильм себе
  const cardSave = () => {
    handleLikeClick(movie);
  };

  // Обработчик клика удалить фильм
  const cardDelete = () => {
    handleDeleteClick(movie);
  };

  // Обработчик ховера на карточку, показать кнопку
  const LikeDellVisible = () => {
    setLikeDell(true);
  };

    // Обработчик ховера на карточку, убрать кнопку
    const LikeDellInvisible = () => {
      setLikeDell(false);
    };

    return (
      <article className="moviesCard" onMouseEnter={LikeDellVisible} onMouseLeave={LikeDellInvisible}>
        <Link to={movie.trailerLink} target="_blank">
          <img className="moviesCard__img" src={
              movie.image.url ? 
              baseUrl + movie.image.url : 
              movie.image} alt={movie.nameRU} />
        </Link>
        {location.pathname === "/saved-movies" && (
          <button
            className={!likeDell ? "moviesCard__button hoverBatton button_dell" : "moviesCard__button hoverBatton button_dell button_dell-active"}
            type="button"
            onClick={cardDelete}
            aria-label="кнопка удалить"
          />
        )}
        {location.pathname === "/movies" && (
          !isLiked ? (
            <button
              className={!likeDell ? "moviesCard__button hoverBatton" : "moviesCard__button hoverBatton button_active"}
              type="button"
              onClick={cardSave}
              aria-label="кнопка сохранить"
            >
              Сохранить
            </button>
          ) : (
            <button
              className="moviesCard__button hoverBatton button_add"
              type="button"
              onClick={cardSave}
              aria-label="кнопка сохранить"
            />
          )
        )}
        <div className="moviesCard__info">
          <h2 className="moviesCard__info-title">{movie.nameRU}</h2>
          <p className="moviesCard__info-duration">{formatTime(movie.duration)}</p>
        </div>
      </article>
    );
  }
  
  export default MoviesCard;
  