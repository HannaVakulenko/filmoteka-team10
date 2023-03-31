import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import refs from './refs';

const TUI_VISIBLE_PAGES = 10;

export function createPagination(totalItems, visiblePages) {
    const options = {
        itemsPerPage: 12,
        totalItems: totalItems,
        visiblePages: visiblePages < 10 ? visiblePages : TUI_VISIBLE_PAGES,
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


