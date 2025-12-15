

export const TampilStiker = () => {

    const stickerButton = document.getElementById("stickerButton");
    const stickerList = document.getElementById("stickerList");
    
    stickerButton.addEventListener("click", (e) => {
        e.stopPropagation();
        stickerList.style.display = stickerList.style.display === "flex" ? "none" : "flex";
      });
    
      document.addEventListener("click", (e) => {
        if (!stickerList.contains(e.target) && e.target !== stickerButton) {
          stickerList.style.display = "none";
        }
      });
}

export function hideStickerOverlay() {
  const overlay = document.querySelector(".sticker-overlay");
  overlay.classList.remove("show");
  setTimeout(() => overlay.style.display = "none", 300);
}

export function showStickerOverlay() {
  console.log("hideStickerOverlay DIPANGGIL");
  const overlay = document.querySelector(".sticker-overlay");
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
