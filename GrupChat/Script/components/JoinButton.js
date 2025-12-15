import { mulaiAnimasiChat } from "./AnimasiFadeUpBalon.js";
import { playAudio } from "./PlayAudio.js";

export const ButtonJoin = () => {
  const joinBtn = document.getElementById("btnJoin");
  const chatList = document.querySelector(".chat");

  if (!joinBtn || !chatList) return;

  joinBtn.addEventListener("click", () => {
    document.getElementById("join")?.style.setProperty("display", "none");
    localStorage.setItem("opened", "true");
    playAudio();

    // STEP 1: set state awal animasi
    chatList.classList.add("animate-chat");

    // STEP 2: tunggu browser commit layout + paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
    
           setTimeout(() => {
            mulaiAnimasiChat();
          }, 1000);
      });
    });
  });

  window.addEventListener("load", () => {
    if (localStorage.getItem("opened")) {
      document.getElementById("join")?.style.setProperty("display", "none");
      document.body.classList.add("join-active");
    }
  });
};
