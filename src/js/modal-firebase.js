
const modal = document.querySelector(".modal");
const modalHeader = document.querySelector(".modal-title");
const modalForm = document.querySelector(".modal-form");
const registerText = document.querySelector(".modal-form__text-register")
const registerButton = document.getElementById("register-btn");
console.log(registerButton)


const initialModalHeaderText = modalHeader.textContent;
const initialRegisterText = registerText.textContent;
// const initialRegisterButton = registerButton.textContent;
let inputField;

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

  console.log('111');

  if (modalHeader.textContent !== "Register") {
    modalHeader.textContent = "Register";
    registerText.textContent = "I have an account";
    registerButton.textContent = "Auth";
    
    registerRender();
    
  } else {
    modalHeader.textContent = initialModalHeaderText;
    inputField = document.getElementById("input-name");
    inputField.parentNode.removeChild(inputField);
    registerText.textContent = initialRegisterText;
    registerButton.textContent = "Register";
  }
}

registerButton.addEventListener("click", register);
  
  //функція яка рендирить поле name
  function registerRender(){
    const inputHtml = '<input class="modal-form__input" type="text" placeholder="Name*" id="input-name">';
    modalForm.insertAdjacentHTML("afterbegin", inputHtml);
  }
