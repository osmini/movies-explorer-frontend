import SearchForm from '../SearchForm/SearchForm';
import DecoreLine from '../DecoreLine/DecoreLine';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props){

  const {titleButonCard} = props;

  return (
  <main id="main">
    <section className="savedMovies">

      <SearchForm />
      <DecoreLine />
      <MoviesCardList 
        titleButonCard = {titleButonCard}
      />

    </section>
  </main>
  );
}

export default SavedMovies;