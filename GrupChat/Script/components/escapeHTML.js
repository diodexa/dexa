export function escapeHtml(unsafe) {
  if (unsafe === null || unsafe === undefined) return "";       // handle null/undefined
  const s = String(unsafe);                                     // convert anything ke string
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}