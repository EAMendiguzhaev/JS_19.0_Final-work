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
    MOBILE_VERSION: 576,
  };

  let position = 0;
  let slideToShow = null;
  let userWidth = document.documentElement.clientWidth;

  if (userWidth > CarouselSettings.MOBILE_VERSION) {
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

  btnRight.addEventListener('click', () => {
    const itemsLeft = itemCount - (Math.abs(position) + slideToShow * itemsWidth) / itemsWidth;

    position -= itemsLeft >= CarouselSettings.SLIDE_TO_SCROLL ? movePosition : itemsLeft * itemsWidth;

    if (userWidth > 576 && itemsLeft === 0) {
      position = 0;
    } else if (userWidth < 576 && itemsLeft === 0) {
      position = 0;
    }

    setPosition();
  });

  btnLeft.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemsWidth;
    position += itemsLeft >= CarouselSettings.SLIDE_TO_SCROLL ? movePosition : itemsLeft * itemsWidth;

    if (userWidth > 576 && position >= itemsLeft) {
      position = -(itemsWidth * (itemCount - (Math.abs(position) + slideToShow * itemsWidth) / itemsWidth));
    } else if (userWidth < 576 && position >= itemsLeft) {
      position = -(itemsWidth * (itemCount - (Math.abs(position) + slideToShow * itemsWidth) / itemsWidth));
    }
    setPosition();
  });

  const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;
  };
};

export { launchCarousel };
