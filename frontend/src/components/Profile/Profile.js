import React from 'react';
import {Link} from 'react-router-dom'; // импортируем Routes

import DecoreLine from '../DecoreLine/DecoreLine';


function Profile(){

  return (

    <section className="profile">

      <h2 className="profile__title">Привет, Кирилл!</h2>
      <form className="profile__form" name='form_profile'>
        <div className="profile__wrapper-input">
          <span className="profile__date">Имя</span>
          <input className="profile__input" type="text" name="profile_input-name"  placeholder="Кирилл"/>
        </div>
        <DecoreLine />
        <div className="profile__wrapper-input"> 
          <span className="profile__date">E-mail</span>
          <input className="profile__input" type="text" name="profile_input-email"  placeholder="pochta@yandex.ru"/>
        </div>
        <button className="profile__button-edit hoverLink" type="submit"  name="profile_button-edit"  aria-label="Кнопка редактирования профиля">Редактировать</button>
      </form>

      <Link to = "/" className="profile__button-out hoverLink" type="submit"  name="profile_button-out"  aria-label="Кнопка выхода из профиля">Выйти из аккаунта</Link>

    </section>
  );
}

export default Profile;