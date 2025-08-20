const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.querySelector('.carousel-dots');
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

let currentIndex = 0;
const slideCount = slides.length;

// Create dots dynamically
slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Show the current slide
function updateSlides(startFromBeginning = true) {
  slides.forEach((slide, index) => {
    const video = slide.querySelector('video');
    if (index === currentIndex) {
      slide.style.display = 'block';
      if (startFromBeginning) {
        video.pause();
        video.currentTime = 0;   // reset to start
        video.play();             // play smoothly
      } else {
        video.play();
      }
    } else {
      slide.style.display = 'none';
      video.pause();
      video.currentTime = 0;     // reset hidden videos
    }
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Go to a specific slide (reset video)
function goToSlide(index) {
  currentIndex = index;
  updateSlides(true);
}

// Next / previous slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % slideCount;
  updateSlides(true);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slideCount) % slideCount;
  updateSlides(true);
}

// Hover pause/resume for currently visible video
slides.forEach(slide => {
  const video = slide.querySelector('video');

  slide.addEventListener('mouseenter', () => {
    if (slide.style.display === 'block') video.pause();
  });

  slide.addEventListener('mouseleave', () => {
    if (slide.style.display === 'block') video.play();
  });

  // When video ends naturally, move to next immediately
  video.addEventListener('ended', () => {
    nextSlide();
  });
});

// Arrow navigation
rightArrow.addEventListener('click', nextSlide);
leftArrow.addEventListener('click', prevSlide);

// Initialize
updateSlides();
