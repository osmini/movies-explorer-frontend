import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props){

  const {titleButonCard} = props;

  return (
    <main id="main">
      <section className="movies">

        <SearchForm />

        <MoviesCardList 
          titleButonCard = {titleButonCard}
        />

      </section>
    </main>
  );
}

export default Movies;