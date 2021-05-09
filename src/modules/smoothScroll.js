const smoothScroll = (event, target) => {
  event.preventDefault();
  const blockID = target.getAttribute('href').substring(1);
  document.getElementById(blockID).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};
const blockService = document.querySelector('main > a');
blockService.addEventListener('click', (event) => {
  smoothScroll(event, blockService);
});
export default smoothScroll;
