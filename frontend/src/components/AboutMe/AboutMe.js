import {Link} from 'react-router-dom'; // импортируем Routes

import DecoreLineGrey  from '../DecoreLineGrey/DecoreLineGrey';
import me from '../../images/me.jpg';

function AboutMe(){

  // возвращаем jsx разметку компонента
  return (
    <section className="aboutMe" id="aboutMe">
      <h3 className="aboutMe__title">Студент</h3>

      <DecoreLineGrey />

      <article className="aboutMe__articl-wrapper">
        <div className="aboutMe__articl">
          <h1 className="aboutMe__articl-title">Кирилл</h1>
          <p className="aboutMe__articl-liad">Фронтенд-разработчик, 27 лет</p>
          <p className="aboutMe__articl-text">Я живу в Челябинске, закончил техникум в г. Бреды Челябинской области. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами.</p>
          <Link to="https://github.com/osmini" className="aboutMe__articl-link hoverLink" target="_blank">Github</Link>
        </div>

        <img className="aboutMe__img" src={me} alt="Моя фотография" ></img>

      </article>

    </section>
  );
}

// экспортируем компонент в основной код
export default AboutMe;