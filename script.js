const isTouchDevice = window.matchMedia('(hover: none)').matches;

document.querySelectorAll('.work-item').forEach(item => {
  const video = item.querySelector('video');
  if (!video) return;

  if (isTouchDevice) {
    // Tap behavior: first tap plays preview, second tap follows the link
    item.addEventListener('click', (e) => {
      if (!item.classList.contains('active')) {
        e.preventDefault();
        document.querySelectorAll('.work-item.active').forEach(other => {
          other.classList.remove('active');
          other.querySelector('video')?.pause();
        });
        item.classList.add('active');
        video.currentTime = 0;
        video.play();
      }
      // if already active, let the tap proceed and follow the link normally
    });
  } else {
    // Desktop behavior: hover to preview
    item.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      video.play();
    });

    item.addEventListener('mouseleave', () => {
      video.pause();
    });
  }
});