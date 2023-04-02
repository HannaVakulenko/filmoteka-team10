import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, child, get } from 'firebase/database';

// const buttonWatched = document.querySelector('.library__button.watched');
// const container = document.querySelector('.library-wrap');
// const modalFilm = document.querySelector('.backdrop-film-card');
// console.dir(modalFilm);

// const filmWatched = createMerkaup('filmWatched');

// buttonWatched.addEventListener('click', () => {
//   container.insertAdjacentHTML('afterbegin', filmWatched);
// });

const auth = getAuth();
const db = getDatabase();
const dbRef = ref(getDatabase());

const filmWatchedArr = [
  {
    username: 'Admin',
    email: 'email',
    profile_picture: 'imageUrl',
  },
  {
    username: 'Ada',
    email: 'email',
    profile_picture: 'imageUrl',
  },
];

// Поменя разметку когда будут фильмы

function createMerkaup(storage) {
  return JSON.parse(localStorage.getItem(storage))
    .map(film => {
      return `<div>${film.username}</div>`;
    })
    .join('');
}

onAuthStateChanged(auth, user => {
  if (user) {
    set(ref(db, 'users/' + 'ovrGn2FJIdTUQrajvyrFQ3Gb5bs1/'), filmWatchedArr);
  }
});

onAuthStateChanged(auth, user => {
  if (user) {
    get(child(dbRef, `users/ovrGn2FJIdTUQrajvyrFQ3Gb5bs1`))
      .then(snapshot => {
        if (snapshot.exists()) {
          localStorage.setItem('filmWatched', JSON.stringify(snapshot.val()));
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
});
