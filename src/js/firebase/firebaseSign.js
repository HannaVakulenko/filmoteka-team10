import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';

// Когда будет форма - добавь слушателей

// form.addEventListener('submit', e => {
//   e.preventDefault();
//   submitForm(form[0].value, form[1].value);
// });

const app = initializeApp(firebaseConfig);

function submitForm(email, password) {
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
    .then(console.log)
    .catch(console.error);
}
