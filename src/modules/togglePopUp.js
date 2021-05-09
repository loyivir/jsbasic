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

        popup.style.opacity = `${(timePassed / 3).toFixed(0)}%`;
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

export default togglePopUp;
