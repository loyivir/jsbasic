// Меню
const toggleMenu = () => {
  const btnMenu = document.querySelector('.menu'),
    menu = document.querySelector('menu');

  const handlerMenu = () => {
    // menu.classList.toggle('active-menu');
    if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
      menu.style.transform = `translate(0px)`;
    } else {
      menu.style.transform = `translate(-100%)`;
    }
  };
  document.body.addEventListener('click', (event) => {
    let target = event.target;

    if (target.closest('.menu')) {
      handlerMenu();
    } else if (target.classList.contains('close-btn')) {
      handlerMenu();
    } else if (target.closest('menu > ul > li > a')) {
      handlerMenu();
    } else if (!target.closest('menu') && menu.style.transform && menu.style.transform === `translate(0px)`) {
      menu.style.transform = `translate(-100%)`;
    }
  });
};

export default toggleMenu;
