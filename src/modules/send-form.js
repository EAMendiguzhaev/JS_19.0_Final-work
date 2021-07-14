const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...';
  const successMessage = 'Спасибо! Мы скоро свяжемся с Вами!';
  const formCallback = document.querySelector('#form-callback');
  const inputsForm = formCallback.querySelectorAll('input');
  const btnSubmit = formCallback.querySelector('.feedback');

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem;
                                   color: black;`;

  const postData = (formData) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
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

    const formData = new FormData(formCallback);

    postData(formData)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Status Network not 200');
        }
        preloader.style.display = 'none';
        statusMessage.style.textAlign = 'center';
        statusMessage.textContent = successMessage;
        btnSubmit.disabled = false;
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
