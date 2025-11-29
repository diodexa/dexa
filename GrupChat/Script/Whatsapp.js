import { clipboard } from "./components/ClipboardRek.js";
import { imageHover } from "./components/imageHover.js";
import { NamaTamu } from "./components/Paramps.js";

document.title = 'Group Chat';

const audioiconwrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon = audioiconwrapper.querySelector('i');
const song = document.querySelector('#song');
let isPlaying = false;

function playAudio() {
  song.volume = 0.1;
  song.play();
  isPlaying = true;
  audioIcon.classList.remove('fa-circle-play');
  audioIcon.classList.add('fa-circle-pause');
}

audioiconwrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove('fa-circle-pause');
    audioIcon.classList.add('fa-circle-play');
  } else {
    song.play();
    audioIcon.classList.remove('fa-circle-play');
    audioIcon.classList.add('fa-circle-pause');
  }
  isPlaying = !isPlaying;
};

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

document.getElementById("btnJoin").addEventListener("click", () => {
  document.getElementById("join").style.display = "none";
  localStorage.setItem("opened", "true");
  playAudio();

  // mulai animasi chat
  setTimeout(() => {
    mulaiAnimasiChat();
  }, 1000); // ubah 2000 jadi 3000 kalau mau delay 3 detik, dst.
});

function mulaiAnimasiChat() {
  const listItems = document.querySelectorAll("li");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        listItems.forEach((li, index) => {
          li.style.transitionDelay = `${index * 1}s`; // bisa atur kecepatan
          li.classList.add("active");
        });

        localStorage.setItem("animasiChat", "done");
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  listItems.forEach(li => observer.observe(li));
}


window.addEventListener("load", () => {
  console.log("opened status =", localStorage.getItem("opened"));
  // if (localStorage.getItem("opened")) {
  //   const Halaman = document.getElementById("join");
  //   if (Halaman) Halaman.style.setProperty("display", "none");
  // }
});


NamaTamu();
imageHover();
clipboard();


// === API ===
const API_URL = "https://script.google.com/macros/s/AKfycbwOuD7vpBuFzsfTqgvbqewxx0cCW2kvN9jYebSfJnK_AORiu2NinKdoo2PqTQqzKcLo/exec";
let sedangKirimStiker = false;


// === Fungsi kirim pesan biasa & stiker ===
document.addEventListener("DOMContentLoaded", () => {
  
  loadPesan();
  console.log("Load pesan dipanggil");

  const textarea = document.getElementById("InputPesan");
  const tombolKirim = document.getElementById("TombolKirim");
  const stickerButton = document.getElementById("stickerButton");
  const stickerList = document.getElementById("stickerList");


function showStickerOverlay() {
  const overlay = document.getElementById("stickerOverlay");
  const stickerList = document.getElementById("stickerList");
  const rect = stickerList.getBoundingClientRect(); // posisi relative ke viewport

  // overlay mengikuti posisi sticker list
  overlay.style.position = "fixed";
  overlay.style.top = rect.top + "px";
  overlay.style.left = rect.left + "px";
  overlay.style.width = rect.width + "px";
  overlay.style.height = rect.height + "px";

  overlay.classList.add("show");
  overlay.style.display = "flex";
}

function hideStickerOverlay() {
  const overlay = document.getElementById("stickerOverlay");
  overlay.classList.remove("show");
  setTimeout(() => overlay.style.display = "none", 300);
}
  // === Tombol Kirim Pesan ===
  tombolKirim.addEventListener("click", async () => {
    const inputNama = document.getElementById("NamaKamu");
    const textarea = document.getElementById("InputPesan");


    if (sedangKirimStiker) return; // 🔒 jangan kirim kalau sedang kirim stiker

    const nama = document.getElementById("NamaKamu").value.trim();
    const pesan = textarea.value.trim();
    const id = document.getElementById("idInput").value || "whatsapp";

    if (!nama) {
      document.activeElement.blur(); // 👈 ini yang bikin keyboard nutup
      setTimeout(() => alert("Isi dulu namamu sebelum mengirim pesan 😄"), 100);
      return;
    }

    if (!pesan) {
      document.activeElement.blur(); // 👈 ini yang bikin keyboard nutup
      setTimeout(() =>alert("Pesan tidak boleh kosong!"), 100);
      return;
    }

    tombolKirim.disabled = true;
    inputNama.disabled = true;
    textarea.disabled = true;
    tombolKirim.textContent = "Mengirim";

    const formData = new FormData();
    formData.append("id", id);
    formData.append("Nama", nama);
    formData.append("Pesan", pesan);

    try {
      const res = await fetch(API_URL, { method: "POST", body: formData });
      console.log("Pesan terkirim:", await res.text());
      textarea.value = "";
      await loadPesan();
    } catch (err) {
      console.error("Gagal kirim pesan:", err);
      alert("Gagal mengirim pesan 😢");
    } finally {
      tombolKirim.disabled = false;
      inputNama.disabled = false;
      textarea.disabled = false;
      tombolKirim.textContent = "Kirim";
    }
  });

  

  // === Tampilkan daftar stiker ===
  stickerButton.addEventListener("click", (e) => {
    e.stopPropagation();
    stickerList.style.display = stickerList.style.display === "flex" ? "none" : "flex";
  });

  document.addEventListener("click", (e) => {
    if (!stickerList.contains(e.target) && e.target !== stickerButton) {
      stickerList.style.display = "none";
    }
  });

  // stiker
  document.querySelectorAll(".sticker").forEach((img) => {
  img.addEventListener("click", async (e) => {
    e.preventDefault();

    const inputNama = document.getElementById("NamaKamu");
    const textarea = document.getElementById("InputPesan");
    const tombolKirim = document.getElementById("TombolKirim");
    const stickerButton = document.getElementById("stickerButton");

    const nama = inputNama.value.trim();
    if (!nama) {
      document.activeElement.blur();
      setTimeout(() => alert("Isi dulu namamu sebelum mengirim stiker 😄"), 100);
      return;
    }

    sedangKirimStiker = true;
    showStickerOverlay();

    // 🔒 Disable semua input saat kirim stiker
    inputNama.disabled = true;
    textarea.disabled = true;
    tombolKirim.disabled = true;
    stickerButton.disabled = true;

    const id = document.getElementById("idInput").value || "whatsapp";
    const stikerUrl = img.src;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("Nama", nama);
    formData.append("Pesan", stikerUrl);

    try {
      const res = await fetch(API_URL, { method: "POST", body: formData });
      console.log("Stiker terkirim:", await res.text());
      await loadPesan();
    } catch (err) {
      console.error("Gagal kirim stiker:", err);
      alert("Gagal mengirim stiker 😢");
    } finally {
      hideStickerOverlay();
      stickerList.style.display = "none";
      sedangKirimStiker = false;
      inputNama.disabled = false;
      textarea.disabled = false;
      tombolKirim.disabled = false;
      stickerButton.disabled = false;
    }
  });
});

});

