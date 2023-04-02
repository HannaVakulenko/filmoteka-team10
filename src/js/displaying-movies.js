
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
import {
  query,
  my_movie_id,
  filmsTrending,
  searchFilms,
} from './api-servise';
// імпорт функцій: популярні фільми за тиждень, знайти фільми по ключовим словам, знайти фільм по ID
import { FetchTrending, FetchSearch, FetchFilmID } from './api-servise';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { refs } from './refs';
import { Loading } from 'notiflix';
import { spinnerStart, spinnerEnd } from './spinner';
import { scrollOnTop } from './scroll-up';
import { createPagination } from './pagination';



const renderGallery = movies => {
  const galleryFilms = document.querySelector('.film-list');
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
        const releaseYear = release_date? release_date.split('-')[0]
          : 'Unknown';
        const poster = poster_path?`${IMG_ARI}${poster_path}`:
          "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
        return `
<li class="film-list__item" data-id=${id}>
  <div class="thumb" >
    <img
      class="film-poster"
      src="${poster}
"
      alt="movie poster"
    />
  </div>
  <div class="film-list__info">
    <h3 class="film-list__name">${title.toUpperCase()}</h3>
    <p class="film-list__genre">${popularity} | ${releaseYear} </p>
  </div>
</li>

        `;
      }
  )
    .join('');
  galleryFilms.insertAdjacentHTML('beforeend', listitem);

};

const RenderPopular = async () => {
  
  try {
    await FetchTrending();
    await renderGallery(filmsTrending);
  } catch {
    console.log('error:');
  }
};
RenderPopular();


FetchTrending(query, page)
    .then(data => {
      spinnerStart();
      if (!data.total_results) {
        // тут треба прикрутити месседж помилки
        
        return;
      }
      refs.galleryFilms.innerHTML = renderGallery(data.results);
      const pagination = createPagination(data.total_results, data.total_pages);
     pagination.on('beforeMove', ({ page }) => {
        spinnerStart();
        refs.galleryFilms.innerHTML = '';
        FetchTrending(query, page).then(data => {
          spinnerEnd();
          refs.galleryFilms.innerHTML =  renderGallery(data.results);
          scrollOnTop();
        });
      });
    })
  .catch(error => console.log(error));
    