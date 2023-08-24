import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props){
  const {
    getMoviesFromApi, 
    setInputTitleMovies, 
    setShortMovies, 
    movies, 
    preloder, 
    shortMovies, 
    inputTitleMovies, 
    setMoviesPfilter, 
    setMovies, 
    handleLikeClick,
    savedMovies,
    setDattonChange,
    dattonChange
  } = props;

  return (
    <main id="main">
      <section className="movies">

        <SearchForm 
          getMoviesFromApi = {getMoviesFromApi}
          setInputTitleMovies = {setInputTitleMovies}
          setShortMovies = {setShortMovies}
          shortMovies = {shortMovies}
          inputTitleMovies = {inputTitleMovies}
          setMoviesPfilter = {setMoviesPfilter}
          setMovies = {setMovies}
        />

        <MoviesCardList 
          preloder = {preloder}
          movies = {movies}
          handleLikeClick = {handleLikeClick}
          savedMovies = {savedMovies}
          setDattonChange = {setDattonChange}
          dattonChange = {dattonChange}
        />

      </section>
    </main>
  );
}

export default Movies;