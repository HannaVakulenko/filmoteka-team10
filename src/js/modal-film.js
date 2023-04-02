import { refs } from './refs';

refs.openModalFilmCardItem.addEventListener("click", openFilmCardModal);
refs.closeModalFilmCardBtn.addEventListener("click", closeFilmCardModal);
refs.modalFilmCardBackdrop.addEventListener("click", onBackdropCloseModal)

function openFilmCardModal(event) {
    const { target } = event;
    console.log(target.nodeName);
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