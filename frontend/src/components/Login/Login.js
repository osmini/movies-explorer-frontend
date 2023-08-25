import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom'; // импортируем Routes

import { REX_EMAIL } from '../../data/data';

import logo from '../../images/logo.svg';

function Login (props){
  const {name, title, buttonTitle, text, textLink, urlLink, handleRegistr, handleLogin, formValid, setFormValid} = props;

  const [nameImput, setNameImput] = useState('');
  const [emailImput, setEmailImput] = useState('');
  const [passwordImput, setPasswordImput] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [emailError, setEmailError] = useState('Емайл не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');

  // данные из формы регистрации
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // подписка на новигацию
  const location = useLocation();

  // валидация формы 
  // пользователь убрал курсор с инпута
  const blueHandler = (e) => {
    switch(e.target.name) {
      case 'login_name':
        setNameDirty(true);  
        break;
      case 'login_email':
        setEmailDirty(true);
        break;
      case 'login_password':
        setPasswordDirty(true);  
        break;
    }
  }

  //валидация что ввели в поле имя
  const nameHandler = (e) => {
    setNameImput(e.target.value);
    
    if (e.target.value.length<2 || e.target.value.length>8){
      setNameError('Длина имени должна быть более 2 и менее 9 символов');
      if (!e.target.value){
        setNameError('Имя не может быть пустым');
      }
    } else {
      setRegisterName(e.target.value);
      setNameError('');
    }
  }

  //валидация что ввели в поле email
  const emailHandler = (e) => {
    setEmailImput(e.target.value);

    if (!REX_EMAIL.test(e.target.value)){
      setEmailError('Некорректный email');
    } else {
      setRegisterEmail(e.target.value);
      setEmailError('');
    }
  }

  //валидация что ввели в поле password
  const passwordHandler = (e) => {
    setPasswordImput(e.target.value);
    
    if (e.target.value.length<2 || e.target.value.length>8){
      setPasswordError('Длина пароля должна от 2 до 8 символов');
      if (!e.target.value){
        setPasswordError('Пароль не может быть пустым');
      }
    } else {
      setRegisterPassword(e.target.value);
      setPasswordError('');
    }
  }

  // доступ к кнопки при валидации
  useEffect (() => {
      if (location.pathname === "/signup"){
        if ((emailError || passwordError || nameError || nameImput==="" || emailImput==="" || passwordImput==="")){
          setFormValid(false);
        } else {
            setFormValid(true);
          }
      }
      if (location.pathname === "/signin"){
        if (emailError || passwordError || emailImput===""  || passwordImput==="" ){
          setFormValid(false);
        } else {
          setFormValid(true);
        }
      }
  }, [nameError, emailError, passwordError])

  // Очистка значения поля ввода при загрузке компонента
  useEffect(() => {
    setNameImput("");
    setEmailImput("");
    setPasswordImput("");
    setFormValid(false);
  }, [location.pathname]);
  

  // api регистрации на сайте
  // отправка данных из формы в апи для регистрации
  function handleSubmitRegistr(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    setFormValid(false);
    handleRegistr(registerName, registerEmail, registerPassword)
  }

  // отправка данных из формы в апи для авторизации
  function handleSubmitAvtorize(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    setFormValid(false);
    handleLogin(registerEmail, registerPassword)
  }

  return (    
  <main id="main">
    <section className= "login" aria-label="форма попапа">

      <Link to='/'>
        <img className="login__logo hoverBatton" src={logo} alt="логотип Movies"/>
      </Link>

      <h1 className="login__title">{title}</h1>

      <form className="login__form" id={`aut_form-${name}`} name={`aut_${name}`} onSubmit={location.pathname === "/signup" ? (handleSubmitRegistr) : (handleSubmitAvtorize)}>
        <div className="login__form-wrapper" >

          {location.pathname === "/signup" ? (
            <>
              <label className="login__form-ladel" >Имя</label>
              {(nameDirty && nameError) ? ( 
              <input onChange={e => nameHandler(e)} value={nameImput} onBlur={e => blueHandler(e)} className="login__form-input login__form-input_inputErrorBorder" type="text"  name="login_name" placeholder='Введите имя'required/>) : 
              (<input onChange={e => nameHandler(e)} value={nameImput} onBlur={e => blueHandler(e)} className="login__form-input" type="text"  name="login_name" placeholder='Введите имя' required/>)}
              {(nameDirty && nameError) && <span className="login__form-error">{nameError}</span>}
            </>) : null
          }

          <label className="login__form-ladel">E-mail</label>
          {(emailDirty && emailError) ? ( 
          <input onChange={e => emailHandler(e)} value={emailImput} onBlur={e => blueHandler(e)} className="login__form-input login__form-input_inputErrorBorder" type="Email"  name="login_email" placeholder='Введите email'required/>) : 
          (<input onChange={e => emailHandler(e)} value={emailImput} onBlur={e => blueHandler(e)} className="login__form-input" type="Email"  name="login_email" placeholder='Введите email' required/>)}
          {(emailDirty && emailError) && <span className="login__form-error">{emailError}</span>}

          <label className="login__form-ladel">Пароль</label>
          {(passwordDirty && passwordError) ? ( 
          <input onChange={e => passwordHandler(e)} value={passwordImput} onBlur={e => blueHandler(e)} className="login__form-input login__form-input_inputErrorBorder" type="password"  name="login_password" placeholder='Ваш пароль' required/>) : 
          (<input onChange={e => passwordHandler(e)} value={passwordImput} onBlur={e => blueHandler(e)} className="login__form-input" type="password"  name="login_password" placeholder='Ваш пароль' required/>)}
          {(passwordDirty && passwordError) && <span className="login__form-error">{passwordError}</span>}
        </div>

        { !formValid ? 
        ( <button disabled={true} className="login__form-button login__form-button_inactive" type="submit" aria-label="Кнопка регистрации">{buttonTitle}</button>) : 
        (<button disabled={false} className="login__form-button hoverBatton" type="submit" aria-label="Кнопка регистрации">{buttonTitle}</button>) }

      </form>

      <p className="login__text"> {text}
        <Link to={urlLink} className="login__link hoverLink">{textLink}</Link>
      </p>

    </section>
  </main>
  );

}

export default Login;