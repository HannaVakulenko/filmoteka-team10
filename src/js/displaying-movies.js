
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

//Для отримання найпопулярніших фільмів


FetchTrending();


//для рейтингу


//додаю в розмітку

export async function renderGallery(movies) {
 // const genres = await fetchGenres();
  return movies
    .map(
      ({
        id,
        poster_path,
        title,
        release_date,
        genre_ids,
        original_title,
        vote_average,
      } = movies) => {
        const poster = poster_path
          ? 'poster_path'
          : "https://irc-volvol.info-gkh.com.ua/assets/images/noimage.png";
        const releaseYear = release_date
          ? release_date.split('-')[0]
          : 'Unknown';
        const checkGenres = genre_ids
          ? getGenres(genre_ids, genres)
          : 'Unknown';
        return `
       <li class='movie_list_item' data-id="${id}>
      <a href="" class='movie_list_link link' id=${id}>
      <div class="movie__cover--darkened"></div>
        <img class="movie_list_image" src=${poster} alt='Poster ${original_title}' loading='lazy' />
        <div class='movie-info'>
            <p class='movie-title'>
              <b>${title.toUpperCase()}</b>
            </p>
            <p class='movie-date'>
              <span>${checkGenres} | ${releaseYear}</span>
            </p>
            <div class="movie__average movie__average--${getClassByRate(
              vote_average
            )}">${vote_average.toFixed(1)}</div>
        </div>
        </a>
      </li> 
      `;
      }
    )
    .join('');
}
const galleryFilms = document.querySelector(".galleryFilms")

  galleryFilms.insertAdjacentHTML('beforeend', renderGallery(filmsTrending));



renderGallery(filmsTrending);