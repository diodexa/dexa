
export const imageHover = () => {

    document.addEventListener("DOMContentLoaded", () => {
      const galleryItems = document.querySelectorAll(
        '.row [data-gallery="Mygallery"]'
      );
    
      if (galleryItems.length > 4) {
        const moreCount = galleryItems.length - 4;
    
        // Sembunyikan semua item setelah index ke-3
        galleryItems.forEach((a, i) => {
          if (i > 3) {
            a.closest(".col").classList.add("d-none");
          }
        });
    
        // Ambil item ke-4 (index 3)
        const lastItem = galleryItems[3];
        lastItem.classList.add("gallery-overlay");
        lastItem.dataset.more = `+${moreCount}`;
      }
    });
}