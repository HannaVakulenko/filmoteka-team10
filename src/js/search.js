import {
  API_KEY,
  API_UR,
  IMG_ARI,
  MEDIA_TYPE,
  TIME_WINDOW,
  PER_PAGE,
  page,
  pages,
} from './api-servise';
// отриманні змінні:  запит клієнта (пошук), id фільму, масив попопулярних фільмів, масив знайдених фільмів
import { query, my_movie_id, filmsTrending, searchFilms } from './api-servise';
// імпорт функцій: популярні фільми за тиждень, знайти фільми по ключовим словам, знайти фільм по ID
import {
  FetchTrending,
  FetchSearch,
  FetchFilmID,
  renderGallery,
} from './api-servise';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { refs } from './refs';
import { Loading } from 'notiflix';
import { spinnerStart, spinnerEnd } from './spinner';
import { scrollOnTop } from './scroll-up';
import { createPagination } from './pagination';

const searchForm = document.querySelector('.search-form');
const searchInp = document.querySelector('.search-form__input');
const galletyEl = document.querySelector('.film-list');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  inputText = e.currentTarget.elements.searchQuery.value.trim();
  searchInp.value = '';

  if (inputText === '') {
    return;
  }
  galletyEl.innerHTML = '';
  const responses = await FetchSearch(inputText);
  console.log(responses);
  await renderGallery(responses);
});
