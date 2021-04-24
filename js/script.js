window.addEventListener('DOMContentLoaded', () => {
  'use strict';
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
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');
    const handlerMenu = () => {
      // menu.classList.toggle('active-menu');
      if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
        menu.style.transform = `translate(0)`;
      } else {
        menu.style.transform = `translate(-100%)`;
      }
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  //popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close');
    popup.style.opacity = '0%';
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (screen.width < 768) {
          popup.style.opacity = '100%';
          popup.style.display = 'block';
          return;
        }
        let start = Date.now();
        popup.style.display = 'block';
        let requestId = setInterval(() => {
          let timePassed = Date.now() - start;

          popup.style.opacity = `${(timePassed / 10).toFixed(0)}%`;
          if (timePassed >= 1000) {
            clearInterval(requestId);
            return;
          }
        }, 10);
      });
    });
    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
      popup.style.opacity = '0%';
    });
  };

  togglePopUp();
});
