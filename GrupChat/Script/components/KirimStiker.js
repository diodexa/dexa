
export const KirimStiker = () => {

    let sedangKirimStiker = false;
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
    return sedangKirimStiker
}