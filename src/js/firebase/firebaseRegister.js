import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';

// Когда будет форма - добавь слушателей

// form.addEventListener('submit', e => {
//   e.preventDefault();
//   registerUser(form[0].value, form[1].value);
// });

const app = initializeApp(firebaseConfig);

function registerUser(email, password) {
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password)
    .then(console.log)
    .catch(console.error);
}
