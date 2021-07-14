import { smoothScroll } from './modules/scroll-menu.js';
import { togglePopup } from './modules/popup.js';
import { slider } from './modules/slider.js';
import './modules/services-carousel.js';

// Запуск плавного скрола
smoothScroll();

// Запуск попапа
togglePopup();

// Запуск слайдера
slider();
