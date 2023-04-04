
import { refs } from './refs';





// export function createPagination(totalPages) {
//   if (totalPages <= 1) {
//     refs.pagination.classList.add('hidden-tui');
//   } else {
//     refs.pagination.classList.remove('hidden-tui');
//     if (totalPages !== pagination._options.totalItems) {
//       pagination.reset(totalPages);
//     } else {
//       pagination.setTotalItems(totalPages);
//     }
//   }
// }

// pagination.on('beforeMove', ({ page }) => {
//         spinnerStart();
//         refs.film-list.innerHTML = '';
//         FetchSearch(query, page).then(data => {
//             spinnerEnd();
//             refs.film-list.innerHTML =  renderGallery(data.results);
//             scrollOnTop();
//         });
//         });

// pagination.on('beforeMove', ({ page }) => {
//         spinnerStart();
//         refs.galleryFilms.innerHTML = '';
//         FetchSearch(query, page).then(data => {
//             spinnerEnd();
//             refs.galleryFilms.innerHTML =  renderGallery(data.results);
//             scrollOnTop();
//         });
//         });

// pagination.on('beforeMove', ({ page }) => {
//         spinnerStart();
//         refs.galleryFilms.innerHTML = '';
//         FetchTrending(query, page).then(data => {
//             spinnerEnd();
//             refs.galleryFilms.innerHTML = renderGallery(data.results);
//             scrollOnTop();
//         });
//         });
