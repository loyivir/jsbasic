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
    } else if (target.closest('a')) {
      handlerMenu();
    }
  });
  btnMenu.addEventListener('click', handlerMenu);
};

export default toggleMenu;
