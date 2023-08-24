import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom'; // импортируем Routes

import logo from '../../images/logo.svg';

import Navigation  from '../Navigation/Navigation';
import Burger  from '../Burger/Burger';


function Header(props){
  const {loggenIn} = props;

  const [burgerMenu, setBurgerMenu] = useState(false);
  const [buttonHeader, setButtonHeader] = useState('');

  // подписка на новигацию
  const location = useLocation();

  // управление бургером
  function handleOpenBurger() {
    setBurgerMenu(true);
  }

  function handleCloseBurger() {
    setBurgerMenu(false);
  }

  // состояние кнопки входа/выхода из учетки
  useEffect(()=>{
    if (loggenIn) {
      setButtonHeader('Аккаунт');
    } else {
      setButtonHeader('Войти');
    }
  },[loggenIn]);

  return (
    <header className="header">
      <Link to='/'>
        <img className="header__logo hoverBatton" src={logo} alt="логотип Movies"/>
      </Link>

      {loggenIn &&  <Navigation />}

      <nav className="header__menu">
          {location.pathname === "/" &&   <Link  to={!loggenIn ? ('/signup'): ('/profile')}  className="header__menu-login hoverBatton">{!loggenIn && 'Регистрация'}</Link>}
          {location.pathname === "/" ? (
          <Link  to={!loggenIn ? ('/signin'): ('/profile')} className={!loggenIn ? ("header__menu-link hoverBatton") : ("header__menu-link header__menu-link-active hoverBatton")} >{buttonHeader}</Link>):
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