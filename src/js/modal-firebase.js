import { refs } from './refs';
const initialModalHeaderText = refs.modalHeader.textContent;
const initialRegisterText = refs.registerText.textContent;
const initialRegisterButton = refs.loginButton.textContent;
refs.openModalBtn.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.registerButton.addEventListener('click', register);
function openModal() {
  refs.modal.style.display = 'block';
}
function closeModal() {
  refs.modal.style.display = 'none';
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
  input.addEventListener('input', () => {
    const isValid = input.checkValidity();
    input.style.borderBottom = isValid ? '2px solid green' : '2px solid red';
    input.style.color = isValid ? 'green' : 'red';
  });
  input.addEventListener('blur', () => {
    if (input.value === '') {
      input.style.borderBottom = '2px solid red';
    }
  });
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
setInputFieldValidation()