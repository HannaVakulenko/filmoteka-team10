import './js/modal-firebase';
import './js/displaying-movies';
import './js/api-servise';
import './js/refs';
import './js/modal-film';
import './js/trailer';
import './js/modal-students';

import './js/spinner';
import './js/preloader';
import './js/firebase/firebaseRegAndSign';
import './js/firebase/dataBase';
import './js/scroll-up';
import './js/search';
import './js/testPag';

// import './js/firebase/firebase';

// //import { refs } from './refs';

// Імпорт Api:
// змінні для GET запитів:
import {
  API_KEY,
  API_UR,
  IMG_ARI,
  MEDIA_TYPE,
  TIME_WINDOW,
  PER_PAGE,
  page,
  pages,
} from './js/api-servise';
// отриманні змінні:  запит клієнта (пошук), id фільму, масив попопулярних фільмів, масив знайдених фільмів
import {
  query,
  my_movie_id,
  filmsTrending,
  searchFilms,
} from './js/api-servise';
// імпорт функцій: популярні фільми за тиждень, знайти фільми по ключовим словам, знайти фільм по ID
import { FetchTrending, FetchSearch, FetchFilmID } from './js/api-servise';
