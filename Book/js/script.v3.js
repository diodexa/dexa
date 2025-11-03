const {
  gsap,
  ScrollTrigger,
  gsap: { to, set } } =
window;

gsap.registerPlugin(ScrollTrigger);

to('.buku', {
  scrollTrigger: {
    scrub: 1,
    start: () => 0,
    end: () => window.innerHeight * 0.25
  },
  scale: 1
});

// Log scroll
window.addEventListener('scroll', () => {
  console.log("Scroll Y sekarang:", window.scrollY);
});




const KertasS = [...document.querySelectorAll('.buku__Kertas')];
KertasS.forEach((Kertas, index) => {
  set(Kertas, { z: index === 0 ? 13 : -index * 1 });
  if (index === 9) return false;
  to(Kertas, {
    rotateY: `-=${180 - index / 2}`,
    scrollTrigger: {
      scrub: 1,
      start: () => (index + 1) * (window.innerHeight * 0.25),
      end: () => (index + 2) * (window.innerHeight * 0.25) } });


  to(Kertas, {
    z: index === 0 ? -13 : index,
    scrollTrigger: {
      scrub: 1,
      start: () => (index + 1) * (window.innerHeight * 0.25),
      end: () => (index + 1.5) * (window.innerHeight * 0.25) } });


});

// =======================================================
const copyButtons = [
  { id: "clipboardBCA", text: "321773737373" },
  { id: "clipboardBNI", text: "123455678990" },
  { id: "clipboardAlamat", text: "jalanjalanjalan" },
];


async function safeCopy(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {

      const tempInput = document.createElement("textarea");
      tempInput.value = text;
      tempInput.style.position = "fixed";
      tempInput.style.top = "-1000px";
      document.body.appendChild(tempInput);
      tempInput.focus();
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }

    const popup = document.createElement("div");
    popup.textContent = "✅ Disalin ke clipboard!";
    popup.style.position = "fixed";
    popup.style.bottom = "15%";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.background = "rgba(0,0,0,0.8)";
    popup.style.color = "#fff";
    popup.style.padding = "2%";
    popup.style.whiteSpace = "nowrap";
    popup.style.borderRadius = "12px";
    popup.style.fontSize = "50%";
    popup.style.zIndex = "9999";
    popup.style.transition = "opacity 1s ease";
    document.body.appendChild(popup);
    setTimeout(() => popup.style.opacity = "0", 1000);
    setTimeout(() => popup.remove(), 1500);

  } catch (err) {
    console.error("❌ Gagal menyalin:", err);
    alert("Gagal menyalin. Silakan salin manual.");
  }
}


copyButtons.forEach(({ id, text }) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      safeCopy(text);
    });
  }
});

// ================================================

const audioiconwrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon = document.querySelector('.audio-icon-wrapper i')
const song = document.querySelector ('#song') ;
let isPlaying = false;

function playAudio() {

song.volume = 0.1;
audioiconwrapper.style.display = 'flex';
song.play();
isPlaying = true;
}

audioiconwrapper.onclick = function() {
if (isPlaying) {
    song.pause();
    audioIcon.classList.remove('fa-circle-pause');
    audioIcon.classList.add('fa-circle-play');
} else{
    song.play();
    audioIcon.classList.add('fa-circle-pause');
    audioIcon.classList.remove('fa-circle-play');
}

isPlaying = !isPlaying;
}
const btnJoin = document.getElementById("btnJoin");
const joinSection = document.getElementById("join");
const video = document.querySelector('.video-cover');
document.getElementById("btnJoin").addEventListener("click", () => {
  // if (video) {
  //   video.play().catch(err => {
  //     console.log('Video gagal play otomatis:', err);
  //   });
  // }
  
  gsap.to(joinSection, {
    duration: 1,
    y:-100,
    opacity: 0,
 
    onComplete: () => {
      joinSection.classList.add("hidden"); 
      
    }
  });

  // Baru bener-bener hilang setelah 1 detik
  setTimeout(() => {
    joinSection.style.display = "none";
  }, 5000);
  playAudio();
  // Join()

  window.scrollTo({
    top: 0,
   
  })
});


function Join() {
    const Halaman = document.getElementById("join");
    if (Halaman) {
      Halaman.style.display = "none";
    }

    console.log("set opened = true");
  }

  document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    song.pause();
    isPlaying = false; // reset status
    audioIcon.classList.remove('fa-circle-pause');
    audioIcon.classList.add('fa-circle-play');
  }
});

