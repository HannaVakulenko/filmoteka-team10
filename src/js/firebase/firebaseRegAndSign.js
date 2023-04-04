import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';
import { refs } from '../refs';
import Notiflix from 'notiflix';

// test

// Conditions for /my-library.html
if (!document.querySelector('.search-form__input')) {
  refs.logOutLibrary.addEventListener('click', () => {
    localStorage.removeItem('userSession');
  });
}

// abcd10@gamil.com
// test

if (document.querySelector('.search-form__input')) {
  const app = initializeApp(firebaseConfig);

  const modal = document.querySelector('.modal-firebase');
  const form = document.querySelector('.modal-firebase__form');
  const button = document.querySelector('.modal-firebase__form-button--send');
  const library = document.querySelector('.list-library');
  const logIn = document.querySelector('.logIn');
  const logOut = document.querySelector('.logOut');

  if (localStorage.getItem('userSession')) {
    library.classList.remove('is-hidden-firebase');
    logOut.classList.remove('is-hidden-firebase');
    logIn.classList.add('is-hidden-firebase');
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (button.textContent !== 'Register') {
      submitForm(form[0].value, form[1].value);
      modal.style.display = 'none';
    } else {
      registerUser(form[1].value, form[2].value);
      modal.style.display = 'none';
    }
  });

  logOut.addEventListener('click', () => {
    document.location.reload();
    logout();
  });

  function registerUser(email, password) {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        library.classList.remove('is-hidden-firebase');
        logOut.classList.remove('is-hidden-firebase');
        logIn.classList.add('is-hidden-firebase');

        localStorage.setItem('userSession', 'true');
      })
      .catch(error => {
        error ? Notiflix.Notify.warning('This account already used') : '';
      });
  }

  function submitForm(email, password) {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        library.classList.remove('is-hidden-firebase');
        logOut.classList.remove('is-hidden-firebase');
        logIn.classList.add('is-hidden-firebase');

        localStorage.setItem('userSession', 'true');
      })
      .catch(error => {
        error ? Notiflix.Notify.failure('Invalid password or email') : '';
      });
  }

  function logout() {
    localStorage.removeItem('userSession');
  }
}
