//ourTeam
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

export default ourTeam;
