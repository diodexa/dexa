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
