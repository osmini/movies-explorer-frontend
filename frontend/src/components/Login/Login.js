import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom'; // импортируем Routes

import logo from '../../images/logo.svg';

function Login (props){
  const {title, buttonTitle, text, textLink, urlLink} = props;

  const [nameImput, setNameImput] = useState('');
  const [emailImput, setEmailImput] = useState('');
  const [passwordImput, setPasswordImput] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [emailError, setEmailError] = useState('Емайл не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [formValid, setFormValid] = useState(false);

  // подписка на новигацию
  const location = useLocation();

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

  //отслеживаем что ввели в поле password
  const nameHandler = (e) => {
    setNameImput(e.target.value);
    
    if (e.target.value.length<2){
      setNameError('Длина имени должна быть более 1 символов');
      if (!e.target.value){
        setNameError('Имя не может быть пустым');
      }
    } else {
      setNameError('');
    }
  }

  //отслеживаем что ввели в поле email
  const emailHandler = (e) => {
    setEmailImput(e.target.value);
    const rexEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;

    if (!rexEmail.test(e.target.value)){
      setEmailError('Некорректный email');
    } else {
      setEmailError('');
    }
  }

  //отслеживаем что ввели в поле password
  const passwordHandler = (e) => {
    setPasswordImput(e.target.value);
    
    if (e.target.value.length<2){
      setPasswordError('Длина пароля должна быть более 2 символов');
      if (!e.target.value){
        setPasswordError('Пароль не может быть пустым');
      }
    } else {
      setPasswordError('');
    }
  }

  // доступ к кнопки при валидации
  useEffect (() => {
      if (location.pathname === "/signup"){
        if (emailError || passwordError || nameError || nameImput==="" || emailImput===""  || passwordImput===""){
          setFormValid(false);
        } else {
          setFormValid(true);
        }
      }
      if (location.pathname === "/signin"){
        if (emailError || passwordError || emailImput===""  || passwordImput===""){
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
  
  return (    
  <main id="main">
    <section className= "login" aria-label="форма попапа">

      <Link to='/'>
        <img className="login__logo hoverBatton" src={logo} alt="логотип Movies"/>
      </Link>

      <h1 className="login__title">{title}</h1>

      <form className="login__form" >
        <div className="login__form-wrapper" >

          {location.pathname === "/signup" ? (
            <>
              <label className="login__form-ladel" >Имя</label>
              {(nameDirty && nameError) ? ( 
              <input onChange={e => nameHandler(e)} value={nameImput} onBlur={e => blueHandler(e)} className="login__form-input login__form-input_inputErrorBorder" type="text"  name="login_name" placeholder='Кирилл'required/>) : 
              (<input onChange={e => nameHandler(e)} value={nameImput} onBlur={e => blueHandler(e)} className="login__form-input" type="text"  name="login_name" placeholder='Кирилл' required/>)}
              {(nameDirty && nameError) && <span className="login__form-error">{nameError}</span>}
            </>) : null
          }

          <label className="login__form-ladel">E-mail</label>
          {(emailDirty && emailError) ? ( 
          <input onChange={e => emailHandler(e)} value={emailImput} onBlur={e => blueHandler(e)} className="login__form-input login__form-input_inputErrorBorder" type="Email"  name="login_email" placeholder='ewt@mail.ya'required/>) : 
          (<input onChange={e => emailHandler(e)} value={emailImput} onBlur={e => blueHandler(e)} className="login__form-input" type="Email"  name="login_email" placeholder='ewt@mail.ya' required/>)}
          {(emailDirty && emailError) && <span className="login__form-error">{emailError}</span>}

          <label className="login__form-ladel">Пароль</label>
          {(passwordDirty && passwordError) ? ( 
          <input onChange={e => passwordHandler(e)} value={passwordImput} onBlur={e => blueHandler(e)} className="login__form-input login__form-input_inputErrorBorder" type="password"  name="login_password" placeholder='Ваш пароль' required/>) : 
          (<input onChange={e => passwordHandler(e)} value={passwordImput} onBlur={e => blueHandler(e)} className="login__form-input" type="password"  name="login_password" placeholder='Ваш пароль' required/>)}
          {(passwordDirty && passwordError) && <span className="login__form-error">{passwordError}</span>}
        </div>

        { !formValid ? 
        ( <button disabled={false} className="login__form-button login__form-button_inactive hoverBatton" type="submit" aria-label="Кнопка регистрации">{buttonTitle}</button>) : 
        (<button disabled={true} className="login__form-button hoverBatton" type="submit" aria-label="Кнопка регистрации">{buttonTitle}</button>) }

      </form>

      <p className="login__text"> {text}
        <Link to={urlLink} className="login__link hoverLink">{textLink}</Link>
      </p>

    </section>
  </main>
  );

}

export default Login;