// Ambil semua link navbar
const navLinks = document.querySelectorAll("header a[href^='#']");

// Fungsi reset semua link jadi default
function resetNav() {
  navLinks.forEach(link => {
    link.classList.remove("nav-active");
    link.classList.add("nav-default");
  });
}

// Scrollspy logic
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`header a[href="#${id}"]`);

      if (entry.isIntersecting) {
        resetNav();
        if (link) {
          link.classList.add("nav-active");
          link.classList.remove("nav-default");
        }
      }
    });
  },
  {
    threshold: 0.6, // aktif kalau 60% dari section kelihatan
  }
);

sections.forEach(section => observer.observe(section));

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector('[data-collapse-toggle]');
  const navMenu = document.getElementById('navbar-default');
  if (!toggleBtn || !navMenu) return;

  const menuLinks = navMenu.querySelectorAll('a');

  // sync colors when toggle clicked (Flowbite sets aria-expanded automatically)
  toggleBtn.addEventListener('click', () => {
    // small timeout to let Flowbite update aria-expanded / classes first
    setTimeout(() => {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        menuLinks.forEach(a => a.classList.add('text-white'));
      } else {
        menuLinks.forEach(a => a.classList.remove('text-white'));
      }
    }, 10);
  });

  // close when clicking a link inside menu (mobile)
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('block')) {
        navMenu.classList.remove('block');
        navMenu.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
        menuLinks.forEach(a => a.classList.remove('text-white'));
      }
    });
  });

  // close when clicking outside menu
  document.addEventListener('click', (e) => {
    const clickInsideMenu = navMenu.contains(e.target) || toggleBtn.contains(e.target);
    if (!clickInsideMenu) {
      // only do if menu appears open (Flowbite uses 'block' class)
      if (navMenu.classList.contains('block') || toggleBtn.getAttribute('aria-expanded') === 'true') {
        navMenu.classList.remove('block');
        navMenu.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
        menuLinks.forEach(a => a.classList.remove('text-white'));
      }
    }
  });

  // optional: close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (navMenu.classList.contains('block')) {
        navMenu.classList.remove('block');
        navMenu.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
        menuLinks.forEach(a => a.classList.remove('text-white'));
      }
    }
  });
});