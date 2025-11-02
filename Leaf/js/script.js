gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const audioiconwrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon = document.querySelector('.audio-icon-wrapper i')
const song = document.querySelector ('#song') ;
let isPlaying = false;

function playAudio() {

// song.volume = 0.1;
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
// const video = document.querySelector('.video-cover');
document.getElementById("btnJoin").addEventListener("click", () => {
     const judul = document.querySelector(".judul");

 gsap.fromTo(".judul",
  { opacity: 0, y: 20, rotate: -20, scale: 0.2 },
  { opacity: 1, y: 0, rotate: 0, scale:1, duration: 4, delay: 0.5, ease: "power2.out" }
);
  
    gsap.to(joinSection, {
    duration: 1,
    y:-100,
    opacity: 0,
 
    onComplete: () => {
      joinSection.classList.add("hidden"); 
      
    }
  });
console.log(joinSection);

  playAudio();
  // Join()

  window.scrollTo({
    top: 0,
   
  })
});


// function Join() {
//     const Halaman = document.getElementById("join");
//     if (Halaman) {
//       Halaman.style.display = "none";
//     }

//     console.log("set opened = true");
//   }

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

// =============================================================================


 window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hidden");
 });


//  =========================================================================





const gambar1 = document.getElementById ('gambar1');
const gambar2 = document.getElementById ('gambar2');
const gambar3 = document.getElementById ('gambar3');
const gambar4 = document.getElementById ('gambar4');
const gambar5 = document.getElementById ('gambar5');
const gambar6 = document.getElementById ('gambar6');
const kiri = document.querySelectorAll ('.kiri');
const kanan = document.querySelectorAll ('.kanan');



const scrollPositions = [648, 1108, 0, 1568, 3330 ];

document.querySelectorAll('.bottom-nav a').forEach((link, i) => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetScroll = scrollPositions[i]; 
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  });
});


gsap.to(["dotlottie-wc", ".judul1"], {
  opacity: 0,
  y:100,
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".page",     
    start: "top top",   
    end: "100 top",      
    scrub: true,         
  }
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page",
    start: "top top",  
    end: "bottom top",     
    scrub: true, 
    pin:true,
             
    // markers: true,  
    onUpdate: (self) => {
        const absoluteScroll = self.scroll();
        console.log(`Posisi Scroll (px): ${absoluteScroll}`);
           
}    
  },
});


tl.fromTo(
  gambar1,
  { y:"60%", opacity: 0, scale: 3 },
  { opacity: 1, scale: 1,}
);

tl.fromTo("#text1", 
  { scale:2}, 
  { scale:1, opacity: 1, duration: 1 },
  "<" 
);

//////////////////////////gambar2//////////////////////////////////
tl.to(
  gambar1,
  { x: "-20%", scale: 0.8, filter: "blur(5px)", duration:1 }
);


tl.fromTo(
  gambar2,
  { y:"80%", x:"150%",  scale:2},
  { x:"20%", opacity:1, scale:1.2,duration:1},
  "<" 
);

tl.to("#text1", 
   { x: "-20%", opacity:0, filter: "blur(5px)", duration:1 },
  "<" 
);
tl.fromTo("#text2", 
  { x: "100%"}, 
  { x:0, opacity: 1, duration: 1 },
  "<" 
);

/////////////////////////gambar3///////////////////////////////////
tl.to(
  [gambar1],
  { x: "5%",  filter: "blur(10px)", scale:0.6, duration:1 }
);

tl.to(
  [gambar2],
  { x: "40%",  filter: "blur(5px)", scale:1, duration:1 }, "<"
);


tl.fromTo(
  gambar3,
  { y:"50%",x:"-150%", scale:1.5},
  { x:"-20%", opacity:1, scale:1.2,duration:1},
  "<" 
);

tl.to("#text2", 
   { x: "80%", scale:0.8, opacity:0, filter: "blur(5px)", duration:1 },
  "<" 
);
tl.fromTo(["#text3", "#bride"], 
  { x: "-50%", scale:1.5}, 
  { x:0, opacity: 1, scale:1,pointerEvents: "auto", duration: 1 },
  "<" 
);
////////////////////////////gambar4////////////////////////////////

tl.to(
  [gambar3],
  { x: "-30%",   filter: "blur(10px)", scale:0.8, duration:1 }
);


tl.to(
  [gambar2],
  { x: "10%", filter: "blur(15px)", scale:0.8, duration:1 }, "<"
);

tl.to(
  [gambar1],
  { x: "-10%",  filter: "blur(20px)", scale:0.4, duration:1 }, "<"
);

tl.fromTo(
    gambar4,
    { y:"50%",x:"150%", scale:2},
    { x: "20%", opacity:1, scale:1,duration:1},
    "<" 
);

