import { animate } from './animation.js';

const togglePopup = () => {
  const buttonCallback = document.querySelectorAll('.button-callback');
  const popupNode = document.querySelector('.modal-callback');
  const popupOverlay = document.querySelector('.modal-overlay');
  const form = document.querySelector('#form-callback');
  const formCallback = form.querySelectorAll('input');

  const clearInputs = () => {
    formCallback.forEach((item) => {
      item.value = '';
      item.style.border = '2px solid #e3e3e4';
    });
  };

  const menuAnim = () => {
    animate({
      duration: 400,
      timing: (timeFraction) => {
        return timeFraction;
      },
      draw: (progress) => {
        const startMenu = -200,
          stopMenu = -50,
          posMenu = startMenu + (stopMenu - startMenu) * progress;
        popupNode.style.transform = `translate(${posMenu}%)`;
      },
    });
  };

  buttonCallback.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (evt.target) {
        popupNode.style.display = 'block';
        popupOverlay.style.display = 'block';
        menuAnim();
      }
    });
  });

  document.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.classList.contains('modal-close') || target.classList.contains('modal-overlay')) {
      popupNode.style.display = 'none';
      popupOverlay.style.display = 'none';
      clearInputs();
    }
  });
};

export { togglePopup };
