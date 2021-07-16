import { animate } from './animation.js';

const togglePopup = () => {
  const buttonCallback = document.querySelectorAll('.button-callback');
  const popupNode = document.querySelector('.modal-callback');
  const popupOverlay = document.querySelector('.modal-overlay');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileBtn = document.querySelector('.mob-menu-btn');
  const form = document.querySelector('#form-callback');
  const formCallback = form.querySelectorAll('input');

  const userWidth = document.documentElement.clientWidth;

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

  // Обработчики на десктопную версию
  const popupDesktop = () => {
    buttonCallback.forEach((item) => {
      item.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (evt.target) {
          popupNode.style.display = 'block';
          popupOverlay.style.display = 'block';

          if (userWidth > 768) {
            menuAnim();
          }
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

  // Обработчики на мобильную версию
  const popupMobile = () => {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.style.cssText = `top: 35px;
                                right: -10px;    
    `;
    });

    mobileMenu.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('mobile-menu-close')) {
        mobileMenu.style.cssText = `top: 35px;
                                right: -400px;
      `;
      } else if (evt.target.classList.contains('mobile-price')) {
        evt.preventDefault();

        const blockID = evt.target.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
        });

        mobileMenu.style.cssText = `top: 35px;
                                right: -400px;
      `;
      } else if (evt.target.classList.contains('callback-btn')) {
        popupNode.style.display = 'block';
        popupOverlay.style.display = 'block';

        mobileMenu.style.cssText = `top: 35px;
                                right: -400px;
      `;
      }
    });
  };

  popupDesktop();
  popupMobile();
};

export { togglePopup };
