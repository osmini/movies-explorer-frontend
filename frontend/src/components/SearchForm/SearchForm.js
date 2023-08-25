import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'; // импортируем Routes
import find from '../../images/find.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props){
  const{
    getMoviesFromApi, 
    setInputTitleMovies, 
    inputTitleMovies, 
    setInputTitleMoviesSave, 
    inputTitleMoviesSave, 
    setShortMovies, 
    shortMovies, 
    setShortMoviesSave, 
    shortMoviesSave, 
    setMoviesPfilter, 
    setMoviesPfilterSave, 
    setMovies
  } = props;

  const [inputError, setInputError] = useState('');

  // подписка на новигацию
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setInputTitleMoviesSave('');
      setShortMoviesSave(false);
    }
  }, [location.pathname]); 

  //получаем данные из инпута 
  const titleMoviesHandler = (e) => {

    setInputTitleMovies(e.target.value);

    if (e.target.value === ''){
      setMoviesPfilter([]);
      setMovies([]);
    }
  }

  //получаем данные из инпута страницы сохраненки
  const titleMoviesHandlerSave = (e) => {
    console.log(e.target.value);
    setInputTitleMoviesSave(e.target.value);

    if (e.target.value === ''){
      setMoviesPfilterSave([]);
      //setMovies([]);
    }
  }

  //отмена отправки формы 
  const button = (e) => {
    e.preventDefault();
    console.log(inputTitleMoviesSave);
    if (inputTitleMovies.trim() === '') {
      setInputError('Поиск не может быть пустым');
      setMoviesPfilter([]);
    } else {
      setInputError('');
      getMoviesFromApi();
    }
  }
  
  //отмена отправки формы сохраненых фильмов
  const buttonSave = (e) => {
    e.preventDefault();
    if (inputTitleMoviesSave.trim() === '') {
      setInputError('Поиск не может быть пустым');
    } else {
      setInputError('');
    }
  }

  return (

    <section className="searchForm">
      <form className="searchForm__form" name='search_movies'>
        <div className="searchForm__wrapper">
          <input className="searchForm__input"  type="search"   onChange={e => location.pathname === "/movies" ? titleMoviesHandler(e) : titleMoviesHandlerSave(e)} defaultValue={location.pathname === "/movies" ? inputTitleMovies : ''} name="search_input" placeholder="Фильм" required />
          <button className="searchForm__button"  type="submit"  name="search_button"  onClick={location.pathname === "/movies" ? button : buttonSave} aria-label="Кнопка поиска фильма">
            <img className="hoverBatton" src={find} alt="кнопка отправить"/>
          </button>
        </div>
        {inputError && <span className="login__form-error">{inputError}</span>}

        <FilterCheckbox
          setShortMovies = {setShortMovies}
          shortMovies = {shortMovies}
          setShortMoviesSave = {setShortMoviesSave}
          shortMoviesSave = {shortMoviesSave}
        />

      </form>


    </section>
  );
}

export default SearchForm;