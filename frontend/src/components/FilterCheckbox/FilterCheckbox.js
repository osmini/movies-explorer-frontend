import {useLocation} from 'react-router-dom'; // импортируем Routes

function FilterCheckbox(props){

  const {setShortMovies, shortMovies, setShortMoviesSave, shortMoviesSave} = props;

  // подписка на новигацию
  const location = useLocation();

  // Переключение чекбокса
  const handleCheckbox = (e) => {
    setShortMovies(e.target.checked);
  };

    // Переключение чекбокса для сохранок
    const handleCheckboxSave = (e) => {
      setShortMoviesSave(e.target.checked);
    };
    

  return (

        <label className="filterCheckbox hoverBatton">
          <div className="filterCheckbox__wrapper">
              <input className="filterCheckbox__input" type="checkbox" checked={location.pathname === "/movies" ? shortMovies : shortMoviesSave } onChange={location.pathname === "/movies" ? handleCheckbox : handleCheckboxSave}/>
              <span className="filterCheckbox__tumbler" />
          </div>
          <p className="filterCheckbox__text">Короткометражки</p>
        </label>

  );
}

export default FilterCheckbox;