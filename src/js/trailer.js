import { spinnerStart, spinnerEnd } from './spinner';
import { refs } from './refs';
import YouTubePlayer from 'youtube-player';
import Notiflix from 'notiflix';
import {
    API_KEY,
    API_UR,
    IMG_ARI,
    MEDIA_TYPE,
    TIME_WINDOW,
    PER_PAGE,
    page,
    pages,
    GetTrailer,
  } from './api-servise';


const listEl = document.querySelector('.film-list');
// const libraryListEl = document.querySelector();
const trailerModalEl = document.querySelector('.video-trailer');
const trailerBackdropEl = document.querySelector('.js-backdrop-trailer');
const trailerBtnEl = document.querySelector('.trailer');
let id = undefined;

refs.trailerBtn.addEventListener("click", switcherTrailerModal);
refs.backdropTrailer.addEventListener("click", switcherTrailerModal);

function switcherTrailerModal() {
    GetTrailer(726759)
    refs.backdropTrailer.classList.toggle("is-hidden");
};

