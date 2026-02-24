document.addEventListener('DOMContentLoaded', () => {
  // Animationen
  const animatedSections = document.querySelectorAll('.animate');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
      else entry.target.classList.remove('visible');
    });
  }, { threshold: 0.2 });
  animatedSections.forEach(section => observer.observe(section));

  // Slider
  const track = document.querySelector('.slider-track');
  if (!track) return;

  let slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.slider-btn.left');
  const nextBtn = document.querySelector('.slider-btn.right');

  // Klonen für Loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);
  slides = Array.from(track.children);

  let currentIndex = 1;

  function updateSlider(animate = true) {
    const containerWidth = track.parentElement.getBoundingClientRect().width;
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Berechne Offset, um Slide mittig zu setzen
    const offset = (containerWidth - slideWidth) / 2;
    const targetPosition = -slides[currentIndex].offsetLeft + offset;

    track.style.transition = animate ? 'transform 0.6s cubic-bezier(0.25,0.8,0.25,1)' : 'none';
    track.style.transform = `translateX(${targetPosition}px)`;

    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add('center');
        const video = slide.querySelector('video');
        if (video) video.play();
      } else {
        slide.classList.remove('center');
        const video = slide.querySelector('video');
        if (video) video.pause();
      }
    });
  }

  // Loop-Handling
  track.addEventListener('transitionend', () => {
    if (slides[currentIndex] === firstClone) {
      currentIndex = 1;
      updateSlider(false);
    }
    if (slides[currentIndex] === lastClone) {
      currentIndex = slides.length - 2;
      updateSlider(false);
    }
  });

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateSlider();
  });

  window.addEventListener('resize', () => updateSlider(false));

  // Initial
  setTimeout(() => updateSlider(false), 50);
});