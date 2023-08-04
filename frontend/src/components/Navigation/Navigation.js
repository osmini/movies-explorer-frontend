import {NavLink} from 'react-router-dom'; // импортируем Routes

function Navigation(){
  return (

    <nav className="navigation">
        <NavLink 
          to='/movies' 
          className = {({isActive}) => `${isActive ? "navigation__link_regular hoverLink" : "navigation__link hoverLink"}`}>Фильмы</NavLink>

        <NavLink 
          to='/saved-movies' 
          className = {({isActive}) => `${isActive ? "navigation__link_regular hoverLink" : "navigation__link hoverLink"}`}>Сохранённые фильмы</NavLink>
    </nav>

  );
}

export default Navigation;