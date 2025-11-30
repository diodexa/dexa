

export function mulaiAnimasiChat() {
  const listItems = document.querySelectorAll("li");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        listItems.forEach((li, index) => {
          li.style.transitionDelay = `${index * 1}s`; 
          li.classList.add("active");
        });

        localStorage.setItem("animasiChat", "done");
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  listItems.forEach(li => observer.observe(li));
}