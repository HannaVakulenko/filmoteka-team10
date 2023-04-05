import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import { slide, options, pagMarkup } from '../testPag';
import { refs } from '../refs';
import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
let pagination;

const auth = getAuth();
const db = getDatabase();
const dbRef = ref(getDatabase());
const localWatched = JSON.parse(localStorage.getItem('filmsWatched'));
const localQueue = JSON.parse(localStorage.getItem('filmsQueue'));

const filmsWatched = localWatched || [];
const filmsQueue = localQueue || [];

const modal = document.querySelector('.modal-film__main');
const btnWatchedLibrary = document.querySelector('.library__button.watched');
const btnQueueLibrary = document.querySelector('.library__button.queue');
const filmList = document.querySelector('.film-list');
const bgImage = document.querySelector('.wrap');
let lastPages;
let zero = 0;
let markup;
modal.addEventListener('click', createFilmObj);

// if (!document.querySelector('.search-form__input')) {
//   btnWatchedLibrary.addEventListener('click', () => {
//     filmList.innerHTML = '';
//     bgImage.classList.remove('library-wrap');
//     const markup = createMerkaup('filmsWatched');
//     filmList.insertAdjacentHTML('afterbegin', markup);
//   });

//   btnQueueLibrary.addEventListener('click', () => {
//     filmList.innerHTML = '';
//     bgImage.classList.remove('library-wrap');
//     const markup = createMerkaup('filmsQueue');
//     filmList.insertAdjacentHTML('afterbegin', markup);
//   });
// }

// abcd10@gamil.com

function createFilmObj(e) {
  const targetFilm = e.target.dataset;
  if (
    e.target.textContent === 'add to queue' ||
    e.target.textContent === 'remove from queue'
  ) {
    if (e.target.textContent === 'add to queue') {
      e.target.textContent = 'remove from queue';
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
        release_date: targetFilm.release_date || 'Unknown',
      });
    } else {
      if (e.target.textContent === 'remove from queue') {
        const indexFilm = checkInQueue(targetFilm.id);

        if (indexFilm >= 0) {
          filmsQueue.splice(indexFilm, 1);
        }
        if (filmsQueue.length === 0) localStorage.removeItem('filmsQueue');
        if (filmsQueue.length > 0) {
          localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
        }

        if (checkInQueue(targetFilm.id) === -1)
          e.target.textContent = 'add to queue';

        if (
          filmsQueue.length > 0 &&
          !document.querySelector('.search-form__input')
        ) {
          if (btnQueueLibrary.classList.contains('library__button--current')) {
            lastPages = Math.ceil(filmsQueue.length / 20);

            if (lastPages < slide && lastPages !== 1) {
              pagination.movePageTo(1);
              zero = 1;

              options.visiblePages = lastPages;
              pagination = new Pagination(refs.pagination, options);
            }
            if (lastPages < slide) {
              zero = 1;
            }

            if (lastPages === 1) {
              refs.pagination.classList.add('is-hidden');
            }
            if (lastPages < 5) {
              options.visiblePages = lastPages;
            }
            filmList.innerHTML = '';
            if (zero === 0) {
              markup = pagMarkup(slide, 'filmsQueue');
            } else {
              markup = pagMarkup(zero, 'filmsQueue');
              zero = 0;
            }

            filmList.insertAdjacentHTML('afterbegin', markup);
          }
        } else {
          if (!document.querySelector('.search-form__input')) {
            if (
              btnQueueLibrary.classList.contains('library__button--current')
            ) {
              refs.pagination.classList.add('is-hidden');

              filmList.innerHTML = '';
              bgImage.classList.add('library-wrap');
            }
          }
        }
      }
    }
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
    if (e.target.textContent === 'add to watched') {
      e.target.textContent = 'remove from watched';
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
        release_date: targetFilm.release_date || 'Unknown',
      });
    } else {
      if (e.target.textContent === 'remove from watched') {
        const indexFilmWatched = checkInWatched(targetFilm.id);

        if (indexFilmWatched >= 0) {
          filmsWatched.splice(indexFilmWatched, 1);
        }
        if (filmsWatched.length === 0) localStorage.removeItem('filmsWatched');
        if (filmsWatched.length > 0) {
          localStorage.setItem('filmsWatched', JSON.stringify(filmsWatched));
        }

        if (checkInWatched(targetFilm.id) === -1)
          e.target.textContent = 'add to watched';

        if (
          filmsWatched.length > 0 &&
          !document.querySelector('.search-form__input')
        ) {
          if (
            btnWatchedLibrary.classList.contains('library__button--current')
          ) {
            lastPages = Math.ceil(filmsWatched.length / 20);
            if (lastPages < slide && lastPages !== 1) {
              pagination.movePageTo(1);
              zero = 1;
              options.visiblePages = lastPages;
              pagination = new Pagination(refs.pagination, options);
            }
            if (lastPages < slide) {
              zero = 1;
            }
            if (lastPages === 1) {
              refs.pagination.classList.add('is-hidden');
            }

            if (lastPages < 5) {
              options.visiblePages = lastPages;
            }
            filmList.innerHTML = '';
            if (zero === 0) {
              markup = pagMarkup(slide, 'filmsWatched');
            } else {
              markup = pagMarkup(zero, 'filmsWatched');
              zero = 0;
            }

            filmList.insertAdjacentHTML('afterbegin', markup);
          }
        } else {
          if (!document.querySelector('.search-form__input')) {
            if (
              btnWatchedLibrary.classList.contains('library__button--current')
            ) {
              refs.pagination.classList.add('is-hidden');

              filmList.innerHTML = '';
              bgImage.classList.add('library-wrap');
            }
          }
        }
      }
    }
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
  return JSON.parse(localStorage.getItem(storage))
    .map(
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
        if (JSON.parse(localStorage.getItem(storage)) === null) {
          bgImage.classList.add('library-wrap');
          return `<li></li>`;
        }
        return `<li class="film-list__item" data-id="${id}">
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
        data-id="${id}"
        data-release_date="${release_date}">
          <h3 class="film-list__name">${original_title}</h3>
          <p class="film-list__genre">${genres} | ${
          release_date ? release_date.split('-')[0] : 'Unknown'
        } | ${Number(vote_average).toFixed(1)}</p>
        </div>
      </li>`;
      }
    )
    .join('');
}
//-----Ann code
// перевірка (є в сховище такий фильм з данним ID)

function checkInQueue(id) {
  for (let i = 0; i < filmsQueue.length; i++) {
    if (id === filmsQueue[i].id) {
      return i;
    }
  }
  return -1;
}
function checkInWatched(id) {
  for (let i = 0; i < filmsWatched.length; i++) {
    if (id === filmsWatched[i].id) {
      return i;
    }
  }
  return -1;
}
