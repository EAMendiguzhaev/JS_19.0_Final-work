const togglePopup = () => {
  const buttonCallback = document.querySelectorAll('.button-callback');
  const popupNode = document.querySelector('.modal-callback');
  const popupOverlay = document.querySelector('.modal-overlay');

  buttonCallback.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();

      console.log('l');
      if (evt.target) {
        popupNode.style.display = 'block';
        popupOverlay.style.display = 'block';
      }
    });
  });

  document.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.classList.contains('modal-close') || target.classList.contains('modal-overlay')) {
      popupNode.style.display = 'none';
      popupOverlay.style.display = 'none';
    }
  });
};

export { togglePopup };
