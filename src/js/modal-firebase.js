const refs = {
    modal: document.querySelector(".modal"),
    modalHeader: document.querySelector(".modal-title"),
    modalForm: document.querySelector(".modal-form"),
    registerText: document.querySelector(".modal-form__text-register"),
    registerButton: document.getElementById("register-btn"),
    openModalBtn: document.getElementById("open-modal-btn"),
    closeModalBtn: document.getElementById("close-modal-btn"),
    loginButton: document.querySelector(".modal-button__send"),
}

const initialModalHeaderText = refs.modalHeader.textContent;
const initialRegisterText = refs.registerText.textContent;
const initialRegisterButton = refs.loginButton.textContent;


refs.openModalBtn.addEventListener("click", openModal);
refs.closeModalBtn.addEventListener("click", closeModal);
refs.registerButton.addEventListener("click", register);

function openModal() {
refs.modal.style.display = "block";
}

function closeModal() {
refs.modal.style.display = "none";
}

window.onclick = function(event) {
if (event.target === refs.modal) {
closeModal();
}
}

document.addEventListener('keydown', function(event) {
if (event.key === 'Escape' || event.code === 27) {
closeModal();
}
});


// function register(e) {
//   e.preventDefault();
//   let inputField;

//   if (refs.modalHeader.textContent !== "Register") {
//     refs.modalHeader.textContent = "Register";
//     refs.registerText.textContent = "I have an account";
//     refs.registerButton.textContent = "Auth";
//     refs.loginButton.textContent = "Register";

//     registerRender();
//   } else {
//     refs.modalHeader.textContent = initialModalHeaderText;
//     refs.registerText.textContent = initialRegisterText;
//     refs.registerButton.textContent = "Register";
//     refs.loginButton.textContent = initialRegisterButton;
//     inputField = document.getElementById("input-name");
//     inputField.parentNode.removeChild(inputField);
//   }
// }
function register(e) {
    e.preventDefault();
  
    const isRegistering = refs.modalHeader.textContent !== "Register";
  
    refs.modalHeader.textContent = isRegistering ? "Register" : initialModalHeaderText;
    refs.registerText.textContent = isRegistering ? "I have an account" : initialRegisterText;
    refs.registerButton.textContent = isRegistering ? "Auth" : "Register";
    refs.loginButton.textContent = isRegistering ? "Register" : initialRegisterButton;
  
    if (isRegistering) {
      registerRender();
    } else {
      const inputField = document.getElementById("input-name");
      inputField?.parentNode.removeChild(inputField);
    }
  }


  
  function registerRender(){
    const inputHtml = '<input class="modal-form__input" type="text" placeholder="Name*" id="input-name" minlength="4" maxlength="25">';
    refs.modalForm.insertAdjacentHTML("afterbegin", inputHtml);
  }
