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
    menu.addEventListener('click', event => {
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
    popupBtn.forEach(elem => {
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

    popup.addEventListener('click', event => {
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

    const toggleTabContent = index => {
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
    tabHeader.addEventListener('click', event => {
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
});
