import {Link} from 'react-router-dom'; // импортируем Routes

function NotPage(){

  return (
    <section className="notPage"> 
      <p className="notPage__title">404</p>
      <p className="notPage__text">Страница не найдена</p>
      <Link to="/" className="notPage__link hoverLink">Назад</Link>
    </section>

  );
}

export default NotPage;