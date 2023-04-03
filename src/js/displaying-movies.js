
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
import './allgenres';




// const renderGallery = movies => {
//   const galleryFilms = document.querySelector('.film-list');
//   const listitem = movies
//     .map(
//       ({
//         id,
//         poster_path,
//         title,
//         release_date,
//         genre_ids,
//         original_title,
//         vote_average,
//         popularity,
//         vote_count,
//         overview,
//       }) => {
//         const releaseYear = release_date? release_date.split('-')[0]
//           : 'Unknown';
//         const poster = poster_path?`${IMG_ARI}${poster_path}`:
//           "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
//         return `
// <li class="film-list__item" data-id=${id}>
//   <div class="thumb" >
//     <img
//       class="film-poster"
//       src="${poster}
// "
//       alt="movie poster"
//     />
//   </div>
//   <div class="film-list__info">
//     <h3 class="film-list__name">${title.toUpperCase()}</h3>
//     <p class="film-list__genre">${popularity} | ${releaseYear} </p>
//   </div>
// </li>

//         `;
//       }
//   )
//     .join('');
//   galleryFilms.insertAdjacentHTML('beforeend', listitem);

// };

// const RenderPopular = async () => {
  
//   try {
//     await FetchTrending();
//     await renderGallery(filmsTrending);
//   } catch {
//     console.log('error:');
//   }
// };
// RenderPopular();






export const renderGallery = movies => {
  const galleryFilms = document.querySelector('.film-list');
  // document.querySelector('.film-list').innerHTML = '';
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
        // const genres = genre_ids
        //   .map(genre => {
        //     for (const allgenre of allgenres) {
        //       if (Number(genre) === allgenre.id) {
        //         text = allgenre.name;
        //       }
        //     }
        //     return text;
        //   })
        //   .join(', ');

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






// FetchTrending(query, page)
//     .then(data => {
//       spinnerStart();
//       if (!data.total_results) {
//         // тут треба прикрутити месседж помилки
        
//         return;
//       }
//       refs.galleryFilms.innerHTML = renderGallery(data.results);
//       const pagination = createPagination(data.total_results, data.total_pages);
//      pagination.on('beforeMove', ({ page }) => {
//         spinnerStart();
//         refs.galleryFilms.innerHTML = '';
//         FetchTrending(query, page).then(data => {
//           spinnerEnd();
//           refs.galleryFilms.innerHTML =  renderGallery(data.results);
//           scrollOnTop();
//         });
//       });
//     })
//   .catch(error => console.log(error));
    