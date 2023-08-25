import React from 'react';
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'; // импортируем Routes

import { REX_EMAIL } from '../../data/data';

function Profile(props){

  const {userName, userEmail, onSignOut, handleUpdateUser} = props;

  const [nameImput, setNameImput] = useState(userName);
  const [emailImput, setEmailImput] = useState(userEmail);
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [emailError, setEmailError] = useState('Емайл не может быть пустым');
  const [formValid, setFormValid] = useState(false);

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
  }

  //валидация что ввели в поле email
  const emailHandler = (e) => {
    setEmailImput(e.target.value);
  }

  // доступ к кнопки при валидации
  useEffect(() => {
    if (!REX_EMAIL.test(emailImput)){
      setEmailError('Некорректный email');
    }
    if (emailImput === userEmail){
      setEmailError('Введенный email совпадает с вашим прежним email');
    } 
    if (emailImput != userEmail && REX_EMAIL.test(emailImput)) {
      setEmailError('');
    }
    if (nameImput.length < 2 || nameImput.length > 8) {
      setNameError('Длина имени должна быть более 2 и менее 9 символов');
    } 
    if (nameImput === userName) {
      setNameError('Введенное имя совпадает с вашим прежним именем');
    } 
    if (nameImput != userName && (nameImput.length > 1 && nameImput.length < 9)) {
      setNameError('');
    } 
    if (location.pathname === "/profile") {

      if ((!emailError && nameImput!='' && emailImput!='') || (!nameError && nameImput!='' && emailImput!='')) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }
  }, [nameError, emailError, emailImput, nameImput, userName, userEmail]);
  
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    handleUpdateUser({
      name: nameImput,
      email: emailImput
    });
  }

  return (
  <main id="main">
    <section className="profile">

      <h1 className="profile__title">Привет, {userName}!</h1>

      <form className="profile__form" name='form_profile' onSubmit={handleSubmit}>
        <div>
          <div className="profile__wrapper-input">
            <span className="profile__date">Имя</span>

            {(nameDirty && nameError) ? 
              (<input onChange={e => nameHandler(e)} value={nameImput} onBlur={e => blueHandler(e)} className="profile__input profile__input-input_inputErrorBorder" type="text" name="profile_input-name" required placeholder=""/>) : 
              (<input onChange={e => nameHandler(e)} value={nameImput} onBlur={e => blueHandler(e)} className="profile__input" type="text" name="profile_input-name" required placeholder=""/>)}
          </div>
          {(nameDirty && nameError) && <span className="profile__error">{nameError}</span>}     

          <div className="profile__wrapper-input"> 
            <span className="profile__date">E-mail</span>

            {(emailDirty && emailError) ? 
              (<input onChange={e => emailHandler(e)} value={emailImput} onBlur={e => blueHandler(e)} className="profile__input profile__input-input_inputErrorBorder" type="text" name="profile_input-email"  required placeholder=""/>) : 
              (<input onChange={e => emailHandler(e)} value={emailImput} onBlur={e => blueHandler(e)} className="profile__input" type="text" name="profile_input-email" required placeholder=""/>)}
          </div>
          {(emailDirty && emailError) && <span className="profile__error">{emailError}</span>}      
        </div>
        <div>
        { !formValid ? 
        ( <button to = "/" disabled={true} className="profile__button-edit profile__button_inactive" type="submit"   name="profile_button-edit" aria-label="Кнопка регистрации">Редактировать</button>) : 
        (<button to = "/" disabled={false}  className="profile__button-edit hoverLink" type="submit" name="profile_button-edit" aria-label="Кнопка регистрации">Редактировать</button>) }
          <button to = "/" className="profile__button-out hoverLink" type="button"  onClick={onSignOut} name="profile_button-out"  aria-label="Кнопка выхода из профиля">Выйти из аккаунта</button>
        </div>
      </form>

    </section>
  </main>
  );
}

export default Profile;