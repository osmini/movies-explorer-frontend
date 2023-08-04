import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import DecoreLine from '../DecoreLine/DecoreLine';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props){

  const {titleButonCard} = props;

  return (

    <section className="movies">

      <SearchForm />
      <DecoreLine />
      <MoviesCardList 
        titleButonCard = {titleButonCard}
      />

    </section>
  );
}

export default Movies;