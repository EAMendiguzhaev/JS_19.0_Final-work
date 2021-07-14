import { smoothScroll } from './modules/scroll-menu.js';
import { togglePopup } from './modules/popup.js';
import { launchSlider } from './modules/slider.js';
import { launchCarousel } from './modules/services-carousel.js';
import { launchAccordeon } from './modules/accordeon.js';
import { sendForm } from './modules/send-form.js';
import { activateValidation } from './modules/validation.js';
import './modules/animation.js';

// Запуск плавного скрола
smoothScroll();

// Запуск попапа
togglePopup();

// Запуск слайдера
launchSlider();

// Запуск карусели
launchCarousel();

// Запуск аккордеона
launchAccordeon();

// Запуск отправки формы на сервер
sendForm();

// Запуск проверки Имени и Телефона
activateValidation();
