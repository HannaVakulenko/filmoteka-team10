// import { spinnerStart, spinnerEnd } from './spinner';
import { refs } from './refs';
import { GetTrailer } from './api-servise';
import { filmId } from './modal-film';


refs.trailerBtn.addEventListener("click", switcherTrailerModal);
refs.backdropTrailer.addEventListener("click", switcherTrailerModal);

async function switcherTrailerModal() {
     let data = await GetTrailer(filmId);
     console.log(data);
     const getLink = data.results[0].key;
     const markup =
       await `<iframe class="youtube" width="100%" height="100%" src='https://www.youtube.com/embed/${getLink}' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="trailer_video"></iframe>`;
    let player = document.getElementById('video-trailer-player');
    player.innerHTML = markup;
    refs.backdropTrailer.classList.toggle("is-hidden");
}


 //если не находит трейлер при открытии модалки, не отображается кнопка
 checkTrailerExists();
 
 function checkTrailerExists(){
  let data = GetTrailer(filmId);
 data.then(data => {
  // const trailerNotExists = true; 
  // - это для проверки, если не находит трейлер, не показывает кнопку
  const trailerNotExists = data.results.length === 0;
  if (trailerNotExists) {
      refs.trailerBtn.classList.add('is-hidden');
  } else {
    refs.trailerBtn.classList.remove('is-hidden');
  }
 });
}

