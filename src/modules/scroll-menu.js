const smoothScroll = () => {
  const menuNodes = document.querySelector('.top-menu__items');
  const linkNodes = menuNodes.querySelectorAll('a');
  const btnArrowTop = document.querySelector('.up');

  linkNodes.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();

      const blockID = item.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

  console.log(pageYOffset);

  window.addEventListener('scroll', function () {
    if (pageYOffset >= 600) {
      btnArrowTop.style.display = 'block';
    } else {
      btnArrowTop.style.display = 'none';
    }
  });

  btnArrowTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
};

export { smoothScroll };
