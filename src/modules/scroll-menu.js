const smoothScroll = () => {
  const menuNodes = document.querySelector('.top-menu__items');
  const linkNodes = menuNodes.querySelectorAll('a');

  linkNodes.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();

      const blockID = item.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
};

export { smoothScroll };
