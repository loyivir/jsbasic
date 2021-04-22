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
        console.log('Set!');
        isIntervalSet = true;
      } else if (timer.timeRemaining <= 0) {
        console.log('Cleared!');
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
});
