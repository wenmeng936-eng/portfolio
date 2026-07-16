// ---------- Reveal on scroll ----------
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach((item) => observer.observe(item));
}

// ---------- Media cards: click-to-play video ----------
function initMediaCards() {
  const cards = document.querySelectorAll('.media-card[data-video]');
  cards.forEach((card) => {
    const video = card.querySelector('video');
    if (!video) return;

    const stop = () => {
      video.pause();
      video.currentTime = 0;
      card.classList.remove('is-playing');
    };

    card.addEventListener('click', () => {
      const isPlaying = card.classList.contains('is-playing');
      // stop all other playing cards
      document.querySelectorAll('.media-card.is-playing').forEach((other) => {
        if (other !== card) {
          const otherVideo = other.querySelector('video');
          if (otherVideo) {
            otherVideo.pause();
            otherVideo.currentTime = 0;
          }
          other.classList.remove('is-playing');
        }
      });

      if (isPlaying) {
        stop();
      } else {
        card.classList.add('is-playing');
        video.play().catch(() => {});
      }
    });

    video.addEventListener('ended', stop);
  });
}

// ---------- Lightbox for gallery images ----------
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('href') || trigger.getAttribute('data-lightbox');
      lightboxImg.setAttribute('src', src);
      lightbox.classList.add('is-open');
    });
  });

  const close = () => {
    lightbox.classList.remove('is-open');
    lightboxImg.setAttribute('src', '');
  };

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

// ---------- Nav: mobile toggle + active section highlight ----------
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }
}

// ---------- Video Lightbox: fullscreen video playback ----------
function initVideoLightbox() {
  const videoLightbox = document.getElementById('video-lightbox');
  if (!videoLightbox) return;
  const fullscreenVideo = videoLightbox.querySelector('video');
  const closeBtn = videoLightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.media-card[data-video]').forEach((card) => {
    const video = card.querySelector('video');
    if (!video) return;

    // Double-click to open fullscreen video
    card.addEventListener('dblclick', (e) => {
      e.preventDefault();
      const videoSrc = video.getAttribute('src');
      fullscreenVideo.setAttribute('src', videoSrc);
      videoLightbox.classList.add('is-open');
      fullscreenVideo.play().catch(() => {});
    });
  });

  const close = () => {
    videoLightbox.classList.remove('is-open');
    fullscreenVideo.pause();
    fullscreenVideo.currentTime = 0;
    fullscreenVideo.setAttribute('src', '');
  };

  closeBtn.addEventListener('click', close);
  videoLightbox.addEventListener('click', (e) => {
    if (e.target === videoLightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

// ---------- Category filter chips (packaging portfolio) ----------
function initFilters() {
  const chips = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-platform]');
  if (!chips.length) return;

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const filter = chip.getAttribute('data-filter');
      cards.forEach((card) => {
        const platform = card.getAttribute('data-platform');
        const show = filter === 'all' || platform === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

function init() {
  initReveal();
  initMediaCards();
  initLightbox();
  initVideoLightbox();
  initNav();
  initFilters();
}

document.addEventListener('DOMContentLoaded', init);
