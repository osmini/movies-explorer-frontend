import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props){

  const {titleButonCard} = props;

  return (

    <article className="moviesCardList" aria-label="карточки фильмов">

      <ul className="moviesCardList__wrapper">

        <MoviesCard 
          titleButonCard = {titleButonCard}
          altMovies = "Фильм1"
        />
        <MoviesCard 
          titleButonCard = {titleButonCard}
          altMovies = "Фильм2"
        />
        <MoviesCard 
          titleButonCard = {titleButonCard}
          altMovies = "Фильм3"
        />
        <MoviesCard 
          titleButonCard = {titleButonCard}
          altMovies = "Фильм4"
        />
        <MoviesCard 
          titleButonCard = {titleButonCard}
          altMovies = "Фильм5"
        />

      </ul>
      <button className="moviesCardList__button hoverBatton" type="button"  name="moviesCardList_button"  aria-label="Кнопка показать фильмы">Ещё</button>

    </article>
    
  );
}

export default MoviesCardList;