// import {refs} from './refs'
// import 'animate.css';

// const img = new Image()
// img.src = 'https://media.tenor.com/ycXJZJnD2SwAAAAd/welcome-welcome-message-for-the-group.gif'
// let i = 0

// window.addEventListener('beforeunload', () => {
//     if (i === 0) {
//         localStorage.removeItem('preloaderPlayed');
//     } else {
//         return
//     }
// })

// refs.linkOnSecondPageLogo.addEventListener('click', onSecondPage);
// refs.linkOnSecondPageHome.addEventListener('click', onSecondPage);
// refs.linkOnSecondPageLibrary.addEventListener('click', onSecondPage);

// if (!localStorage.getItem('preloaderPlayed')) {
//     window.addEventListener('load', welcome)
//     localStorage.setItem('preloaderPlayed', true);
// }
// else {
//     refs.preloaderGifWrapper.style.display = 'none';
// }

// function onSecondPage() {
//     localStorage.setItem('preloaderPlayed', true)
//     i += 1
// }

// function welcome() {
//     refs.preloaderGifImage.setAttribute('src', img.src)
//     refs.preloaderGifImage.classList.add('animate__fadeIn')

//     setTimeout(() => {
//         refs.preloaderGifWrapper.classList.add('animate__fadeOut')
//         refs.preloaderGifImage.classList.add('animate__fadeOut')
//         setTimeout(() => {
//             refs.preloaderGifWrapper.style.display = 'none';
//         }, 500)
//     }, 2000)
// }



// добавить в рефс когда вся вёрстка будет

// linkOnSecondPageLogo: document.querySelector('.nav__logo'),
// linkOnSecondPageHome: document.querySelector('a.nav__li--current'),
// linkOnSecondPageLibrary: document.querySelector('a.nav__li--library'),