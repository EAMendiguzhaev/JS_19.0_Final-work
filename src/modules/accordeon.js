const launchAccordeon = () => {
  const accordeonWrapper = document.querySelector('.accordeon');
  const accordeonNodes = accordeonWrapper.querySelectorAll('.element');
  const accordeonContentNodes = accordeonWrapper.querySelectorAll('.element-content');

  for (let i = 0; i < accordeonNodes.length; i++) {
    accordeonNodes[i].addEventListener('click', () => {
      if (accordeonNodes[i].classList.contains('active')) {
        accordeonNodes[i].classList.remove('active');
        accordeonContentNodes[i].style.display = 'block';
      } else {
        accordeonNodes.forEach((item) => {
          item.classList.remove('active');
        });
        accordeonContentNodes.forEach((item) => {
          item.style.display = 'none';
        });
        accordeonNodes[i].classList.add('active');
        accordeonContentNodes[i].style.display = 'block';
      }
    });
  }
};

export { launchAccordeon };
