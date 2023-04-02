import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';

// Conditions for /my-library.html

if (
  document.location.pathname !== '/index.html' ||
  document.location.search ||
  (document.location.host && document.location.pathname === '/my-library.html')
) {
  const logOut = document.querySelector('.nav__li.link.log-out');

  logOut.addEventListener('click', () =>
    localStorage.removeItem('userSession')
  );
}

// Conditions for /index.html

if (
  document.location.pathname === '/index.html' ||
  document.location.search ||
  (document.location.host && document.location.pathname !== '/my-library.html')
) {
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
      console.log('LOGIN');
      modal.style.display = 'none';
    } else {
      registerUser(form[1].value, form[2].value);
      console.log('REGISTER');
      modal.style.display = 'none';
    }
  });

  logOut.addEventListener('click', logout);

  function registerUser(email, password) {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        library.classList.remove('is-hidden-firebase');
        logOut.classList.remove('is-hidden-firebase');
        logIn.classList.add('is-hidden-firebase');

        localStorage.setItem('userSession', 'true');
      })
      .catch(console.error);
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
      .catch(console.error);
  }

  function logout() {
    library.classList.add('is-hidden-firebase');
    logOut.classList.add('is-hidden-firebase');
    logIn.classList.remove('is-hidden-firebase');

    localStorage.removeItem('userSession');
  }
}