tl.to(["#text3", "#bride"], 
   { x: "-70%", opacity:0, scale:0.5, filter: "blur(5px)",pointerEvents: "none", duration:1 },
  "<" 
);
tl.fromTo(["#text4", "#groom"], 
  { x: "100%", pointerEvents: "none",  scale:2}, 
  { x:0, opacity: 1, scale:1,pointerEvents: "auto", duration: 1 },
  "<" 
);
////////////////////////////gambar5////////////////////////////////
tl.to(
  [gambar4],
  { x: "35%",   filter: "blur(10px)", scale:0.7, duration:1 }
);


tl.to(
  [gambar3],
  { x: "-15%", filter: "blur(15px)", scale:0.5, duration:1 }, "<"
);

tl.to(
  [gambar2],
  { x: "20%",  filter: "blur(20px)", scale:0.5, duration:1 }, "<"
);
tl.to(
  [gambar1],
  { x: "5%",  filter: "blur(25px)", scale:0.3, duration:1 }, "<"
);

tl.fromTo(
    gambar5,
    { y:"60%",x:"-130%", scale:1.5},
    { x: "-30%", opacity:1, scale:1,duration:1},
    "<" 
);

tl.to(["#text4", "#groom"], 
   { x: "50%", scale:0.7, opacity:0, pointerEvents: "none", filter: "blur(5px)", duration:1 },
  "<" 
);
tl.fromTo("#text5", 
  { x: "-50%",scale:1.5}, 
  { x:0, opacity: 1, scale:1, pointerEvents: "auto", duration: 1 },
  "<" 
);

///////////////////////////////gambar6////////////////////////////////////

tl.to(
  [gambar5],
  { x: "-50%",   filter: "blur(10px)", scale:0.8, duration:1 }
);

tl.to(
  [gambar4],
  { x: "5%", filter: "blur(15px)", scale:0.5, duration:1 }, "<"
);

tl.to(
  [gambar3],
  { x: "-30%", opacity: 0.5,  filter: "blur(20px)", scale:0.4, duration:1 }, "<"
);

tl.to(
  [gambar2],
  { x: "0",  opacity: 0.5,  scale:0.3, duration: 1 }, "<"
);
tl.to(
  [gambar1],
  { x: "-10%",  opacity: 0.5, scale:0.2, duration: 1 }, "<"
);

// tl.to([gambar1,gambar2],
//   { opacity: 0, pointerEvents: "none", duration: 1 },
//   "<"
// );


tl.fromTo(
    gambar6,
    { y:"80%",x:"130%", scale:2},
    {  x: "20%", opacity:1, scale:1, duration:1},
    "<" 
);

tl.to("#text5", 
   { x: "-35%", scale:0.8, opacity:0, pointerEvents: "none", filter: "blur(5px)", duration:1 },
  "<" 
);
tl.fromTo("#text6", 
  { x: "50%", scale:1.5}, 
  { x:0, opacity: 1, scale:1, duration: 1 },
  "<" 
);



tl.to([ gambar1, gambar2,gambar3,gambar4,gambar5,gambar6],
  { opacity: 0, filter: "blur(10px)", pointerEvents: "none", duration: 1 }
);


tl.to("#text6", 
   {  scale:0.9, opacity:0, filter: "blur(5px)", duration:1 },
  "<" 
);

// =====================================================

tl.fromTo("#text7", 
  { opacity:0,pointerEvents: "none"}, 
  {  opacity:1,pointerEvents: "auto", duration: 1 },
  "<" 
);
tl.fromTo(kiri, 
  { x: "-100%", opacity:0}, 
  { x:0,   opacity:1, duration: 1 },
  "<" 
);
tl.fromTo(kanan, 
  { x: "100%", opacity:0}, 
  { x:0, opacity:1, duration: 1 },
  "<" 
);
tl.fromTo("#tulisan", 
  { y: "-100%", opacity:0}, 
  { y:0, opacity:1, duration: 1 },
  "<" 
);


document.addEventListener("DOMContentLoaded", async function() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbwdCJUNB86lSZdN4SyxaRQo6DTdDeROUFxxAe3-yRq5cTVeaT9-gENyGOaXv1Cux6M/exec";
    const formRsvp = document.getElementById("form-rsvp"); 
    const paginationControls = document.getElementById("pagination-controls");
    const commentsDiv = document.getElementById("comments");
    const btnKirim = formRsvp.querySelector('button[type="submit"]');
    const idUndangan = "wehweh-blehbleh";

    let ALL_COMMENTS = [];
    let currentPage = 1;
    const COMMENTS_PER_PAGE = 4;

    // --- DISPLAY COMMENTS ---
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
        // formRsvp.scrollIntoView({ behavior: 'smooth' });
    }

    // --- FETCH COMMENTS ---
    async function fetchComments() {
        try {
            const response = await fetch(scriptURL + "?id=" + idUndangan);
            const text = await response.text(); 
            console.log("Raw response:", text);
            const data = JSON.parse(text);
            // const data = await response.json();
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


// ==========================clipboard=============================
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
    popup.style.padding = "3%";
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