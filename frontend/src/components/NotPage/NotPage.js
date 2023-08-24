import {Link} from 'react-router-dom'; // импортируем Routes

function NotPage(props){
  const {loggenIn} = props

  return (
  <main id="main">
    <section className="notPage"> 
      <h1 className="notPage__title">404</h1>
      <p className="notPage__text">Страница не найдена</p>
      <Link to={loggenIn ? "/movies" : "/"} className="notPage__link hoverLink">Назад</Link>
    </section>
  </main>
  );
}

export default NotPage;