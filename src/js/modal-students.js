import { refs } from "./refs";

refs.btnModalOpen.addEventListener('click', onModalOpen);
refs.btnModalClose.addEventListener('click', onModalClose);

function onToggleBackdrop() {
    refs.backdropModalTeam.classList.toggle('is-hidden');
};


function onModalOpen(event) {
    event.preventDefault();
    onToggleBackdrop();
    document.addEventListener('keydown', onEscPress);
    refs.backdropModalTeam.addEventListener('click', onBackdropClick);
}

function onModalClose() {
    document.removeEventListener('keydown', onEscPress);
    onToggleBackdrop();
}

function onEscPress(event) {
    if (event.code === 'Escape') {
        onModalClose();
    }
}

function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
        onModalClose();
    }
}