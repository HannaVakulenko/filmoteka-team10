import { refs } from './refs';

if (
  document.querySelector('.search-form__input')
) {
const initialModalHeaderText = refs.modalHeader.textContent;
const initialRegisterText = refs.registerText.textContent;
const initialRegisterButton = refs.loginButton.textContent;

refs.openModalBtn.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.registerButton.addEventListener('click', register);
refs.registerButton.addEventListener('click', handleRegisterButtonClick);
refs.inputFields.forEach(inputField => {
  inputField.addEventListener('click', handleInputFieldClick);
});

function openModal() {
  refs.modal.style.display = 'block';
  setInputFieldValidation()
}

function closeModal() {
  refs.modal.style.display = 'none';
  handleRegisterButtonClick()
  removeFormNameValue()
}

window.onclick = function (event) {
  if (event.target === refs.modal) {
    closeModal();
  }
};

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' || event.code === 27) {
    closeModal();
  }
});

function register(event) {
  event.preventDefault();
  const isRegistering = refs.modalHeader.textContent !== 'Register';
  refs.modalHeader.textContent = isRegistering
    ? 'Register'
    : initialModalHeaderText;
  refs.registerText.textContent = isRegistering
    ? 'I have an account'
    : initialRegisterText;
  refs.registerButton.textContent = isRegistering ? 'Auth' : 'Register';
  refs.loginButton.textContent = isRegistering
    ? 'Register'
    : initialRegisterButton;
  if (isRegistering) {
    registerRender();
  } else {
    const inputField = document.getElementById('input-name');
    inputField?.parentNode.removeChild(inputField);
  }
  clearInputFields(); // видаляємо вміст полів введення
}

function registerRender() {
  refs.modalForm.insertAdjacentHTML('afterbegin', '<input class="modal-firebase__form-input" type="text" placeholder="Name*" id="input-name" required minlength="4" maxlength="25">');

  const input = document.getElementById('input-name');
  input.addEventListener('click', () => input.classList.add('clicked'));
  input.addEventListener('input', () => applyStyle(input));
  input.addEventListener('blur', () => input.value ? applyStyle(input) : input.style.borderBottom = '2px solid red');
  refs.registerButton.addEventListener('click', () => input.classList.remove('clicked'));

  function applyStyle(input) {
    input.style.borderBottom = input.checkValidity() ? '2px solid green' : '2px solid red';
    input.style.color = input.checkValidity() ? 'green' : 'red';
  }
}
//видаляє символи в інпути коли натискаєш на кнопку
function clearInputFields() {
  refs.inputFields.forEach(input => (input.value = ''));
}
// Функція перевірки поля введення та оновлення його стилів
function validateInputField(inputField) {
  const isValid = inputField.checkValidity();
  inputField.style.borderBottom = isValid ? '2px solid green' : '2px solid red';
  inputField.style.color = isValid ? 'green' : 'red';
}
// Функція для додавання слухачів подій для перевірки введення до кожного поля введення
function addInputValidationListeners(inputFields) {
  inputFields.forEach(inputField => {
    inputField.addEventListener('input', () => {
      validateInputField(inputField);
    });
    inputField.addEventListener('blur', () => {
      if (inputField.value === '') {
        inputField.style.borderBottom = '2px solid red';
      }
    });
  });
}
// Функція очищення стилів полів введення після натискання кнопки реєстрації
function clearInputFieldStyles(inputFields) {
  inputFields.forEach(inputField => {
    inputField.style.borderBottom = '';
    inputField.style.color = '';
  });
}
// Основна функція для налаштування перевірки поля введення та очищення стилів після натискання кнопки реєстрації
function setInputFieldValidation({ inputFields, registerButton } = refs) {
  addInputValidationListeners(inputFields);
  registerButton.addEventListener('click', () => {
    clearInputFieldStyles(inputFields);
  });
}
//функція яка додає клас в input тим самим змінюю
function handleInputFieldClick() {
  this.classList.add('clicked');
}
//Видаляєє клас та значення, змінює колір бордера з input  
function handleRegisterButtonClick() {
  refs.inputFields.forEach(inputField => {
    inputField.classList.remove('clicked');
    inputField.value = "";
    inputField.style.borderBottom = "";
  });
}
//функція яка видаляє все з inputname
function removeFormNameValue() {
  const inputName = document.getElementById('input-name');
  if (inputName != null) {
    inputName.value = '';
    inputName.style.borderBottom = "";
    inputName.classList.remove('clicked');
  }
}
}