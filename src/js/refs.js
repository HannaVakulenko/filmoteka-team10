const refs = {
  modal: document.querySelector('.modal-firebase'),
  modalHeader: document.querySelector('.modal-firebase__title'),
  modalForm: document.querySelector('.modal-firebase__form'),
  registerText: document.querySelector('.modal-firebase__form-text-register'),
  loginButton: document.querySelector('.modal-firebase__form-button--send'),
  registerButton: document.getElementById('register-btn'),
  openModalBtn: document.getElementById('open-modal-btn'),
  closeModalBtn: document.getElementById('close-modal-btn'),
  inputFields: document.querySelectorAll('.modal-firebase__form-input'),
  pagination: document.querySelector('#pagination'),
  spinnerDotsWrapper: document.querySelector('.spinner'),
  preloaderGifWrapper: document.querySelector('.preloader'),
  preloaderGifImage: document.querySelector('.preloader__image'),

  openModalFilmCardItem: document.querySelector('.film-list'),
  closeModalFilmCardBtn: document.querySelector('.modal-film__close-btn'),

  modalFilmCardWindow: document.querySelector('.modal-film__main '),
  modalFilmCardBackdrop: document.querySelector('.backdrop-film-card'),
  trailerBtn: document.querySelector('.trailer'),
  backdropTrailer: document.querySelector('.js-backdrop-trailer'),

  btnModalOpen: document.querySelector('.btn-modal-open'),
  btnModalClose: document.querySelector('.btn-modal-close'),
  backdropModalTeam: document.querySelector('.team '),
  btnScroll: document.querySelector('.btn-scroll'),

  logOutLibrary: document.querySelector('.nav__li.link.log-out'),

  galleryFilms: document.querySelector('.film-list'),
};
export { refs };
