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
import {
  FetchTrending,
  FetchSearch,
  FetchFilmID,
  renderGallery,
} from './api-servise';
// отриманні змінні:  запит клієнта (пошук), id фільму, масив попопулярних фільмів, масив знайдених фільмів
import { query, my_movie_id, filmsTrending, searchFilms } from './api-servise';
// імпорт функцій: популярні фільми за тиждень, знайти фільми по ключовим словам, знайти фільм по ID
import { FetchTrending, FetchSearch, FetchFilmID } from './api-servise';
import { refs } from './refs';
import { Loading } from 'notiflix';
import { spinnerStart, spinnerEnd } from './spinner';
import { scrollOnTop } from './scroll-up';
import { pagination, options, createPagination } from './api-servise';
import './allgenres';
import { RenderPopular, RenderSearch } from './api-servise';
import { lastPages } from './api-servise';
import { submit } from './search';
import { inputText } from './search';
export let slide = 1;

refs.pagination.classList.add('is-hidden');
if (document.querySelector('.search-form')) {
  refs.pagination.addEventListener('click', e => {
    if (submit === 0) {
      if (Number(e.target.textContent) > 0) {
        slide = Number(e.target.textContent);
        // pagination.movePageTo(slide);

        RenderPopular(slide);
      }
      if (e.target.textContent === 'next') {
        if (slide === lastPages) {
          return;
        }
        slide += 1;
        RenderPopular(slide);
        // pagination.setTotalItems(lastPages);
      }
      if (e.target.textContent === 'first') {
        slide = 1;
        RenderPopular(slide);
      }
      if (e.target.textContent === 'prev') {
        if (slide === 1) {
          return;
        }
        slide -= 1;
        RenderPopular(slide);
      }
      if (e.target.textContent === 'last') {
        slide = lastPages;
        RenderPopular(slide);
      }

      if (e.target.classList.contains('tui-first-child')) {
        if (slide > 5) {
          slide -= 5;
          pagination.movePageTo(slide);
          RenderPopular(slide);
        } else {
          slide = 1;
          RenderPopular(slide);
        }
      }
      if (e.target.classList.contains('tui-last-child')) {
        if (slide < lastPages - 4) {
          slide += 5;
          pagination.movePageTo(slide);
          RenderPopular(slide);
        } else {
          slide = lastPages;
          RenderPopular(slide);
        }
      }
      if (e.target.parentElement) {
        if (e.target.parentElement.classList.contains('tui-first-child')) {
          if (slide > 5) {
            slide -= 5;
            pagination.movePageTo(slide);
            RenderPopular(slide);
          } else {
            slide = 1;
            RenderPopular(slide);
          }
        }
      }
      if (e.target.parentElement) {
        if (e.target.parentElement.classList.contains('tui-last-child')) {
          if (slide < lastPages - 4) {
            slide += 5;
            pagination.movePageTo(slide);
            RenderPopular(slide);
          } else {
            slide = lastPages;
            RenderPopular(slide);
          }
        }
      }
    } else {
      if (Number(e.target.textContent) > 0) {
        slide = Number(e.target.textContent);
        RenderSearch(inputText, slide);
        // pagination.setTotalItems(lastPages);
      }
      if (e.target.textContent === 'next') {
        if (slide === lastPages) {
          return;
        }
        slide += 1;
        RenderSearch(inputText, slide);
      }
      if (e.target.textContent === 'first') {
        slide = 1;
        RenderSearch(inputText, slide);
      }
      if (e.target.textContent === 'prev') {
        if (slide === 1) {
          return;
        }
        slide -= 1;
        RenderSearch(inputText, slide);
      }
      if (e.target.textContent === 'last') {
        slide = lastPages;
        RenderSearch(inputText, slide);
      }
      if (e.target.classList.contains('tui-first-child')) {
        if (slide > 5) {
          slide -= 5;
          pagination.movePageTo(slide);
          RenderSearch(inputText, slide);
        } else {
          slide = 1;
          RenderSearch(inputText, slide);
        }
      }
      if (e.target.classList.contains('tui-last-child')) {
        if (slide < lastPages - 4) {
          slide += 5;
          pagination.movePageTo(slide);
          RenderSearch(inputText, slide);
        } else {
          slide = lastPages;
          RenderSearch(inputText, slide);
        }
      }
      if (e.target.parentElement) {
        if (e.target.parentElement.classList.contains('tui-first-child')) {
          if (slide > 5) {
            slide -= 5;
            pagination.movePageTo(slide);
            RenderSearch(inputText, slide);
          } else {
            slide = 1;
            RenderSearch(inputText, slide);
          }
        }
      }
      if (e.target.parentElement) {
        if (e.target.parentElement.classList.contains('tui-last-child')) {
          if (slide < lastPages - 4) {
            slide += 5;
            pagination.movePageTo(slide);
            RenderSearch(inputText, slide);
          } else {
            slide = lastPages;
            RenderSearch(inputText, slide);
          }
        }
      }
    }
  });
  RenderPopular(slide);
}
export const resetSlide = () => {
  slide = 1;
};
