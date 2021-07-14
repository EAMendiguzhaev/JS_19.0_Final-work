const activateValidation = () => {
  const maskPhone = function (selector, masked = '+7 (___) ___-__-__') {
    const elems = document.querySelectorAll(selector);

    const mask = function (evt) {
      const keyCode = evt.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
      let i = 0,
        newValue = template.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf('_');
      if (i != -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return '\\d{1,' + a.length + '}';
        })
        .replace(/[+()]/g, '\\$&');
      reg = new RegExp('^' + reg + '$');
      if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
        this.value = newValue;
      }
      if (evt.type === 'blur' && this.value.length < 5) {
        this.value = '';
      }
    };

    for (const elem of elems) {
      elem.addEventListener('input', mask);
      elem.addEventListener('focus', mask);
      elem.addEventListener('blur', mask);
    }
  };

  const maskInput = () => {
    document.body.addEventListener('input', (evt) => {
      let target = evt.target;

      // Ваше имя
      if (target.name === 'fio') {
        target.value = target.value.replace(/[^а-яА-ЯёЁ-\s]/g, '');
      }

      // Номер телефона
      if (target.name === 'tel') {
        target.setAttribute('type', 'text');
        maskPhone('.tel');
      }
    });
  };

  const validInput = () => {
    const correctBase = {
      correctName: true,
      correctTel: true,
    };

    document.body.addEventListener('change', (evt) => {
      let target = evt.target;

      // Показ некорректного ввода и блок submit
      const showError = (error) => {
        const selectForm = target.closest('#form-callback');
        if (selectForm) {
          const submitBtn = selectForm.querySelector('.feedback');

          //Подсветка ошибок
          if (error) {
            target.style.border = '2px solid #fe193f';
          } else {
            target.style.border = '2px solid #19fe52';
          }

          // Сводная проверка всех полей
          if (Object.values(correctBase).every((item) => item)) {
            submitBtn.disabled = false;
          } else {
            submitBtn.disabled = true;
          }
        }
      };

      // Корректировка пробелов др. знаков в поле Ваше сообщение
      if (target.name === 'fio' || target.name === 'tel') {
        const changeReg = [/\s+/gm, /-+/gm, /,+/gm, /;+/gm, /:+/gm, /\.+/gm];
        const changeSymbol = [' ', '-', ',', ';', ':', '.'];

        changeSymbol.forEach((item, i) => {
          target.value = target.value.replace(changeReg[i], item);
        });

        if (target.value === ' ') {
          target.value = '';
          correctBase.correctMess = false;
          showError(true);
        } else {
          correctBase.correctMess = true;
          showError(false);
        }
      }

      // Корректировка имени
      if (target.name === 'fio') {
        target.value = target.value.replace(/\s+/g, ' ');
        let nameData = target.value.trim().split(' ');
        let userName = '';

        nameData.forEach((item) => {
          userName += `${item.charAt(0).toUpperCase() + item.substring(1).toLowerCase()}`;
        });

        if (userName === ' ') {
          //если только пробелы - value ''
          target.value = '';
          correctBase.correctName = false;
          showError(true);
        } else if (userName.length < 3) {
          target.value = userName;
          correctBase.correctName = false;
          showError(true);
        } else {
          target.value = userName;
          correctBase.correctName = true;
          showError(false);
        }
      }

      // Валидация телефона
      if (evt.target.name === 'tel') {
        evt.target.value = evt.target.value.replace(/^\+\d{1}\s/g, '+7 ');
        // проверка на количество цифр
        const corrNum = evt.target.value.replace(/[\s\+\(\)-]*/g, '');
        if (corrNum.length < 11) {
          correctBase.correctTel = false;
          showError(true);
        } else {
          correctBase.correctTel = true;
          showError(false);
        }
      }
    });
  };

  maskInput();
  validInput();
};

export { activateValidation };
