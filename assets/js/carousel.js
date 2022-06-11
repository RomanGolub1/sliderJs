class Carousel {
    constructor(p) {

        const settings = { ...{ containerID: '#carousel', interval: 5000, isPlaying: true, slideID: '.slide' }, ...p };

        this.container = document.querySelector(settings.containerID);
        this.slideItems = this.container.querySelectorAll(settings.slideID);
        this.interval = settings.interval;
        this.isPlaying = settings.isPlaying;
    }

    _initProps() {

        this.SLIDES_COUNT = this.slideItems.length;
        this.CODE_LEFT_ARROW = 'ArrowLeft';
        this.CODE_RIGHT_ARROW = 'ArrowRight';
        this.CODE_SPACE = 'Space';
        this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
        this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
        this.FA_PREVIOUS = '<i class="fas fa-angle-left"></i>';
        this.FA_NEXT = '<i class="fas fa-angle-right"></i>';

        this.currentSlide = 0;
    }

    _initControls() {
        let controls = document.createElement('div');
        const PAUSE = `<span class="control control-pause" id="pause-btn">
                        <span id="fa-pause-icon">${this.FA_PAUSE}</span>
                        <span id="fa-play-icon">${this.FA_PLAY}</span>
                       </span>`;
        const PREVIOUS = `<span class="control control-previous" id="previous-btn">${this.FA_PREVIOUS}</span> `;
        const NEXT = `<span class="control control-next" id="next-btn">${this.FA_NEXT}</span> `;

        controls.setAttribute('calss', 'controls');
        controls.innerHTML = PAUSE + PREVIOUS + NEXT;

        this.container.append(controls);

        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.previousBtn = this.container.querySelector('#previous-btn');
        this.nextBtn = this.container.querySelector('#next-btn');

        this.pauseIcon = this.container.querySelector('#fa-pause-icon');
        this.playIcon = this.container.querySelector('#fa-play-icon');

        this.isPlaying ? this.pauseIcon.style.opacity = 1 : this.playIcon.style.opacity = 1;
    }

    _initIndicators() {
        const indicators = document.createElement('div');
        indicators.setAttribute('class', 'indicators');


        for (let i = 0, n = this.SLIDES_COUNT; i < n; i++) {
            const indicator = document.createElement('div');

            indicator.setAttribute('class', 'indicator');
            indicator.dataset.slideTo = `${i}`;
            if (i === 0) indicator.classList.add('active');
            indicators.append(indicator)
        }

        this.container.append(indicators);

        this.indContainer = this.container.querySelector('.indicators')
        this.indItems = this.indContainer.querySelectorAll('.indicator');
    }

    _initListeners() {

        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.previousBtn.addEventListener('click', this.previous.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indContainer.addEventListener('click', this._indicate.bind(this));
        // this.container.addEventListener('mouseenter', this._pause.bind(this));
        // this.container.addEventListener('mouseleave', this._play.bind(this));

        document.addEventListener('keydown', this._pressKey.bind(this)) /* доступ до клавіатури */
    }

    _gotoNth(n) {
        this.slideItems[this.currentSlide].classList.toggle('active');
        this.indItems[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.slideItems[this.currentSlide].classList.toggle('active')
        this.indItems[this.currentSlide].classList.toggle('active')
    }

    _gotoNext() {
        this._gotoNth(this.currentSlide + 1);
    }
    _gotoPrevious() {
        this._gotoNth(this.currentSlide - 1);
    }

    _pause() {
        if (this.isPlaying) {
            this.pauseIcon.style.opacity = 0;
            this.playIcon.style.opacity = 1;
            this.isPlaying = false;
            clearInterval(this.timerID);
        }
    }

    _play() {
        this.pauseIcon.style.opacity = 1;
        this.playIcon.style.opacity = 0;
        this.isPlaying = true;
        this.timerID = setInterval(() => this._gotoNext(), this.interval);
    }

    _indicate(e) {
        this.target = e.target;

        if (this.target.classList.contains('indicator')) {
            this._pause();
            this._gotoNth(+this.target.dataset.slideTo);
        }
    }

    /* доступ до клавіатури */
    _pressKey(e) {
        if (e.code === this.CODE_LEFT_ARROW) this.previous();
        if (e.code === this.CODE_RIGHT_ARROW) this.next();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    }

    pausePlay() {
        this.isPlaying ? this._pause() : this._play();
    }

    next() {
        this._pause();
        this._gotoNext();
    }

    previous() {
        this._pause();
        this._gotoPrevious();
    }

    init() {
        this._initProps();
        this._initControls();
        this._initIndicators();
        this._initListeners();
        if (this.isPlaying) this.timerID = setInterval(() => this._gotoNext(), this.interval);
    }
}

export default Carousel;


