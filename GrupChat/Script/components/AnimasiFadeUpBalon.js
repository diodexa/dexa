export function mulaiAnimasiChat() {
  const chatList = document.querySelector('.chat');
  const listItems = document.querySelectorAll('li');

  if (localStorage.getItem('animasiChat') === 'done') {
    return; // ❌ tidak aktifkan animasi
  }

  // ✅ Aktifkan mode animasi
  chatList.classList.add('animate-chat');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        listItems.forEach((li, index) => {
          li.style.transitionDelay = `${index * 0.5}s`;
          li.classList.add('active');
        });

        localStorage.setItem('animasiChat', 'done');
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  listItems.forEach(li => observer.observe(li));
}
