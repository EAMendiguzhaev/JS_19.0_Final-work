const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...';
  const successMessage = 'Спасибо! Мы скоро свяжемся с Вами!';
  const formCallback = document.querySelector('#form-callback');
  const inputsForm = formCallback.querySelectorAll('input');
  const btnSubmit = formCallback.querySelector('.feedback');
  const popupNode = document.querySelector('.modal-callback');
  const popupOverlay = document.querySelector('.modal-overlay');

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem;
                                   color: black;`;

  const postData = (formData) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });
  };

  const clearInputs = () => {
    inputsForm.forEach((item) => {
      item.value = '';
      item.style.border = '2px solid #e3e3e4';
    });
  };

  formCallback.addEventListener('submit', (evt) => {
    evt.preventDefault();
    btnSubmit.disabled = true;

    formCallback.append(statusMessage);
    formCallback.insertAdjacentHTML('beforeend', `<div class="sk-rotating-plane"></div>`);
    const preloader = document.querySelector('.sk-rotating-plane');

    const loadMessage = () => {
      preloader.style.display = 'block';
    };
    statusMessage.textContent = loadMessage();

    let formData = new FormData(formCallback);
    formData = Object.fromEntries(formData);

    postData(formData)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Status Network not 200');
        }
        preloader.style.display = 'none';
        statusMessage.style.textAlign = 'center';
        statusMessage.textContent = successMessage;
        btnSubmit.disabled = false;

        if (successMessage) {
          setTimeout(() => {
            popupNode.style.display = 'none';
            popupOverlay.style.display = 'none';
          }, 1500);
        }
      })
      .catch((error) => {
        preloader.style.display = 'none';
        statusMessage.style.textAlign = 'center';
        statusMessage.textContent = errorMessage;
        console.error(error);
      });

    clearInputs();
  });
};

export { sendForm };
