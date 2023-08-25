import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NotPage(props) {
  const { loggenIn } = props;

  const navigate = useNavigate();
  
  const handleViewHistory = () => {
    navigate(-1);
  };

  return (
    <main id="main">
      <section className="notPage"> 
        <h1 className="notPage__title">404</h1>
        <p className="notPage__text">Страница не найдена</p>
        {loggenIn ? (
          <Link onClick={ handleViewHistory} className="notPage__link hoverLink">Назад</Link>
        ) : (
          <Link to="/" className="notPage__link hoverLink">Назад</Link>
        )}
      </section>
    </main>
  );
}

export default NotPage;