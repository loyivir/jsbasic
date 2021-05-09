import smoothScroll from './smoothScroll';
// Меню
const toggleMenu = () => {
  const menu = document.querySelector('menu');

  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };
  document.body.addEventListener('click', (event) => {
    let target = event.target;

    if (target.closest('.menu')) {
      handlerMenu();
    } else if (target.classList.contains('close-btn')) {
      handlerMenu();
    } else if (target.closest('menu > ul > li > a')) {
      target = target.closest('menu > ul > li > a');
      smoothScroll(event, target);
      handlerMenu();
    } else if (!target.closest('menu')) {
      menu.classList.remove('active-menu');
    }
  });
};

export default toggleMenu;
