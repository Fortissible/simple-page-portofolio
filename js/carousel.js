let currentSlide = 0;

function changeSlide(direction) {
  const carouselInner = document.querySelector('.carousel-inner1');
  const totalSlides = document.querySelectorAll('.carousel-item1').length;
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  const translateValue = -currentSlide * 90 + '%';
  carouselInner.style.transform = 'translateX(' + translateValue + ')';
}

function changeSlide2(direction) {
  const carouselInner = document.querySelector('.carousel-inner2');
  const totalSlides = document.querySelectorAll('.carousel-item2').length;
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  const translateValue = -currentSlide * 87 + '%';
  carouselInner.style.transform = 'translateX(' + translateValue + ')';
}