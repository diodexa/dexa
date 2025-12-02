// Loader.js

const song = document.querySelector('#song');
export const Loader = (() => {
  let preloader;

  const create = () => {
    if (document.getElementById("preloader")) {
      preloader = document.getElementById("preloader");
      return;
    }

    preloader = document.createElement("div");
    preloader.id = "preloader";

    preloader.innerHTML = `
      <div class="loader">
        <img src="img/logo dio.webp" alt="logo" class="loading-logo">
        <p>Memuat undangan...</p>
      </div>
    `;

    document.body.appendChild(preloader);
  };

  const show = () => {
    if (!preloader) create();
    preloader.classList.remove("hidden");
  };

  const hide = () => {
    if (!preloader) return;
    preloader.classList.add("hidden");
   
  };

  const init = () => {
    create();
    window.addEventListener("load", hide);
  };

  return { init, show, hide };
})();
