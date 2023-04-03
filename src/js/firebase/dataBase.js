import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, child, get } from 'firebase/database';

const auth = getAuth();
const db = getDatabase();
const dbRef = ref(getDatabase());
const filmsWatched = [];
const filmsQueue = [];

const modal = document.querySelector('.modal-film__main');
const btnWatchedLibrary = document.querySelector('.library__button.watched');
const btnQueueLibrary = document.querySelector('.library__button.queue');
const filmList = document.querySelector('.film-list');
const bgImage = document.querySelector('.library-wrap');
console.dir(btnWatchedLibrary);

modal.addEventListener('click', createFilmObj);

if (!document.querySelector('.search-form__input')) {
  btnWatchedLibrary.addEventListener('click', () => {
    filmList.innerHTML = '';
    bgImage.classList.remove('library-wrap');
    const markup = createMerkaup('filmsWatched');
    filmList.insertAdjacentHTML('afterbegin', markup);
  });

  btnQueueLibrary.addEventListener('click', () => {
    filmList.innerHTML = '';
    bgImage.classList.remove('library-wrap');
    const markup = createMerkaup('filmsQueue');
    filmList.insertAdjacentHTML('afterbegin', markup);
  });
}

// abcd10@gamil.com

function createFilmObj(e) {
  const targetFilm = e.target.dataset;
  if (e.target.textContent === 'add to queue') {
    filmsQueue.push({
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
      // release_date: targetFilm.release_date,
    });

    onAuthStateChanged(auth, user => {
      if (user) {
        set(ref(db, 'users/' + 'ovrGn2FJIdTUQrajvyrFQ3Gb5bs1/'), filmsQueue);
      }
    });

    onAuthStateChanged(auth, user => {
      if (user) {
        get(child(dbRef, `users/ovrGn2FJIdTUQrajvyrFQ3Gb5bs1`))
          .then(snapshot => {
            if (snapshot.exists()) {
              localStorage.setItem(
                'filmsQueue',
                JSON.stringify(snapshot.val())
              );
            } else {
              console.log('No data available');
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  } else {
    filmsWatched.push({
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
      // release_date: targetFilm.release_date,
    });

    onAuthStateChanged(auth, user => {
      if (user) {
        set(ref(db, 'users/' + 'ovrGn2FJIdTUQrajvyrFQ3Gb5bs1/'), filmsWatched);
      }
    });

    onAuthStateChanged(auth, user => {
      if (user) {
        get(child(dbRef, `users/ovrGn2FJIdTUQrajvyrFQ3Gb5bs1`))
          .then(snapshot => {
            if (snapshot.exists()) {
              localStorage.setItem(
                'filmsWatched',
                JSON.stringify(snapshot.val())
              );
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
}

function createMerkaup(storage) {
  return JSON.parse(localStorage.getItem(storage)).map(
    ({
      genre_name,
      genres,
      id,
      original_title,
      overview,
      popularity,
      poster_path,
      title,
      vote_average,
      vote_count,
      release_date,
    }) => {
      return `<li class="film-list__item">
        <div class="film-thumb">
          <img class="film-poster" src='https://image.tmdb.org/t/p/original${poster_path}' alt="movie poster" />
        </div>

        <div class="film-list__info"
        data-poster_path="${poster_path}"
        data-title="${title}"
        data-genre_name="${genre_name}"
        data-original_title="${original_title}"
        data-vote_average="${vote_average}"
        data-popularity="${popularity}"
        data-vote_count="${vote_count}"
        data-overview="${overview}"
        data-genres="${genres}"
        data-id="${id}">
          <h3 class="film-list__name">${original_title}</h3>
          <p class="film-list__genre">${genres} | ${
        release_date ? release_date.split('-')[0] : 'Unknown'
      } | ${vote_average}</p>
        </div>
      </li>`;
    }
  );
}