window.addEventListener("beforeunload", () => {
  song.pause();
  song.currentTime = 0;
  isPlaying = false;
});

// ===========================params===================================
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get('to') || 'Tamu Undangan';


const sambutanText = document.querySelector('#Tamu');
sambutanText.innerHTML = `${nama}`.replace(/,$/,',') ;

// ===========================loader===================================

 window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hidden");
 });


// =========================text keyboard==================================


// document.addEventListener("DOMContentLoaded", () => {
//   const textarea = document.getElementById("inputPesan");

//   // Deteksi kalau user pakai iOS
//   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

//   if (isIOS && textarea) {
//     textarea.addEventListener("focus", () => {
//       setTimeout(() => {
//         window.scrollTo({
//           top: 1130, // posisi Y target kamu
//           behavior: "smooth"
//         });
//       }, 300); // delay kecil biar keyboard muncul dulu
//     });
//   }
// });

// =========================Form==================================

document.addEventListener("DOMContentLoaded", async function() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbwdCJUNB86lSZdN4SyxaRQo6DTdDeROUFxxAe3-yRq5cTVeaT9-gENyGOaXv1Cux6M/exec";
    const formRsvp = document.getElementById("form-rsvp"); 
    const paginationControls = document.getElementById("pagination-controls");
    const commentsDiv = document.getElementById("comments");
    const btnKirim = formRsvp.querySelector('button[type="submit"]');
    const idUndangan = "andi-sarah";

    let ALL_COMMENTS = [];
    let currentPage = 1;
    const COMMENTS_PER_PAGE = 4;

 
    function displayComments(page) {
        commentsDiv.innerHTML = '';

        const totalComments = ALL_COMMENTS.length;
        const startIndex = (page - 1) * COMMENTS_PER_PAGE;
        const endIndex = Math.min(startIndex + COMMENTS_PER_PAGE, totalComments);

        const commentsToShow = ALL_COMMENTS.slice(startIndex, endIndex);
        commentsToShow.forEach(comment => {
            const div = document.createElement("div");
            div.className = "comment-item";
            div.innerHTML = `
                <p><b>${comment.nama}</b> <span class="kehadiran-badge ${comment.kehadiran === 'Hadir' ? 'hadir':'tidakhadir'}">${comment.kehadiran}</span></p>
                <p>${comment.ucapan}</p>
                <hr>`;
            commentsDiv.appendChild(div);
        });

        renderPaginationControls();
    }

    // --- RENDER PAGINATION ---
    function renderPaginationControls() {
        const totalPages = Math.ceil(ALL_COMMENTS.length / COMMENTS_PER_PAGE);
        if (totalPages <= 1) {
            paginationControls.innerHTML = '';
            return;
        }

        paginationControls.innerHTML = `
            <button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
            <span>${currentPage}/${totalPages}</span>
            <button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
        `;
    }

    // --- NAVIGASI HALAMAN ---
    window.goToPage = function(page) {
        const totalPages = Math.ceil(ALL_COMMENTS.length / COMMENTS_PER_PAGE);
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        displayComments(currentPage);
        formRsvp.scrollIntoView({ behavior: 'smooth' });
    }

    // --- FETCH COMMENTS ---
    async function fetchComments() {
        try {
            const response = await fetch(scriptURL + "?id=" + idUndangan);
            const data = await response.json();
            ALL_COMMENTS = data.reverse();
            displayComments(currentPage);
        } catch (err) {
            console.error("Gagal mengambil data komentar:", err);
            commentsDiv.innerHTML = "<p>Gagal memuat komentar. Silakan coba lagi.</p>";
        }
    }

    // --- SUBMIT FORM ---
    formRsvp.addEventListener("submit", async function(e) {
        e.preventDefault();
        const formData = new FormData(formRsvp);
        btnKirim.disabled = true;
        btnKirim.textContent = 'Mengirim...';
        try {
            const response = await fetch(scriptURL, { method: 'POST', body: formData });
            if (!response.ok) throw new Error(`Status: ${response.status}`);
            formRsvp.reset();
            currentPage = 1;
            await fetchComments();
            formRsvp.scrollIntoView({ behavior: 'smooth' });
        } catch (err) {
            console.error("Gagal mengirim data:", err);
            alert("Terjadi kesalahan: " + err.message);
        } finally {
            btnKirim.disabled = false;
            btnKirim.textContent = 'Kirim';
        }
    });

    // --- INIT ---
    fetchComments();
});


