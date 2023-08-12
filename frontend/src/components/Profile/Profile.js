import React from 'react';
import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom'; // импортируем Routes

function Profile(){

  const [nameImput, setNameImput] = useState('');
  const [emailImput, setEmailImput] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [emailError, setEmailError] = useState('Емайл не может быть пустым');

  // подписка на новигацию
  const location = useLocation();

  // пользователь убрал курсор с инпута
  const blueHandler = (e) => {
    switch(e.target.name) {
      case 'profile_input-name':
        setNameDirty(true);  
        break;
      case 'profile_input-email':
        setEmailDirty(true);
        break;
    }
  }

  //валидация что ввели в поле имя
  const nameHandler = (e) => {
    setNameImput(e.target.value);
    
    if (e.target.value.length<2 || e.target.value.length>8){
      setNameError('Длина имени должна быть более 2 и менее 9 символов');
    } else {
      setNameError('');
    }
  }

  //валидация что ввели в поле email
  const emailHandler = (e) => {
    setEmailImput(e.target.value);
    const rexEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;

    if (!rexEmail.test(e.target.value)){
      setEmailError('Некорректный email');
    } else {
      setEmailError('');
    }
  }

  // Очистка значения поля ввода при загрузке компонента
  useEffect(() => {
    setNameImput("");
    setEmailImput("");
  }, [location.pathname]);

  return (
  <main id="main">
    <section className="profile">

      <h1 className="profile__title">Привет, Кирилл!</h1>

      <form className="profile__form" name='form_profile'>
        <div>
          <div className="profile__wrapper-input">
            <span className="profile__date">Имя</span>

            {(nameDirty && nameError) ? 
              (<input onChange={e => nameHandler(e)} value={nameImput} onBlur={e => blueHandler(e)} className="profile__input profile__input-input_inputErrorBorder" type="text" name="profile_input-name"  placeholder="Кирилл"/>) : 
              (<input onChange={e => nameHandler(e)} value={nameImput} onBlur={e => blueHandler(e)} className="profile__input" type="text" name="profile_input-name"  placeholder="Кирилл"/>)}
          </div>
          {(nameDirty && nameError) && <span className="profile__error">{nameError}</span>}      

          <div className="profile__wrapper-input"> 
            <span className="profile__date">E-mail</span>

            {(emailDirty && emailError) ? 
              (<input onChange={e => emailHandler(e)} value={emailImput} onBlur={e => blueHandler(e)} className="profile__input profile__input-input_inputErrorBorder" type="text" name="profile_input-email"  placeholder="Кирилл"/>) : 
              (<input onChange={e => emailHandler(e)} value={emailImput} onBlur={e => blueHandler(e)} className="profile__input" type="text" name="profile_input-email"  placeholder="pochta@yandex.ru"/>)}
          </div>
          {(emailDirty && emailError) && <span className="profile__error">{emailError}</span>}      
        </div>
        <div>
          <button className="profile__button-edit hoverLink" type="submit"  name="profile_button-edit"  aria-label="Кнопка редактирования профиля">Редактировать</button>
          <Link to = "/" className="profile__button-out hoverLink" type="button"  name="profile_button-out"  aria-label="Кнопка выхода из профиля">Выйти из аккаунта</Link>
        </div>
      </form>

    </section>
  </main>
  );
}

export default Profile;