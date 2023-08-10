import {Link} from 'react-router-dom'; // импортируем Routes

// в даном компоненте мы не принимаем props аргумент
function Footer(){

  // возвращаем jsx разметку компонента
  return (
    <footer className="footer">
      <p className="footer__prevue"> Учебный проект Яндекс.Практикум х BeatFilm. </p>

      <div className="footer__menu">
        <p className="footer__menu-copyraite">&#169; {(new Date().getFullYear())}</p>

        <nav className="footer__menu-nav">
          <Link to="https://practicum.yandex.ru/" className="footer__menu-nav_link hoverLink" target="_blank">Яндекс.Практикум</Link>
          <Link to="https://github.com/osmini" className="footer__menu-nav_link hoverLink" target="_blank">Github</Link>
        </nav>

      </div>

    </footer>
  );
}

// экспортируем компонент в основной код
export default Footer;