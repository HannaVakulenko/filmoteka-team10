import {
  API_KEY,
  API_UR,
  IMG_ARI,
  MEDIA_TYPE,
  TIME_WINDOW,
  PER_PAGE,
  page,
  pages,
  query,
} from './api-servise';
// отриманні змінні:  запит клієнта (пошук), id фільму, масив попопулярних фільмів, масив знайдених фільмів
import { query, my_movie_id, filmsTrending, searchFilms } from './api-servise';
// імпорт функцій: популярні фільми за тиждень, знайти фільми по ключовим словам, знайти фільм по ID
import { FetchTrending, FetchSearch, FetchFilmID } from './api-servise';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { refs } from './refs';
import { Loading } from 'notiflix';
import { spinnerStart, spinnerEnd } from './spinner';
import { scrollOnTop } from './scroll-up';
import { createPagination } from './pagination';
import './allgenres';
import { RenderPopular } from './api-servise';

RenderPopular();

// console.log(FetchTrending)
  // .then(data => {
  //   spinnerStart();
  //   if (!data.total_results) {
  //     // тут треба прикрутити месседж помилки

  //     return;
  //   }
  //   refs.galleryFilms.innerHTML = renderGallery(data.results);
  //   const pagination = createPagination(data.total_results, data.total_pages);
  //   pagination.on('beforeMove', ({ page }) => {
  //     spinnerStart();
  //     refs.galleryFilms.innerHTML = '';
  //     FetchTrending(query, page).then(data => {
  //       spinnerEnd();
  //       refs.galleryFilms.innerHTML = renderGallery(data.results);
  //       scrollOnTop();
  //     });
  //   });
  // })
  // .catch(error => console.log(error));
