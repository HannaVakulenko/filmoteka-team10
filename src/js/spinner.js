import { refs } from './refs';

// refs.spinnerDotsWrapper.removeAttribute('style');

window.addEventListener('load', onLoad);

window.onerror = function () {
  refs.spinnerDotsWrapper.style.display = 'none';
};

function onLoad() {
  refs.spinnerDotsWrapper.style.display = 'none';
}

export function spinnerStart() {
  //   refs.spinnerDotsWrapper.style.display = 'block'
  refs.spinnerDotsWrapper.removeAttribute('style');
}

export function spinnerEnd() {
  refs.spinnerDotsWrapper.style.display = 'none';
}
