import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom'; // импортируем Routes

import logo from '../../images/logo.svg';

import Navigation  from '../Navigation/Navigation';
import Burger  from '../Burger/Burger';


function Header(){

  const [burgerMenu, setBurgerMenu] = useState(false);

  // подписка на новигацию
  const location = useLocation();

  // управление бургером
  function handleOpenBurger() {
    setBurgerMenu(true);
  }

  function handleCloseBurger() {
    setBurgerMenu(false);
  }

  return (
    <header className="header">
      <Link to='/'>
        <img className="header__logo hoverBatton" src={logo} alt="логотип Movies"/>
      </Link>

      {location.pathname != "/" &&  <Navigation />}

      <nav className="header__menu">
          {location.pathname === "/" &&   <Link  to='/signup' className="header__menu-login hoverBatton">Регистрация</Link>}
          {location.pathname === "/" ? (
          <Link  to='/signin' className="header__menu-link hoverBatton">Войти</Link>):
          (
            <Link  to='/profile' className="header__menu-link header__menu-link-active hoverBatton">Аккаунт</Link>
          )}

          {location.pathname != "/" && 
            <button className="header__menu-burger hoverBatton" type="button" onClick={handleOpenBurger}></button>
          }

          <Burger
            isOpenBurger={burgerMenu}
            onCloseBurger={handleCloseBurger}
          />

      </nav>

    </header>
  );
}

export default Header;