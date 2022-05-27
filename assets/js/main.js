(function () {

    const container = document.querySelector('#carousel');
    const slides = container.querySelectorAll('.slide');
    const indicatorsContainer = container.querySelector('.indicators')
    const indicators = indicatorsContainer.querySelectorAll('.indicator');
    const pauseBtn = container.querySelector('#pause-btn')
    const previousBtn = container.querySelector('#previous-btn')
    const nextBtn = container.querySelector('#next-btn')

    const SLIDES_COUNT = slides.length;
    const CODE_LEFT_ARROW = 'ArrowLeft';
    const CODE_RIGHT_ARROW = 'ArrowRight';
    const CODE_SPACE = 'Space';
    const FA_PAUSE = '<i class="fas fa-pause-circle"></i>'
    const FA_PLAY = '<i class="fas fa-play-circle"></i>'

    let currentSlide = 0;
    let isPlaying = true;
    let timerID = null;
    let interval = 2000;
    let swipeStartX = null;
    let swipeEndX = null;

    function gotoNth(n) {
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
        currentSlide = (n + slides.length) % SLIDES_COUNT;
        slides[currentSlide].classList.toggle('active')
        indicators[currentSlide].classList.toggle('active')
    }

    const gotoNext = () => gotoNth(currentSlide + 1);
    const gotoPrevious = () => gotoNth(currentSlide - 1);

    function pause() {
        if (isPlaying) {
            clearInterval(timerID);
            pauseBtn.innerHTML = FA_PLAY;
            isPlaying = false;
        }
    }

    function play() {
        timerID = setInterval(gotoNext, interval);
        pauseBtn.innerHTML = FA_PAUSE;
        isPlaying = true;
    }

    const pausePlay = () => isPlaying ? pause() : play();

    function next() {
        pause();
        gotoNext();
    }

    function previous() {
        pause();
        gotoPrevious();
    }

    function indicate(e) {
        const target = e.target;

        if (target.classList.contains('indicator')) {
            pause();
            gotoNth(+target.dataset.slideTo);
        }
    }

    /* доступ до клавіатури */
    function pressKey(e) {
        if (e.code === CODE_LEFT_ARROW) previous();
        if (e.code === CODE_RIGHT_ARROW) next();
        if (e.code === CODE_SPACE) pausePlay();
    }

    const swipeStart = (e) => swipeStartX = e.changedTouches[0].pageX;

    function swipeEnd(e) {
        swipeEndX = e.changedTouches[0].pageX;
        swipeStartX - swipeEndX < -100 && previous();
        swipeStartX - swipeEndX > 100 && next();

    }

    function initListeners() {
        pauseBtn.addEventListener('click', pausePlay);
        previousBtn.addEventListener('click', previous);
        nextBtn.addEventListener('click', next);
        indicatorsContainer.addEventListener('click', indicate);
        carousel.addEventListener('touchstart', swipeStart);
        carousel.addEventListener('touchend', swipeEnd);
        document.addEventListener('keydown', pressKey) /* доступ до клавіатури */
    }



    function init() {
        initListeners();

        timerID = setInterval(gotoNext, interval);
    }

    init()

}());

