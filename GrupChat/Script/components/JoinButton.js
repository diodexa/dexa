import { mulaiAnimasiChat } from "./AnimasiFadeUpBalon.js";
import { playAudio } from "./PlayAudio.js";



export const ButtonJoin = () => {
  const joinBtn = document.getElementById("btnJoin");


  joinBtn.addEventListener("click", () => {
    document.getElementById("join").style.display = "none";
    localStorage.setItem("opened", "true");
    playAudio();

    setTimeout(() => {
      mulaiAnimasiChat();
    }, 1000);
  });

  window.addEventListener("load", () => {
  console.log("opened status =", localStorage.getItem("opened"));
  // if (localStorage.getItem("opened")) {
  //   const Halaman = document.getElementById("join");
  //   if (Halaman) Halaman.style.setProperty("display", "none");
  // }
});
};