// === Fungsi ambil pesan dari server ===
let isLoadingPesan = false;

async function loadPesan() {
  if (isLoadingPesan) return;
  isLoadingPesan = true;

  const id = "whatsapp";
  const url = `${API_URL}?id=${encodeURIComponent(id)}`;

  try {
    const res = await fetch(url);
    const rawText = await res.text();
    let parsed = null;

    try {
      parsed = JSON.parse(rawText);
    } catch {
      const jsonMatch = rawText.match(/(\[?\{[\s\S]*\}\]?|\[[\s\S]*\])/);
      if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
    }

    let arr = Array.isArray(parsed) ? parsed : (parsed?.data || parsed?.rows || []);
    if (!Array.isArray(arr)) arr = [];

    arr = arr.filter(item => (item.id || item.ID || "").toLowerCase() === id.toLowerCase());

    const chatList = document.querySelector(".chat");
    if (!chatList) return;

    // Hapus pesan dari server sebelumnya (biar gak duplikat)
    chatList.querySelectorAll(".pesan-dari-server").forEach(el => el.remove());

    if (arr.length === 0) return;

    const escapeHtml = str => str ? String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;") : "";

    const colors = ["#ac038dff","#3a86d2ff","#0aa54bff","#b57706ff","#640811ff","#167f9cff","#839534ff","#5352ed"];

    arr.forEach(item => {
      const li = document.createElement("li");
      li.classList.add("active", "pesan-dari-server");

      const nama = item.Nama || item.nama || item.Name || "Anonim";
      const pesan = item.Pesan || item.pesan || "";
      const dateObj = item.Date || item.date ? new Date(item.Date || item.date) : new Date();

      let pesanContent;
      let isSticker = false;
        if (pesan.match(/^https?:\/\/.*\.(png|jpg|jpeg|gif|webp)$/i)) {
          isSticker = true;
          pesanContent = `<img src="${pesan}" alt="stiker" class="stiker-chat">`;
        } else {
          pesanContent = `<p>${escapeHtml(pesan)}</p>`;
        }

        
        let htmlContent = "";
      if (isSticker) {
  // 🔹 Struktur untuk stiker (tanpa balon)
          htmlContent = `
            <div class="chat-image" style="background-image: url('img/logoDexa.webp'); background-size: 150%;"></div>
            <div class="balon-chat-transparant">
              <h3 style="color:${colors[Math.floor(Math.random() * colors.length)]};">${escapeHtml(nama)}</h3>
              <img src="${pesan}" alt="stiker" class="stiker-chat">
              <span class="waktu">${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
            </div>
          `;
        } else {
          // 🔹 Struktur untuk teks (masih pakai balon)
          htmlContent = `
            <div class="chat-image" style="background-image: url('img/logoDexa.webp'); background-size: 150%;"></div>
            <div class="balon-chat">
              <h3 style="color:${colors[Math.floor(Math.random() * colors.length)]};">${escapeHtml(nama)}</h3>
              <div class="Nama-chat">
                <p>${escapeHtml(pesan)}</p>
                <br>
                <span class="waktu">${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
              </div>
            </div>
          `;
        }

        li.innerHTML = htmlContent;

      chatList.appendChild(li);
    });

    initFancyboxProfile();



    chatList.scrollTop = chatList.scrollHeight;
  } catch (err) {
    console.error("Error loadPesan:", err);
  } finally {
    isLoadingPesan = false;
  }
}


function initFancyboxProfile() {
  const fotoPP = document.querySelectorAll('.chat-image');

  fotoPP.forEach(pp => {
    if (pp.dataset.bound) return; // biar gak dobel event
    pp.dataset.bound = true;

    pp.addEventListener('click', () => {  
      const bg = pp.style.backgroundImage;
      if (!bg || bg === 'none') return;

      const src = bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      Fancybox.show([{ src, type: 'image', caption: 'Foto Profil' }]);
    });
  });
}


