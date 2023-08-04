import SearchForm from '../SearchForm/SearchForm';
import DecoreLine from '../DecoreLine/DecoreLine';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props){

  const {titleButonCard} = props;

  return (

    <section className="savedMovies">

      <SearchForm />
      <DecoreLine />
      <MoviesCardList 
        titleButonCard = {titleButonCard}
      />

    </section>
  );
}

export default SavedMovies;