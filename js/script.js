// welcomeMessage();


// function welcomeMessage() {
  
//     let username = prompt("Masukkan dulu nama kamu ya ");
//     if (username) {
//         document.getElementById('welcome-user').innerText = username;
//     }
// }

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navigation a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop; ; 
    const sectionHeight = section.clientHeight;
    const scrollMiddle = scrollY + window.innerHeight / 2;
    if (scrollMiddle >= sectionTop && scrollMiddle < sectionTop + sectionHeight) {
      current = section.getAttribute("id");  
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});


// Form validation function
function validateForm() {
    event.preventDefault();
    let name = document.getElementById('Nama').value;
    let email = document.getElementById('Email').value;
    let message = document.getElementById('Message').value;

    // Simple validation
    if (name === "" || email === "" || message === "") {
        // Show an alert if any field is empty
        alert("pastiin sudah terisi semua ya!");
         return false;
    } else {
        alert("Terima kasih sudah mengisi " + name + "!");
        // Optionally, you can clear the form here
        document.getElementById('Nama').value = "";
        document.getElementById('Email').value = "";
        document.getElementById('Message').value = "";
         return false;
    }
}