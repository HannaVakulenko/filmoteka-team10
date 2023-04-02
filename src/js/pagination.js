import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { refs } from './refs';

const TUI_VISIBLE_PAGES = 5;

export function createPagination(totalItems, visiblePages) {
    const options = {
        itemsPerPage: 12,
        totalItems: totalItems,
        visiblePages: visiblePages < 5 ? visiblePages : TUI_VISIBLE_PAGES,
        centerAlign: true,
    };

    const pagination = new Pagination(refs.pagination, options);

    if (visiblePages > 1) {
    refs.pagination.style.display = 'block';
    } else {
        refs.pagination.style.display = 'none';
    }

    return pagination;
}

// const pagination = createPagination(data.total_results, data.total_pages); для того щоб запустити пагінацію


pagination.on('beforeMove', ({ page }) => {
        spinnerStart();
        refs.galleryFilms.innerHTML = '';
        FetchSearch(query, page).then(data => {
            spinnerEnd();
            refs.galleryFilms.innerHTML =  renderGallery(data.results);
            scrollOnTop();
        });
        });



pagination.on('beforeMove', ({ page }) => {
        spinnerStart();
        refs.galleryFilms.innerHTML = '';
        FetchTrending(query, page).then(data => {
            spinnerEnd();
            refs.galleryFilms.innerHTML = renderGallery(data.results);
            scrollOnTop();
        });
        });
    