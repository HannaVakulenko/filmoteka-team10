import { refs } from './refs';
import 'animate.css';

const img = new Image();
img.src =
  // 'https://media.tenor.com/ycXJZJnD2SwAAAAd/welcome-welcome-message-for-the-group.gif';
  'https://media.tenor.com/Yvzvgu1EsA4AAAAd/%D0%BB%D0%B8%D1%81-metro-goldwyn-mayer.gif'
let i = 0;

window.addEventListener('beforeunload', () => {
  if (i === 0) {
    localStorage.removeItem('preloaderPlayed');
  } else {
    return;
  }
});

const linkOnSecondPageLogo = document.querySelector('.nav__logo');

let linkOnSecondPageHome;

if (document.querySelector('.nav__li[href="/index.html"]')) {
  // console.log(Boolean(document.querySelector('.nav__li[href="/index.html"]')))
  linkOnSecondPageHome = document.querySelector('.nav__li[href="/index.html"]');
}
if (document.querySelector('.nav__li[href="/filmoteka-team10/index.html"]')) {
  // console.log(Boolean(document.querySelector('.nav__li[href="/filmoteka-team10/index.html]"')))
  linkOnSecondPageHome = document.querySelector(
    '.nav__li[href="/filmoteka-team10/index.html"]'
  );
}

// console.log(linkOnSecondPageHome)

let linkOnSecondPageLibrary;

if (document.querySelector('.nav__li[href="/my-library.html"]')) {
  linkOnSecondPageLibrary = document.querySelector('[href="/my-library.html"]');
}

if (
  document.querySelector('.nav__li[href="/filmoteka-team10/my-library.html"]')
) {
  linkOnSecondPageLibrary = document.querySelector(
    '.nav__li[href="/filmoteka-team10/my-library.html"]'
  );
}

let search;
let searchTest = document.querySelectorAll('.search-form');
if (searchTest.length > 0) {
  search = document.querySelector('.search-form');
  search.addEventListener('submit', onSecondPage);
}

linkOnSecondPageLogo.addEventListener('click', onSecondPage);
linkOnSecondPageHome.addEventListener('click', onSecondPage);
linkOnSecondPageLibrary.addEventListener('click', onSecondPage);

if (!localStorage.getItem('preloaderPlayed')) {
  window.addEventListener('load', welcome);
  localStorage.setItem('preloaderPlayed', true);
} else {
  refs.preloaderGifWrapper.style.display = 'none';
}

function onSecondPage() {
  localStorage.setItem('preloaderPlayed', true);
  i += 1;
}

function welcome() {
  refs.preloaderGifImage.setAttribute('src', img.src);
  refs.preloaderGifImage.classList.add('animate__fadeIn');

  setTimeout(() => {
    refs.preloaderGifWrapper.classList.add('animate__fadeOut');
    refs.preloaderGifImage.classList.add('animate__fadeOut');
    setTimeout(() => {
      refs.preloaderGifWrapper.style.display = 'none';
    }, 500);
  }, 2000);
}
