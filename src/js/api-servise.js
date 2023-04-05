import axios from 'axios';
import './allgenres';
// import { pagination, options, createPagination } from './pagination';
import { refs } from './refs';
import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { slide } from './displaying-movies';
import { onTopScroll } from './scroll-up';
import { resetSlide } from './displaying-movies';
export let pagination;
export let badResponse;
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

export const API_KEY = 'c789b950e94d6ea5adbb471c5a6ee143';
export const API_URL = 'https://api.themoviedb.org/3/';
export const IMG_ARI = 'https://image.tmdb.org/t/p/w400';
export const TRAILER = 'https://api.themoviedb.org/3/movies/';

export const MEDIA_TYPE = 'movie';
export const TIME_WINDOW = 'week';

export let PER_PAGE = 20;
export let page = 1;
export let pages = 1;

// query потім змінити на пусту строку, query = те, що ввів користува
export let query = 'avatar';
export let filmsTrending = [];
export let searchFilms = [];
// my_movie_id прибрати потім значення, має братися з розмітки при кліку
export let my_movie_id = 76600;
export let lastPages = 1;
// Отримання популярних фільмів
export const FetchTrending = async page => {
  try {
    const responseTrending = await axios.get(
      `${API_URL}trending/${MEDIA_TYPE}/day?api_key=${API_KEY}&page=${page}`
    );
    if (responseTrending.status !== 200) {
      throw new Error(responseTrending.status);
    }
    lastPages = responseTrending.data.total_pages;
    return (filmsTrending = responseTrending.data.results);
    console.log(filmsTrending);
    await renderGallery(filmsTrending);
  } catch (error) {
    console.log(error.message);
  }
};
// запуск функції
// FetchTrending();

// Шукаємо фільми по ключовому слову:
export const FetchSearch = async (q, page) => {
  try {
    const responseSearch = await axios.get(
      `${API_URL}search/${MEDIA_TYPE}?api_key=${API_KEY}&query=${q}&page=${page}`
    );
    if (responseSearch.status !== 200) {
      throw new Error(responseSearch.status);
    }
    badResponse = responseSearch.data.total_pages;
    console.log(badResponse);
    if (responseSearch.data.total_pages > 1) {
      lastPages = responseSearch.data.total_pages;
      // resetSlide();
    }

    return (searchFilms = responseSearch.data.results);
    console.log(searchFilms);
  } catch (error) {
    console.log(error.message);
  }
};
export const FirstSearch = async (q, page) => {
  try {
    const responseSearch = await axios.get(
      `${API_URL}search/${MEDIA_TYPE}?api_key=${API_KEY}&query=${q}&page=${page}`
    );
    if (responseSearch.status !== 200) {
      throw new Error(responseSearch.status);
    }
    badResponse = responseSearch.data.total_pages;
    console.log(badResponse);
    if (responseSearch.data.total_pages > 1) {
      lastPages = responseSearch.data.total_pages;
      resetSlide();
    }

    return (searchFilms = responseSearch.data.results);
    console.log(searchFilms);
  } catch (error) {
    console.log(error.message);
  }
};

// запуск функції
// FetchSearch(query);

// Шукаємо фільм по ID:
export const FetchFilmID = async movie_id => {
  try {
    const responseFetchFilmID = await axios.get(
      `${API_URL}${MEDIA_TYPE}/${movie_id}?api_key=${API_KEY}`
    );
    if (responseFetchFilmID.status !== 200) {
      throw new Error(responseFetchFilmID.status);
    }
    return responseFetchFilmID.data;

    // console.log(MyFilmID);
  } catch (error) {
    console.log(error.message);
  }
};
// запуск функції
// FetchFilmID(my_movie_id);

// опредеоение жанра фильма
let filmsTrendingIdGenres = [];
let mygenres = [];

for (let i = 0; i < filmsTrendingIdGenres.length; i++) {
  for (let index = 0; index < allgenres.length; index++) {
    if (allgenres[index].id === filmsTrendingIdGenres[i]) {
      mygenres.push(allgenres[index].name);
    }
  }
}
console.log(mygenres);

