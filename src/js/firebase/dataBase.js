import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import { refs } from '../refs';

const button = document.querySelector('.library__button');

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
          snapshot
            .val()
            .map(film => {
              return ` <li class="film-list__item">
        <div class="thumb">
          <img class="film-poster" src="./images/q.jpg" alt="movie poster" />
        </div>

        <div class="film-list__info">
          <h3 class="film-list__name">GREYHOUND</h3>
          <p class="film-list__genre">Drama, Action | 2020</p>
        </div>
      </li>`;
            })
            .join('');
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
});
