const slides = document.querySelectorAll('.slide');
const pauseBtn = document.querySelector('#pause-btn')
const previousBtn = document.querySelector('#previous-btn')
const nextBtn = document.querySelector('#next-btn')


let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 2000;

function gotoNth(n) {
    slides[currentSlide].classList.toggle('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.toggle('active')
}

function gotoNext() {
    gotoNth(currentSlide + 1);

}

function gotoPrevious() {
    gotoNth(currentSlide - 1);
}

function pause() {
    if (isPlaying) {
        clearInterval(timerID);
        pauseBtn.innerHTML = 'Play';
        isPlaying = false;
    }
}

function play() {
    timerID = setInterval(gotoNext, interval);
    pauseBtn.innerHTML = 'Pause';
    isPlaying = true;
}

function pausePlay() {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
}

function next() {
    pause();
    gotoNext();
}

function previous() {
    pause();
    gotoPrevious();
}

pauseBtn.addEventListener('click', pausePlay);
previousBtn.addEventListener('click', previous);
nextBtn.addEventListener('click', next);

timerID = setInterval(gotoNext, interval);