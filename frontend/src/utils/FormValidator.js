export class FormValidator {

  constructor() {
    this._validForm = "#login__form-wrapper";
    this._inputSelector = "login__form-input";
    this._submitButtonSelector = "login__form-button";
    this._hoverButton = "login__form-button_inactive";
    this._inputErrorBorder = "login__form-input_inputErrorBorder";
    this._errorClass = "login__form-error";
  }

  // Найдём форму и поля для валидации
  enableValidation() {

    this._inputList = Array.from(document.querySelectorAll(`.${this._inputSelector}`));
    this._buttonElement = document.querySelector(`.${this._submitButtonSelector}`);

    //this._enableValidationListener(); // добавили слушатель события
  };

  // слушатель события валидации
  _enableValidationListener() {
    console.log(2);
    this._toggleButtonState(); // деактивация при первом выводе попап окна
    this._addListenersValid();
  };

  // очистить поля ошибки при открытии попап добавить место
  resetValidation() {
    console.log(3);
    this._toggleButtonState(); 

    this._buttonElement.disabled = true;
    this._buttonElement.classList.remove(this._hoverButton);

    this._inputList.forEach((inputElement) => {
      inputElement.value = '';
      this._hideInputError(inputElement);
    });
  };

  // убрать класс с ошибкой полю ввода
  _hideInputError(formInput) {
    console.log(4);
    this._errorElement = this._formValid.querySelector(`#${formInput.id}-error`);
    formInput.classList.remove(this._inputErrorBorder);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
  };
  
   // добавить класс с ошибкой полю ввода
  _showInputError(formInput, errorMessage) {
    console.log(5);
    // Находим элемент ошибки внутри самой функции
    this._errorElement = this._formValid.querySelector(`#${formInput.id}-error`);
    formInput.classList.add(this._inputErrorBorder);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  //добавить слушатели обработчики
  _addListenersValid() {
    console.log(6);
    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        
        if (!formInput.validity.valid) {
          this._showInputError(formInput, formInput.validationMessage);
        } else {
          this._hideInputError(formInput);
        }
        
        this._toggleButtonState(); // активация кнопки формы
      });
    });
  };

  // проверка можно ли активировать кнопку или нет
  _hasInvalidInput() {
    console.log(7);
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {

    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true_hideError
    return !inputElement.validity.valid;
    })
  }; 

  // активировать и  деактивировать кнопку
  _toggleButtonState() {
    console.log(8);
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._buttonElement.disabled = true;
      this._buttonElement.classList.remove(this._hoverButton);
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.disabled = false;
      this._buttonElement.classList.add(this._hoverButton);
    }
  };
}  

const formValidator = new FormValidator();

export default formValidator;