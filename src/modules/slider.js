const slider = () => {
  const sliderContainer = document.querySelector('#top-slider__wrapper');
  const sliderNodes = document.querySelectorAll('.top-slider__list');
  const dot = document.querySelectorAll('.dot');

  let currentSlide = 0; // Номер слайда
  let interval = null;

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {
    prevSlide(sliderNodes, currentSlide, 'top-slider__list--active');
    prevSlide(dot, currentSlide, 'dot-active');
    currentSlide++;
    if (currentSlide >= sliderNodes.length) {
      currentSlide = 0;
    }
    nextSlide(sliderNodes, currentSlide, 'top-slider__list--active');
    nextSlide(dot, currentSlide, 'dot-active');
  };

  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  sliderContainer.addEventListener('click', (evt) => {
    const target = evt.target;

    // Ограничиваю добавление классов при клике на родителя
    if (!target.matches('.top-slider__list, .dot')) {
      return;
    }

    prevSlide(sliderNodes, currentSlide, 'top-slider__list--active');
    prevSlide(dot, currentSlide, 'dot-active');

    if (target.matches('.dot')) {
      dot.forEach((item, index) => {
        if (item === target) {
          currentSlide = index;
        }
      });
    }

    nextSlide(sliderNodes, currentSlide, 'top-slider__list--active');
    nextSlide(dot, currentSlide, 'dot-active');
  });

  // Остановка слайда при наведении на точки
  sliderContainer.addEventListener('mouseover', (evt) => {
    if (evt.target.matches('.dot')) {
      stopSlide();
    }
  });

  sliderContainer.addEventListener('mouseout', (evt) => {
    if (evt.target.matches('.dot')) {
      startSlide(3000);
    }
  });

  startSlide();
};

export { slider };
