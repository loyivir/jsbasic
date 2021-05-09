// send ajax-form
const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо! мы скоро с вами свяжемся!',
    invalidData = 'Введите данные правильно!';

  const form1 = document.getElementById('form1');
  const form2 = document.getElementById('form2');
  const form3 = document.getElementById('form3');

  const statusMessage = document.createElement('div');
  //statusMessage.textContent = 'Тут будет сообщение';
  statusMessage.style.cssText = 'font-size: 2rem;';
  //form.appendChild(statusMessage);
  const postData = (body) =>
    fetch('./server.php', {
      method: 'POST',
      mode: 'same-origin',
      cache: 'default',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'client',
      body: JSON.stringify(body),
    });
  const validateForm = (form) => {
    const inputs = form.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i++) {
      if ((inputs[i].type === 'text' || inputs[i].id === 'form2-message') && inputs[i].value.length < 2) {
        return false;
      } else if (
        inputs[i].type === 'email' &&
        !(/[-_.!~*'A-Za-z0-9]{1,}@{1}[-_.!~*'A-Za-z0-9]{1,}/g.test(inputs[i].value) && inputs[i].value.length > 0)
      ) {
        return false;
      } else if (inputs[i].type === 'tel') {
        const value = inputs[i].value.replace(/[+()]+/g, '');

        if (value.length < 7 || value.length > 11) {
          return false;
        }
      }
    }
    return true;
  };
  const submitForm = (form) => {
    form.appendChild(statusMessage);
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';

    if (!validateForm(form)) {
      statusMessage.textContent = invalidData;
      setTimeout(() => {
        statusMessage.remove();
      }, 1000);
      return;
    }

    statusMessage.textContent = loadMessage;
    const formData = new FormData(form);
    const body = {};
    for (const val of formData.entries()) {
      body[val[0]] = val[1];
    }
    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        statusMessage.textContent = successMessage;
        form.reset();
        setTimeout(() => {
          statusMessage.remove();
          const target = form.closest('.popup');

          if (target) {
            target.style.display = 'none';
            target.style.opacity = '0%';
          }
        }, 1000);
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
        form.reset();
        setTimeout(() => {
          statusMessage.remove();
          const target = form.closest('.popup');
          if (target) {
            target.style.display = 'none';
            target.style.opacity = '0%';
          }
        }, 1000);
      });
  };
  form1.addEventListener('submit', (event) => {
    event.preventDefault();
    submitForm(form1);
  });

  form2.addEventListener('submit', (event) => {
    event.preventDefault();
    submitForm(form2);
  });

  form3.addEventListener('submit', (event) => {
    event.preventDefault();
    submitForm(form3);
  });
};

export default sendForm;
