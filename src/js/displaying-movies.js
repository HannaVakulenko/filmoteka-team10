
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
//додаю в розмітку

function renderGallery(movies) {

  const galleryFilms = document.querySelector(".film-list")
  document.querySelector(".film-list").innerHTML = "";
return
   movies.map(
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
     } = movies) => {
       const poster = poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}`
          : "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
        const releaseYear = release_date
          ? release_date.split('-')[0]
          : 'Unknown';
        const checkGenres = genre_ids
          ? getGenres(genre_ids, genres)
          : 'Unknown';
       
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
       <li class="film-list__item" data-id=${id}>
        <div class="thumb" id=${id}>
          <img class="film-poster" src="${poster}" alt="movie poster" />
        </div>

        <div class="film-list__info">
          <h3 class="film-list__name"${title}></h3>
          <p class="film-list__genre">${checkGenres} |${releaseYear} </p>
        </div>
      </li>
        `;
     
    galleryFilms.appendChild(movieEl);
  });
}
  
renderGallery(filmsTrending);






