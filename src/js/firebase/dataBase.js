import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, child, get } from 'firebase/database';

const auth = getAuth();
const db = getDatabase();
const dbRef = ref(getDatabase());
const filmsArray = [];

const modal = document.querySelector('.modal-film__main');

modal.addEventListener('click', createFilmObj);

function createFilmObj(e) {
  const targetFilm = e.target.dataset;
  if (e.target.textContent === 'add to watched') {
    console.dir(e.target);

    filmsArray.push({
      id: targetFilm.id,
      title: targetFilm.title,
      genre_name: targetFilm.genre_name,
      poster_path: targetFilm.poster_path,
      original_title: targetFilm.original_title,
      vote_average: targetFilm.vote_average,
      popularity: targetFilm.popularity,
      vote_count: targetFilm.vote_count,
      genres: targetFilm.genres,
      overview: targetFilm.overview,
    });
  }
  onAuthStateChanged(auth, user => {
    if (user) {
      set(ref(db, 'users/' + 'ovrGn2FJIdTUQrajvyrFQ3Gb5bs1/'), filmsArray);
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
}

// if (
//   document.location.pathname !== '/index.html' ||
//   (document.location.host && document.location.pathname === '/my-library.html')
// ) {
//   const btnWatched = document.querySelector('.library__button.watched');
//   console.log(btnWatched);
// }
// Поменя разметку когда будут фильмы

// function createMerkaup(storage) {
//   return JSON.parse(localStorage.getItem(storage))
//     .map(film => {
//       return `<div>${film.username}</div>`;
//     })
//     .join('');
// }
