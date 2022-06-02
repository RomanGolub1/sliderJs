import SwipeCarousel from './swipe-carousel.js';

const carousel = new SwipeCarousel({
    containerID: '#carousel',
    slideID: '.slide',
    interval: 2000
    // isPlaying: false
});

carousel.init();
