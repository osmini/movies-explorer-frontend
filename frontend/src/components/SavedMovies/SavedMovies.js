import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props){

  const {
    getMoviesFromApi, 
    setInputTitleMoviesSave, 
    inputTitleMoviesSave,  
    setShortMoviesSave, 
    shortMoviesSave, 
    savedMovies, 
    preloder, 
    moviesPfilterSave, 
    setMoviesPfilterSave, 
    setMovies, 
    handleLikeClick,
    handleDeleteClick,
  } = props;

  return (
  <main id="main">
    <section className="savedMovies">

      <SearchForm 
        getMoviesFromApi = {getMoviesFromApi}
        setInputTitleMoviesSave = {setInputTitleMoviesSave}
        inputTitleMoviesSave = {inputTitleMoviesSave}
        setShortMoviesSave = {setShortMoviesSave}
        shortMoviesSave = {shortMoviesSave}
        setMoviesPfilterSave = {setMoviesPfilterSave}
        setMovies = {setMovies}
      />

      <MoviesCardList 
        preloder = {preloder}
        moviesPfilterSave = {moviesPfilterSave}
        handleLikeClick = {handleLikeClick}
        movies = {savedMovies}
        handleDeleteClick = {handleDeleteClick}
      />

    </section>
  </main>
  );
}

export default SavedMovies;