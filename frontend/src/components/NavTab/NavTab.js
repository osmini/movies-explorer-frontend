import { Link, animateScroll as scroll } from 'react-scroll'; // импортируем из бибилотеки скролл

function NavTab(){

  return (

    <nav className="navTab">
      <Link to="aboutProject" smooth={true} duration={500} className="navTab__button hoverBatton">О проекте</Link>
      <Link to="techs" smooth={true} duration={500} className="navTab__button hoverBatton">Технологии</Link>
      <Link to="aboutMe" smooth={true} duration={500} className="navTab__button hoverBatton">Студент</Link>
    </nav>
  );
}

export default NavTab;