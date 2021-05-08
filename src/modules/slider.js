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

export default slider;
