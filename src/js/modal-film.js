import { refs } from './refs';
import { GetTrailer } from './api-servise';
refs.openModalFilmCardItem.addEventListener("click", openFilmCardModal);
refs.closeModalFilmCardBtn.addEventListener("click", closeFilmCardModal);
refs.modalFilmCardBackdrop.addEventListener("click", onBackdropCloseModal);

let filmId = null;


function openFilmCardModal(event) {
    const { target } = event;
    console.log(target);
    if (target.nodeName !== 'LI' && target.nodeName !== 'IMG' && target.nodeName !== 'H3' && target.nodeName !== 'P') {
        return;
    };

    // для получения айди фильма, для трейлера
   const li = target.closest('li') 
   filmId = li.getAttribute('data');
   console.log(filmId);

  //если не находит трейлер при открытии модалки, не отображается кнопка

   let data = GetTrailer(filmId);
   data.then(data => {
    // const trailerNotExists = true;
    const trailerNotExists = data.results.length === 0;
    if (trailerNotExists) {
        refs.trailerBtn.classList.toggle('is-hidden');
    }
   });

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
export { filmId };