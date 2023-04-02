import { refs } from "./refs";

refs.btnScroll.addEventListener('click', onTopScroll);

window.onscroll = function() {
    scrollFunction();
}

function scrollFunction () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        refs.btnScroll.style.display = 'flex';
    } else {
        refs.btnScroll.style.display = 'none';
    }
}

function onTopScroll () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}