export const GetTrailer = async movie_id => {
  try {
    const responseGetTrailer = await axios.get(
      `${API_URL}movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    );
    if (responseGetTrailer.status !== 200) {
      throw new Error(responseGetTrailer.status);
    }
    const NewTrailer = responseGetTrailer.data;
    return NewTrailer;
  } catch (error) {
    console.log(error.message);
  }
};

export const renderGallery = movies => {
  const galleryFilms = document.querySelector('.film-list');
  if (document.querySelector('.search-form')) {
    const warningEl = document.querySelector('.warning');
    if (movies.length !== 0) {
      warningEl.classList.add('is-hidden');
    } else {
      warningEl.classList.remove('is-hidden');

      setTimeout(() => {
        warningEl.classList.add('is-hidden');
      }, 3000);
      if (lastPages > 1) {
        refs.pagination.classList.remove('is-hidden');
      }
    }
  }
  // document.querySelector('.film-list').innerHTML = '';
  if (movies.length !== 0) {
    const galletyEl = document.querySelector('.film-list');
    galletyEl.innerHTML = '';
    const listitem = movies
      .map(
        ({
          id,
          poster_path,
          title,
          release_date,
          genre_ids,
          original_title,
          vote_average,
          popularity,
          vote_count,
          overview,
        }) => {
          const allgenres = [
            { id: 28, name: 'Action' },
            { id: 12, name: 'Adventure' },
            { id: 16, name: 'Animation' },
            { id: 35, name: 'Comedy' },
            { id: 80, name: 'Crime' },
            { id: 99, name: 'Documentary' },
            { id: 18, name: 'Drama' },
            { id: 10751, name: 'Family' },
            { id: 14, name: 'Fantasy' },
            { id: 36, name: 'History' },
            { id: 27, name: 'Horror' },
            { id: 10402, name: 'Music' },
            { id: 9648, name: 'Mystery' },
            { id: 10749, name: 'Romance' },
            { id: 878, name: 'Science Fiction' },
            { id: 10770, name: 'TV Movie' },
            { id: 53, name: 'Thriller' },
            { id: 10752, name: 'War' },
            { id: 37, name: 'Western' },
          ];
          let imgFilm;
          if (poster_path === null) {
            imgFilm =
              'https://i.pinimg.com/originals/74/3d/b2/743db230d891b47c1d8c66b161111b91.jpg';
          } else {
            imgFilm = `${IMG_ARI}${poster_path}`;
          }

          const releaseYear = release_date
            ? release_date.split('-')[0]
            : 'Unknown';
          let genres = '';

          for (const allgenre of allgenres) {
            if (genre_ids[0] === allgenre.id) {
              genres = allgenre.name;
            }
          }
          for (const allgenre of allgenres) {
            if (genre_ids[1] === allgenre.id) {
              genres = genres + ', ' + allgenre.name;
            }
          }
          if (genre_ids.length > 2) {
            genres += ', Other';
          }
          if (genre_ids.length === 0) {
            genres += 'Other';
          }
          return `
<li class="film-list__item" data-id = '${id}'>
  <div class="thumb">
    <img
      class="film-poster"
      src="${imgFilm} 
" 
      alt="movie poster"
    />
  </div>
  
  <div class="film-list__info">
    <h3 class="film-list__name">${title}</h3>
    <p class="film-list__genre">${genres} | ${releaseYear}</p>
  </div>
</li>
        `;
        }
      )
      .join('');
    galleryFilms.insertAdjacentHTML('beforeend', listitem);
  }
};

export const RenderPopular = async page => {
  try {
    const responses = await FetchTrending(page);
    if (badResponse > 1) {
      
      pagination = new Pagination(refs.pagination, options);
      pagination.setTotalItems(lastPages);
      pagination.movePageTo(slide);
    } else {
      
      pagination = new Pagination(refs.pagination, options);
      pagination.setTotalItems(lastPages);
      pagination.movePageTo(slide);
    }
    if (lastPages > 1) {
      refs.pagination.classList.remove('is-hidden');
    }
    await renderGallery(responses);
    onTopScroll();
  } catch {
    console.log('error:');
  }
};

export const RenderSearch = async (q, page) => {
  try {
    const responses = await FetchSearch(q, page);

    if (badResponse > 1) {
      // console.log(lastPages);
      console.log(badResponse);
      refs.pagination.classList.remove('is-hidden');
      pagination = new Pagination(refs.pagination, options);
      pagination.setTotalItems(lastPages);
      pagination.movePageTo(slide);
    } else {
      pagination = new Pagination(refs.pagination, options);
      pagination.movePageTo(slide);
    }
    await renderGallery(responses);
    onTopScroll();
  } catch {
    console.log('error:');
  }
};
export const FirstRenderSearch = async (q, page) => {
  try {
    const responses = await FirstSearch(q, page);

    if (badResponse > 1) {
      // console.log(lastPages);
      console.log(badResponse);
      refs.pagination.classList.remove('is-hidden');
      pagination = new Pagination(refs.pagination, options);
      pagination.setTotalItems(lastPages);
      pagination.movePageTo(slide);
    } 
    await renderGallery(responses);
    onTopScroll();
  } catch {
    console.log('error:');
  }
};
