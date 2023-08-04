import React from 'react';
import find from '../../images/find.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(){

  return (

    <section className="searchForm">
      <form className="searchForm__form" name='search_movies'>
        <div className="searchForm__wrapper">
          <input className="searchForm__input"  type="search"  name="search_input"  placeholder="Фильм"/>
          <button className="searchForm__button"  type="submit"  name="search_button"  aria-label="Кнопка поиска фильма">
            <img className="hoverBatton" src={find} alt="кнопка отправить"/>
          </button>
        </div>

        <FilterCheckbox/>

      </form>


    </section>
  );
}

export default SearchForm;