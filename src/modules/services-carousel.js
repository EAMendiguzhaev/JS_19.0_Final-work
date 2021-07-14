const launchCarousel = () => {
  const container = document.querySelector('.services-elements');
  const track = document.querySelector('.services-carousel');
  const items = document.querySelectorAll('.services__item');
  const btnLeft = document.querySelector('.arrow-left');
  const btnRight = document.querySelector('.arrow-right');

  const CarouselSettings = {
    POSITION: 0,
    SLIDE_SHOW: {
      MOBILE: 1,
      DESKTOP: 3,
    },
    SLIDE_TO_SCROLL: 1,
    OPACITY: {
      SWITCHED_ON: 1,
      DISABLED: 0.3,
    },
  };

  let position = 0;
  let slideToShow = null;
  let userWidth = document.documentElement.clientWidth;

  if (userWidth > 576) {
    slideToShow = CarouselSettings.SLIDE_SHOW.DESKTOP;
  } else {
    slideToShow = CarouselSettings.SLIDE_SHOW.MOBILE;
  }

  const itemCount = items.length;
  const itemsWidth = container.clientWidth / slideToShow;
  const movePosition = CarouselSettings.SLIDE_TO_SCROLL * itemsWidth;

  items.forEach((item) => {
    item.style.minWidth = `${itemsWidth}px`;
  });

  btnLeft.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemsWidth;
    position += itemsLeft >= CarouselSettings.SLIDE_TO_SCROLL ? movePosition : itemsLeft * itemsWidth;

    setPosition();
    checkBtns();
  });

  btnRight.addEventListener('click', () => {
    const itemsLeft = itemCount - (Math.abs(position) + slideToShow * itemsWidth) / itemsWidth;
    position -= itemsLeft >= CarouselSettings.SLIDE_TO_SCROLL ? movePosition : itemsLeft * itemsWidth;

    setPosition();
    checkBtns();
  });

  const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;
  };

  const checkBtns = () => {
    if (position === 0) {
      btnLeft.disabled = true;
      btnLeft.style.opacity = '0.3';
    } else {
      btnLeft.disabled = false;
      btnLeft.style.opacity = '1';
    }

    if (position <= -(itemCount - slideToShow) * itemsWidth) {
      btnRight.disabled = true;
      btnRight.style.opacity = CarouselSettings.OPACITY.DISABLED;
    } else {
      btnRight.disabled = false;
      btnRight.style.opacity = CarouselSettings.OPACITY.SWITCHED_ON;
    }
  };

  checkBtns();
};

export { launchCarousel };
