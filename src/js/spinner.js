import { refs } from './refs';

window.addEventListener('load', onLoad);

function onLoad() {
  refs.spinnerDotsWrapper.style.display = 'none';
}

export function spinnerStart() {
  // refs.spinnerDotsWrapper.style.display = 'block'
  refs.spinnerDotsWrapper.removeAttribute('style');
}

export function spinnerEnd() {
  refs.spinnerDotsWrapper.style.display = 'none';
}
