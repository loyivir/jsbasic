window.addEventListener('DOMContentLoaded', () => {
  /*Таймер */
  function countTimer(deadline) {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime();
      const timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor((timeRemaining / 60 / 60) % 24);

      return { timeRemaining, hours, minutes, seconds };
    }
    let isIntervalSet = false,
      intervalId = 0;
    function updateClock() {
      const timer = getTimeRemaining();
      timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
      timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
      timerSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;

      if (timer.timeRemaining > 0 && !isIntervalSet) {
        intervalId = setInterval(updateClock, 1000);

        isIntervalSet = true;
      } else if (timer.timeRemaining <= 0) {
        clearInterval(intervalId);
        isIntervalSet = false;
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        timerHours.style.color = 'red';
        timerMinutes.style.color = 'red';
        timerSeconds.style.color = 'red';
      }
    }
    updateClock();
  }
  countTimer('April 23, 2021 23:28:00');

  // Меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu');

    const handlerMenu = () => {
      // menu.classList.toggle('active-menu');
      if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
        menu.style.transform = `translate(0)`;
      } else {
        menu.style.transform = `translate(-100%)`;
      }
    };
    menu.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('close-btn')) {
        handlerMenu();
      } else {
        target = target.closest('li');
        if (target) {
          handlerMenu();
        }
      }
    });
    btnMenu.addEventListener('click', handlerMenu);
  };

  toggleMenu();

  //popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn');

    popup.style.opacity = '0%';
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (screen.width < 768) {
          popup.style.opacity = '100%';
          popup.style.display = 'block';
          return;
        }
        const start = Date.now();
        popup.style.display = 'block';
        const requestId = setInterval(() => {
          const timePassed = Date.now() - start;

          popup.style.opacity = `${(timePassed / 10).toFixed(0)}%`;
          if (timePassed >= 1000) {
            clearInterval(requestId);
            return;
          }
        }, 10);
      });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
        popup.style.opacity = '0%';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
          popup.style.opacity = '0%';
        }
      }
    });
  };

  togglePopUp();

  //Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tab.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tabContent[i].classList.add('d-none');
          tab[i].classList.remove('active');
        }
      }
    };
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, index) => {
          if (item === target) {
            toggleTabContent(index);
          }
        });
      }
    });
  };
  tabs();

  //slider
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      dotContainer = document.querySelector('.portfolio-dots'),
      slider = document.querySelector('.portfolio-content');
    let dot = document.querySelectorAll('.dot');

    dot.forEach((elem) => {
      elem.remove();
    });
    for (let i = 0; i < slide.length; i++) {
      const node = dot[0].cloneNode();
      dotContainer.insertAdjacentElement('beforeend', node);
    }
    dot = document.querySelectorAll('.dot');

    let currentSlide = 0,
      interval;
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      if (target.matches('#arrow-right')) {
        currentSlide++;
        if (currentSlide >= slide.length) {
          currentSlide = 0;
        }
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
        if (currentSlide < 0) {
          currentSlide = slide.length - 1;
        }
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide(1500);
      }
    });
    startSlide(1500);
  };
  slider();

  //slider
  const ourTeam = () => {
    const commandPhotos = document.querySelectorAll('.command__photo');
    const swapPhotos = (img) => {
      const src = img.getAttribute('src'),
        dataImg = img.dataset.img;
      img.dataset.img = src;
      img.setAttribute('src', dataImg);
    };
    commandPhotos.forEach((elem) => {
      elem.addEventListener('mouseover', (event) => {
        swapPhotos(event.target);
      });
      elem.addEventListener('mouseout', (event) => {
        swapPhotos(event.target);
      });
    });
  };
  ourTeam();

  const validation = () => {
    const toNormalCase = (elem) => {
      const text = elem.value;
      elem.value = text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
    };
    const validateMessage = (elem) => {
      const text = elem.value;
      elem.value = text.replace(/[^- А-Яа-я]+/g, '');
    };
    const validateEmail = (elem) => {
      const text = elem.value;
      elem.value = text.replace(/[^-_\.\!~\*'@A-Za-z]+/g, ''); // /\w+@\w+\.\w{2,3}/g
    };
    const validatePhone = (elem) => {
      const text = elem.value;
      elem.value = text.replace(/[^-\d)(]+/g, ''); // /\+?[78]([-()]*\d){10}/g
    };
    const validateInputs = (input) => {
      let text = input.value;
      text = text.replace(/^[ -]+|[ -]+$/g, '');
      text = text.replace(/(-+)/g, '-');
      text = text.replace(/( +)/g, ' ');
      input.value = text;
    };
    document.body.addEventListener('input', (event) => {
      const target = event.target;
      if (target.tagName !== 'INPUT') {
        return;
      }

      // calculator
      if (target.classList.contains('calc-item') && !target.classList.contains('calc-type')) {
        const text = target.value;
        target.value = text.replace(/\D+/g, '');
      }
      if (
        target.getAttribute('id') === 'form1-name' ||
        target.getAttribute('id') === 'form2-name' ||
        target.getAttribute('id') === 'form3-name' ||
        target.getAttribute('id') === 'form2-message'
      ) {
        validateMessage(target);
      }
      if (target.classList.contains('form-email')) {
        validateEmail(target);
      }
      if (target.classList.contains('form-phone')) {
        validatePhone(target);
      }
    });
    document.body.addEventListener('focusout', (event) => {
      const target = event.target;
      if (target.tagName !== 'INPUT') {
        return;
      }
      validateInputs(target);
      if (
        target.getAttribute('id') === 'form1-name' ||
        target.getAttribute('id') === 'form2-name' ||
        target.getAttribute('id') === 'form3-name'
      ) {
        toNormalCase(target);
      }
    });
  };
  validation();
});
