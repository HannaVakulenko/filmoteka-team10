const refs = {
  modal: document.querySelector('.modal'),
  modalHeader: document.querySelector('.modal__title'),
  modalForm: document.querySelector('.modal__form'),
  registerText: document.querySelector('.modal__form-text-register'),
  loginButton: document.querySelector('.modal__form-button--send'),
  registerButton: document.getElementById('register-btn'),
  openModalBtn: document.getElementById('open-modal-btn'),
  closeModalBtn: document.getElementById('close-modal-btn'),
  inputFields: document.querySelectorAll('.modal__form-input'),
};

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

function register(e) {
  e.preventDefault();

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
  const inputHtml =
    '<input class="modal__form-input" type="text" placeholder="Name*" id="input-name" minlength="4" maxlength="25">';
  refs.modalForm.insertAdjacentHTML('afterbegin', inputHtml);
}
//видаляє символи в інпути коли натискаєш на кнопку
function clearInputFields() {
  refs.inputFields.forEach(input => (input.value = ''));
}
