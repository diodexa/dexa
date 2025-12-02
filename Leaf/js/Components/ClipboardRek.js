


export const clipboard = () => {
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
    popup.style.padding = "2%";
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
}