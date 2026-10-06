const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '✕' : '☰';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

// Copy donation details.
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    const card = button.closest('.donation-card');
    const status = card ? card.querySelector('.copy-status') : null;
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(value);
      button.classList.add('copied');
      button.textContent = 'Copied ✓';
      if (status) status.textContent = 'কপি করা হয়েছে।';
      setTimeout(() => {
        button.classList.remove('copied');
        button.textContent = original;
        if (status) status.textContent = '';
      }, 2200);
    } catch {
      if (status) status.textContent = `ম্যানুয়ালি কপি করুন: ${value}`;
    }
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Scroll progress.
const progress = document.querySelector('#scrollProgress');
const updateProgress = () => {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Reveal-on-scroll animation.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// Active navigation link based on the section in view.
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
if ('IntersectionObserver' in window && sections.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));
}

// Lightweight gallery lightbox.
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close image">×</button><img alt="Gallery image">';
document.body.appendChild(lightbox);
const lightboxImage = lightbox.querySelector('img');
const closeLightbox = () => lightbox.classList.remove('open');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.querySelector('img')?.alt || 'Gallery image';
    lightbox.classList.add('open');
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
