import { sendMessage } from "./API.js";
import { KirimStiker } from "./KirimStiker.js";

export const ButtonKirim = () => {
    const tombolKirim = document.getElementById("TombolKirim");
    const StatusKirimStiker = KirimStiker()
    const inputNama = document.getElementById("NamaKamu");
    const textarea = document.getElementById("InputPesan");
    

    tombolKirim.addEventListener("click", async () => {
    
        if (StatusKirimStiker) return; 
    
        const nama = document.getElementById("NamaKamu").value.trim();
        const pesan = textarea.value.trim();
        const id = document.getElementById("idInput").value || "whatsapp";
    
        if (!nama) {
          document.activeElement.blur(); 
          setTimeout(() => alert("Isi dulu namamu sebelum mengirim pesan 😄"), 100);
          return;
        }
    
        if (!pesan) {
          document.activeElement.blur(); 
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
    
        sendMessage();
      });
}
