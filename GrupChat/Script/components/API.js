import { loadPesan } from "./LoadPesan.js";

export const API_URL = "https://script.google.com/macros/s/AKfycbwOuD7vpBuFzsfTqgvbqewxx0cCW2kvN9jYebSfJnK_AORiu2NinKdoo2PqTQqzKcLo/exec";


export async function getMessages(id = "whatsapp") {
  try {
    const url = `${API_URL}?id=${encodeURIComponent(id)}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);

    const text = await response.text();
    return JSON.parse(text);

  } catch (error) {
    console.error("Error fetching messages:", error);
    return null;
  }
}


export async function sendMessage() {
  try {
    const res = await fetch(API_URL, { method: "POST", body: formData });
    // console.log("Pesan terkirim:", await res.text());
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
}