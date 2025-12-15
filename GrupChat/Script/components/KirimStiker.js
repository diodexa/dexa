import { API_URL } from "./API.js";
import { loadPesan } from "./LoadPesan.js";
import { hideStickerOverlay, showStickerOverlay } from "./modalStiker.js";

let listenerAttached = false;

export const KirimStiker = () => {
  if (listenerAttached) return;
  listenerAttached = true;

  document.querySelectorAll(".sticker").forEach((img) => {
    img.addEventListener("click", async (e) => {
      e.preventDefault();

      if (img.dataset.sending === "1") return;
      img.dataset.sending = "1";

      const inputNama = document.getElementById("NamaKamu");
      const textarea = document.getElementById("InputPesan");
      const tombolKirim = document.getElementById("TombolKirim");
      const stickerButton = document.getElementById("stickerButton");

      const nama = inputNama.value.trim();
      if (!nama) {
        alert("Isi dulu namamu 😄");
        img.dataset.sending = "0";
        return;
      }

      showStickerOverlay();

      inputNama.disabled =
      textarea.disabled =
      tombolKirim.disabled =
      stickerButton.disabled = true;

      try {
        const formData = new FormData();
        formData.append("id", document.getElementById("idInput").value || "whatsapp");
        formData.append("Nama", nama);
        formData.append("Pesan", img.src);

        await fetch(API_URL, { method: "POST", body: formData });
        await loadPesan();
      } catch (err) {
        console.error(err);
      } finally {
        inputNama.disabled = 
        textarea.disabled =
        tombolKirim.disabled =
        stickerButton.disabled = false;
        img.dataset.sending = "0";
        hideStickerOverlay();
      }
    });
  });
};
