import { refs } from './refs';
import { FetchFilmID } from './api-servise';

refs.openModalFilmCardItem.addEventListener("click", openFilmCardModal);
refs.openModalFilmCardItem.addEventListener('click', onFilmCardClick);
refs.closeModalFilmCardBtn.addEventListener("click", closeFilmCardModal);
refs.modalFilmCardBackdrop.addEventListener("click", onBackdropCloseModal)

async function onFilmCardClick(e) {
    try {
    refs.modalFilmCardWindow.innerHTML = '';
    let filmId = e.target.closest('li').dataset.id;
    const films = await FetchFilmID(filmId);

    refs.modalFilmCardWindow.insertAdjacentHTML('afterbegin', modalFilmMarkup(films));

  } catch (error) {
    console.log(error);
  }
};

function modalFilmMarkup({
  poster_path,
  original_title,
  title,
  name,
  vote_average,
  vote_count,
  genres,
  overview,
  popularity,
  id,
}) {
  const filmGenres = genres.map(({ name }) => name).join(', ');
        return `<div class="modal-film__poster">
      <img class="modal-film__img" src=https://image.tmdb.org/t/p/original${poster_path} alt=${title || original_title || name
            } />
    </div>
    <div class="modal-film__description">
        <h2 class="modal-film__title">${title || original_title || name}</h2>
        <ul class="modal-film__container list">
          <li class="modal-film__items">
            <p class="modal-film__item">Vote / Votes</p>
            <p class="modal-film__info modal-film__info--orange">
              <span class="orange-number">${vote_average.toFixed(1)}</span>
              <span class="devider"></span>
              <span class="modal-film__info">${vote_count}</span>
            </p>
          </li>
          <li class="modal-film__items">
            <p class="modal-film__item">Popularity</p>
            <p class="modal-film__info">${popularity.toFixed(1)}</p>
          </li>
          <li class="modal-film__items">
            <p class="modal-film__item">Original title</p>
            <p modal-film__info>${title || original_title || name}</p>
          </li>
          <li class="modal-film__items">
            <p class="modal-film__item">Genre</p>
            <p class="modal-film__info">${filmGenres}</p>
          </li>
        </ul>
        <p class="modal-film__about">About</p>
        <p class="modal-film__text">${overview}</p>
      <div class="modal-film__buttons">
        <button type="button" class="btn-watched button" data-id=${id}>add to watched</button>
        <button type="button" class="btn-queue button" data-id=${id}>add to queue</button>
      </div>
      </div>`;
};

function openFilmCardModal(e) {
    const { target } = e;
    if (target.nodeName !== 'LI' && target.nodeName !== 'IMG' && target.nodeName !== 'H3' && target.nodeName !== 'P') {
        return;
    };
    document.body.classList.toggle("modal-open");
    refs.modalFilmCardBackdrop.classList.toggle("is-hidden");
    window.addEventListener("keydown", onKeyboardClose);
};

function closeFilmCardModal() {    
    document.body.classList.toggle("modal-open");
    refs.modalFilmCardBackdrop.classList.toggle("is-hidden");
    window.removeEventListener("keydown", onKeyboardClose);
};
    
function onBackdropCloseModal(e) {
    if (e.currentTarget === e.target) {
        closeFilmCardModal();
    };
};

function onKeyboardClose(e) {
    if (e.code === "Escape") {
        closeFilmCardModal();
    };
};