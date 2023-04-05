import { refs } from './refs';
import { createMerkaup } from './firebase/dataBase';
import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { onTopScroll } from './scroll-up';

export let slide = 1;
let lastPages = '';
export let pagination = '';
export const options = {
  itemsPerPage: 1,
  visiblePages: 5,
  // centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',

    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const bgImage = document.querySelector('.wrap');
const btnWatched = document.querySelector('.library__button.watched');
const btnQueue = document.querySelector('.library__button.queue');
const filmList = document.querySelector('.film-list');
const libraryWrp = document.querySelector('.container.library-wrap');
// console.log(libraryWrp);

refs.pagination.classList.add('is-hidden');

if (!document.querySelector('.search-form__input')) {
  btnWatched.addEventListener('click', () => {
    lastPages = JSON.parse(localStorage.getItem('filmsWatched'))
      ? Math.ceil(JSON.parse(localStorage.getItem('filmsWatched')).length / 20)
      : '';
    slide = 1;
    if (lastPages > 1) {
      pagination.movePageTo(1);
      // slide = 1;
      refs.pagination.classList.remove('is-hidden');
    } else {
      refs.pagination.classList.add('is-hidden');
    }

    if (lastPages < 5) {
      options.visiblePages = lastPages;
    }

    pagination = new Pagination(refs.pagination, options);
    pagination.setTotalItems(lastPages);

    JSON.parse(localStorage.getItem('filmsWatched'))
      ? libraryWrp.classList.remove('library-wrap')
      : '';
    filmList.innerHTML = '';
    const mark = localStorage.getItem('filmsWatched')
      ? pagMarkup(slide, 'filmsWatched')
      : '';

    filmList.insertAdjacentHTML('afterbegin', mark);
  });

  btnQueue.addEventListener('click', () => {
    lastPages = JSON.parse(localStorage.getItem('filmsQueue'))
      ? Math.ceil(JSON.parse(localStorage.getItem('filmsQueue')).length / 20)
      : '';
    slide = 1;
    if (lastPages > 1) {
      pagination.movePageTo(1);

      refs.pagination.classList.remove('is-hidden');
    } else {
      refs.pagination.classList.add('is-hidden');
    }
    if (lastPages < 5) {
      options.visiblePages = lastPages;
    }
    pagination = new Pagination(refs.pagination, options);
    pagination.setTotalItems(lastPages);

    JSON.parse(localStorage.getItem('filmsQueue'))
      ? libraryWrp.classList.remove('library-wrap')
      : '';
    filmList.innerHTML = '';
    const mark = localStorage.getItem('filmsQueue')
      ? pagMarkup(slide, 'filmsQueue')
      : '';

    filmList.insertAdjacentHTML('afterbegin', mark);
  });

  lastPages = JSON.parse(localStorage.getItem('filmsWatched'))
    ? Math.ceil(JSON.parse(localStorage.getItem('filmsWatched')).length / 20)
    : '';

  if (lastPages > 1) {
    refs.pagination.classList.remove('is-hidden');
  }

  if (lastPages < 5) {
    options.visiblePages = lastPages;
  }

  pagination = new Pagination(refs.pagination, options);
  pagination.setTotalItems(lastPages);

  JSON.parse(localStorage.getItem('filmsWatched'))
    ? libraryWrp.classList.remove('library-wrap')
    : '';
  filmList.innerHTML = '';
  const mark = localStorage.getItem('filmsWatched')
    ? pagMarkup(slide, 'filmsWatched')
    : '';

  filmList.insertAdjacentHTML('afterbegin', mark);
}

export function pagMarkup(slide, storage) {
  return JSON.parse(localStorage.getItem(storage))
    .slice(-20 + slide * 20, 0 + slide * 20)
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
        onTopScroll();
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

if (!document.querySelector('.search-form__input')) {
  btnWatched.addEventListener('click', () => {
    btnWatched.classList.add('library__button--current');
    btnQueue.classList.remove('library__button--current');
    if (!JSON.parse(localStorage.getItem('filmsWatched'))) {
      bgImage.classList.add('library-wrap');
    }
  });

  btnQueue.addEventListener('click', () => {
    btnWatched.classList.remove('library__button--current');
    btnQueue.classList.add('library__button--current');
    if (!JSON.parse(localStorage.getItem('filmsQueue'))) {
      bgImage.classList.add('library-wrap');
    }
  });

  refs.pagination.addEventListener('click', e => {
    if (
      document.querySelector(
        '.library__button.watched.library__button--current'
      )
    ) {
      lastPages = Math.ceil(
        JSON.parse(localStorage.getItem('filmsWatched')).length / 20
      );
      pagination = new Pagination(refs.pagination, options);
      pagination.setTotalItems(lastPages);
      if (Number(e.target.textContent) > 0) {
        slide = Number(e.target.textContent);

        pagination.movePageTo(slide);
        filmList.innerHTML = '';
        const mark = pagMarkup(slide, 'filmsWatched');
        filmList.insertAdjacentHTML('afterbegin', mark);
      }
      if (e.target.textContent === 'next') {
        if (slide === lastPages) {
          return;
        }
        slide += 1;
        pagination.movePageTo(slide);
        filmList.innerHTML = '';
        const mark = pagMarkup(slide, 'filmsWatched');
        filmList.insertAdjacentHTML('afterbegin', mark);
      }
      if (e.target.textContent === 'first') {
        slide = 1;
        pagination.movePageTo(slide);
        filmList.innerHTML = '';
        const mark = pagMarkup(slide, 'filmsWatched');
        filmList.insertAdjacentHTML('afterbegin', mark);
      }
      if (e.target.textContent === 'prev') {
        if (slide === 1) {
          return;
        }
        slide -= 1;
        pagination.movePageTo(slide);
        filmList.innerHTML = '';
        const mark = pagMarkup(slide, 'filmsWatched');
        filmList.insertAdjacentHTML('afterbegin', mark);
      }
      if (e.target.textContent === 'last') {
        slide = lastPages;
        pagination.movePageTo(slide);
        filmList.innerHTML = '';
        const mark = pagMarkup(slide, 'filmsWatched');
        filmList.insertAdjacentHTML('afterbegin', mark);
      }

      if (e.target.classList.contains('tui-first-child')) {
        if (slide > 5) {
          slide -= 5;

          // !!!!!
          //   pagination.movePageTo(slide);
          pagination.movePageTo(slide);
          filmList.innerHTML = '';
          const mark = pagMarkup(slide, 'filmsWatched');
          filmList.insertAdjacentHTML('afterbegin', mark);
        } else {
          slide = 1;
          pagination.movePageTo(slide);
          filmList.innerHTML = '';
          const mark = pagMarkup(slide, 'filmsWatched');
          filmList.insertAdjacentHTML('afterbegin', mark);
        }
      }
      if (e.target.classList.contains('tui-last-child')) {
        if (slide < lastPages - 4) {
          slide += 5;

          // !!!!!
          pagination.movePageTo(slide);
          filmList.innerHTML = '';
          const mark = pagMarkup(slide, 'filmsWatched');
          filmList.insertAdjacentHTML('afterbegin', mark);
        } else {
          slide = lastPages;
          pagination.movePageTo(slide);
          filmList.innerHTML = '';
          const mark = pagMarkup(slide, 'filmsWatched');
          filmList.insertAdjacentHTML('afterbegin', mark);
        }
      }
      if (e.target.parentElement) {
        if (e.target.parentElement.classList.contains('tui-first-child')) {
          if (slide > 5) {
            slide -= 5;
            pagination.movePageTo(slide);
            filmList.innerHTML = '';
            const mark = pagMarkup(slide, 'filmsWatched');
            filmList.insertAdjacentHTML('afterbegin', mark);
          } else {
            slide = 1;
            pagination.movePageTo(slide);
            filmList.innerHTML = '';
            const mark = pagMarkup(slide, 'filmsWatched');
            filmList.insertAdjacentHTML('afterbegin', mark);
          }
        }
      }
      if (e.target.parentElement) {
        if (e.target.parentElement.classList.contains('tui-last-child')) {
          if (slide < lastPages - 4) {
            slide += 5;
            pagination.movePageTo(slide);
            filmList.innerHTML = '';
            const mark = pagMarkup(slide, 'filmsWatched');
            filmList.insertAdjacentHTML('afterbegin', mark);
          } else {
            slide = lastPages;
            pagination.movePageTo(slide);
            filmList.innerHTML = '';
            const mark = pagMarkup(slide, 'filmsWatched');
            filmList.insertAdjacentHTML('afterbegin', mark);
          }
        }
      }
    } else {
      // !!!!!!!!!!!!!!!!

      lastPages = Math.ceil(
        JSON.parse(localStorage.getItem('filmsQueue')).length / 20
      );
      pagination = new Pagination(refs.pagination, options);
      pagination.setTotalItems(lastPages);
      if (Number(e.target.textContent) > 0) {
        slide = Number(e.target.textContent);

        pagination.movePageTo(slide);
        filmList.innerHTML = '';
        const mark = pagMarkup(slide, 'filmsQueue');
        filmList.insertAdjacentHTML('afterbegin', mark);
      }
      if (e.target.textContent === 'next') {
        if (slide === lastPages) {
          return;
        }
        slide += 1;
        pagination.movePageTo(slide);
        filmList.innerHTML = '';
        const mark = pagMarkup(slide, 'filmsQueue');
        filmList.insertAdjacentHTML('afterbegin', mark);
      }
      if (e.target.textContent === 'first') {
        slide = 1;
        pagination.movePageTo(slide);
        filmList.innerHTML = '';
        const mark = pagMarkup(slide, 'filmsQueue');
        filmList.insertAdjacentHTML('afterbegin', mark);
      }
      if (e.target.textContent === 'prev') {
        if (slide === 1) {
          return;
        }
        slide -= 1;
        pagination.movePageTo(slide);
        filmList.innerHTML = '';
        const mark = pagMarkup(slide, 'filmsQueue');
        filmList.insertAdjacentHTML('afterbegin', mark);
      }
      if (e.target.textContent === 'last') {
        slide = lastPages;
        pagination.movePageTo(slide);
        filmList.innerHTML = '';
        const mark = pagMarkup(slide, 'filmsQueue');
        filmList.insertAdjacentHTML('afterbegin', mark);
      }

      if (e.target.classList.contains('tui-first-child')) {
        if (slide > 5) {
          slide -= 5;

          // !!!!!
          //   pagination.movePageTo(slide);
          pagination.movePageTo(slide);
          filmList.innerHTML = '';
          const mark = pagMarkup(slide, 'filmsQueue');
          filmList.insertAdjacentHTML('afterbegin', mark);
        } else {
          slide = 1;
          pagination.movePageTo(slide);
          filmList.innerHTML = '';
          const mark = pagMarkup(slide, 'filmsQueue');
          filmList.insertAdjacentHTML('afterbegin', mark);
        }
      }
      if (e.target.classList.contains('tui-last-child')) {
        if (slide < lastPages - 4) {
          slide += 5;

          // !!!!!
          pagination.movePageTo(slide);
          filmList.innerHTML = '';
          const mark = pagMarkup(slide, 'filmsQueue');
          filmList.insertAdjacentHTML('afterbegin', mark);
        } else {
          slide = lastPages;
          pagination.movePageTo(slide);
          filmList.innerHTML = '';
          const mark = pagMarkup(slide, 'filmsQueue');
          filmList.insertAdjacentHTML('afterbegin', mark);
        }
      }
      if (e.target.parentElement) {
        if (e.target.parentElement.classList.contains('tui-first-child')) {
          if (slide > 5) {
            slide -= 5;
            pagination.movePageTo(slide);
            filmList.innerHTML = '';
            const mark = pagMarkup(slide, 'filmsQueue');
            filmList.insertAdjacentHTML('afterbegin', mark);
          } else {
            slide = 1;
            pagination.movePageTo(slide);
            filmList.innerHTML = '';
            const mark = pagMarkup(slide, 'filmsQueue');
            filmList.insertAdjacentHTML('afterbegin', mark);
          }
        }
      }
      if (e.target.parentElement) {
        if (e.target.parentElement.classList.contains('tui-last-child')) {
          if (slide < lastPages - 4) {
            slide += 5;
            pagination.movePageTo(slide);
            filmList.innerHTML = '';
            const mark = pagMarkup(slide, 'filmsQueue');
            filmList.insertAdjacentHTML('afterbegin', mark);
          } else {
            slide = lastPages;
            pagination.movePageTo(slide);
            filmList.innerHTML = '';
            const mark = pagMarkup(slide, 'filmsQueue');
            filmList.insertAdjacentHTML('afterbegin', mark);
          }
        }
      }
    }
  });
}
