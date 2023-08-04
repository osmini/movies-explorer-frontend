import React from 'react';
import movies_1 from '../../images/1.jpg';

function MoviesCard(props){
  const {titleButonCard} = props;

  return (

    <article className="moviesCard">

      <img className="moviesCard__img" src={movies_1} alt="Фильм"/>
      <button  className="moviesCard__button hoverBatton" type="button" aria-label="кнопка удалить">{titleButonCard}</button>

      <div className="moviesCard__info">
        <h2 className="moviesCard__info-title">33 слова о дизайне</h2>
        <p className="moviesCard__info-duration">1ч 17м</p>

      </div>

    </article>
  );
}

export default MoviesCard;