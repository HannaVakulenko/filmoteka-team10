import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { refs } from './refs';

const options = {

  itemsPerPage: 1,
  visiblePages: 5,
  centerAlign: true,
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

const pagination = new Pagination(refs.pagination, options);

export function createPagination(totalPages) {
  if (totalPages <= 1) {
    refs.divPagination.classList.add('hidden-tui');
  } else {
    refs.divPagination.classList.remove('hidden-tui');
    if (totalPages !== pagination._options.totalItems) {
      pagination.reset(totalPages);
    } else {
      pagination.setTotalItems(totalPages);
    }
  }
}

export { pagination, options };

