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
  RenderSearch,
  FirstSearch,
} from './api-servise';
import { slide, resetSlide } from './displaying-movies';
import { refs } from './refs';
import { Loading } from 'notiflix';
import { spinnerStart, spinnerEnd } from './spinner';
import { scrollOnTop } from './scroll-up';
import { pagination, options, createPagination } from './api-servise';
export let submit = 0;
export let inputText;
if (document.querySelector('.search-form')) {
  const searchForm = document.querySelector('.search-form');
  const searchInp = document.querySelector('.search-form__input');
  const galletyEl = document.querySelector('.film-list');

  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    refs.pagination.classList.add('is-hidden');
    submit = 1;
    inputText = e.currentTarget.elements.searchQuery.value.trim();
    searchInp.value = '';

    if (inputText === '') {
      return;
    }
    slide = 1;
    console.log(slide);
    // pagination.movePageTo(1);
    resetSlide();
    RenderSearch(inputText, 1);
  });
}
