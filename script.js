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

document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(value);
      button.classList.add('copied');
      button.textContent = 'Copied ✓';
      if (status) status.textContent = 'Account number copied.';
      setTimeout(() => {
        button.classList.remove('copied');
        button.textContent = 'Copy Account Number';
        if (status) status.textContent = '';
      }, 2200);
    } catch {
      if (status) status.textContent = `Please copy manually: ${value}`;
    }
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

// Subtle reveal animation without any external library.
const revealItems = document.querySelectorAll('.program-card, .image-card, .featured-project, .gallery-grid img, .bank-card, .contact-card');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealItems.forEach(item => observer.observe(item));
}
