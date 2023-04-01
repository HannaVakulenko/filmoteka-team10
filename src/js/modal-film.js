import { refs } from './refs';

refs.FICTIVEopenModalFilmCardItem.addEventListener("click", openFilmCardModal);
refs.closeModalFilmCardBtn.addEventListener("click", closeFilmCardModal);
refs.modalFilmCardBackdrop.addEventListener("click", onBackdropCloseModal)

function openFilmCardModal() {
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