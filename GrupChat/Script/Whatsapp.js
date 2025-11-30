import { API_URL } from "./components/API.js";
import { clipboard } from "./components/ClipboardRek.js";
import { imageHover } from "./components/ImageHover.js";
import { ButtonJoin } from "./components/JoinButton.js";
import { loadPesan } from "./components/LoadPesan.js";
import { NamaTamu } from "./components/Paramps.js";
import { AudioIcon } from "./components/PlayAudio.js";

document.title = 'Group Chat';


NamaTamu();
ButtonJoin();
loadPesan();
AudioIcon();
imageHover();
clipboard();



// === API ===

let sedangKirimStiker = false;


// === Fungsi kirim pesan biasa & stiker ===
document.addEventListener("DOMContentLoaded", () => {

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






