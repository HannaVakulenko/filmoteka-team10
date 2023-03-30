
const modal = document.querySelector(".modal");
const modalHeader = document.querySelector(".modal-title");
const modalForm = document.querySelector(".modal-form");
const registerText = document.querySelector(".modal-form__text-register")
const registerButton = document.getElementById("register-btn");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const loginButton = document.querySelector(".modal-button__send")

const initialModalHeaderText = modalHeader.textContent;
const initialRegisterText = registerText.textContent;
const initialRegisterButton = loginButton.textContent;
let inputField;

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

function openModal() {
modal.style.display = "block";
}

function closeModal() {
modal.style.display = "none";
}

window.onclick = function(event) {
if (event.target === modal) {
closeModal();
}
}

document.addEventListener('keydown', function(event) {
if (event.key === 'Escape' || event.code === 27) {
closeModal();
}
});


function register(e) {
  e.preventDefault();

  if (modalHeader.textContent !== "Register") {
    modalHeader.textContent = "Register";
    registerText.textContent = "I have an account";
    registerButton.textContent = "Auth";
    loginButton.textContent = "Register";

    
    registerRender();
    
  } else {
    modalHeader.textContent = initialModalHeaderText;
    inputField = document.getElementById("input-name");
    inputField.parentNode.removeChild(inputField);
    registerText.textContent = initialRegisterText;
    registerButton.textContent = "Register";
    loginButton.textContent = initialRegisterButton;
  }
}

registerButton.addEventListener("click", register);
  
  function registerRender(){
    const inputHtml = '<input class="modal-form__input" type="text" placeholder="Name*" id="input-name" minlength="4" maxlength="25">';
    modalForm.insertAdjacentHTML("afterbegin", inputHtml);
  }
