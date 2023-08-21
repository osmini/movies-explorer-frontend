import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props){

  const {titleButonCard} = props;

  return (
  <main id="main">
    <section className="savedMovies">

      <SearchForm />

      <MoviesCardList 
        titleButonCard = {titleButonCard}
      />

    </section>
  </main>
  );
}

export default SavedMovies;