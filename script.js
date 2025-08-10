(function () {
  "use strict";

  const slideTimeout = 5000;
  const prev = document.querySelector('#prev');
  const next = document.querySelector('#next');
  const $carousel = document.querySelector('.carousel');
  const $slides = document.querySelectorAll('.carousel .slide');
  const dotsContainer = document.querySelector('.carousel-dots');

  let currentSlide = 0;
  let intervalId;
  let $dots = [];

  function slideTo(index) {
    if (index < 0) index = $slides.length - 1;
    if (index >= $slides.length) index = 0;
    currentSlide = index;
    $carousel.style.transform = `translateX(-${index * 100}%)`;
    $dots.forEach(($dot, i) => {
      $dot.className = i === index ? 'dot active' : 'dot';
    });
  }

  function showNextSlide() {
    slideTo(currentSlide + 1);
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    $slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = i === currentSlide ? 'dot active' : 'dot';
      dot.addEventListener('click', () => slideTo(i));
      dotsContainer.appendChild(dot);
      $dots.push(dot);
    });
  }

  function startAutoSlide() {
    intervalId = setInterval(showNextSlide, slideTimeout);
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  prev.addEventListener('click', () => slideTo(currentSlide - 1));
  next.addEventListener('click', () => slideTo(currentSlide + 1));

  $carousel.addEventListener('mouseover', stopAutoSlide);
  $carousel.addEventListener('mouseout', startAutoSlide);

  createDots();
  slideTo(0);
  startAutoSlide();
})();
