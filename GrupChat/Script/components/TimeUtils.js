// utils.js
export function escapeHtml(text) {
  if (typeof text !== "string") return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function formatTimeWhatsApp(dateString) {
  if (!dateString) return "--:--";

  const date = new Date(dateString);
  const now = new Date();

  const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffDays = (d2 - d1) / (1000 * 60 * 60 * 24);

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const hhmm = `${hour}:${minute}`;

  if (diffDays === 0) return hhmm;
  if (diffDays === 1) return "Kemarin";

  const day = String(date.getDate()).padStart(2,"0");
  const month = String(date.getMonth() + 1).padStart(2,"0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
