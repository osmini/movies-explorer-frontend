import Header  from '../Header/Header';
import SearchForm  from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer  from '../Footer/Footer';

function MoviesCardList(props){

  const {titleButonCard} = props;

  return (


    <article className="moviesCardList" aria-label="карточки фильмов">

      <ul className="moviesCardList__wrapper">
        <MoviesCard 
          titleButonCard = {titleButonCard}
        />
        <MoviesCard 
          titleButonCard = {titleButonCard}
        />
        <MoviesCard 
          titleButonCard = {titleButonCard}
        />
        <MoviesCard 
          titleButonCard = {titleButonCard}
        />
        <MoviesCard 
          titleButonCard = {titleButonCard}
        />
        <MoviesCard 
          titleButonCard = {titleButonCard}
        />
        <MoviesCard 
          titleButonCard = {titleButonCard}
        />
        <MoviesCard 
          titleButonCard = {titleButonCard}
        />
        <MoviesCard 
          titleButonCard = {titleButonCard}
        />
      </ul>
      <button className="moviesCardList__button hoverBatton" type="submit"  name="moviesCardList_button"  aria-label="Кнопка показать фильмы">Ещё</button>

    </article>
    
  );
}

export default MoviesCardList;