import { API_URL, sendMessage } from "./components/API.js";
import { ButtonKirim } from "./components/ButtonKirim.js";
import { clipboard } from "./components/ClipboardRek.js";
import { imageHover } from "./components/imageHover.js";
import { ButtonJoin } from "./components/JoinButton.js";
import { KirimStiker } from "./components/KirimStiker.js";
import { loadPesan } from "./components/LoadPesan.js";
import {  TampilStiker } from "./components/modalStiker.js";
import { NamaTamu } from "./components/Paramps.js";
import { AudioIcon } from "./components/PlayAudio.js";

document.title = 'Group Chat';


NamaTamu();
ButtonJoin();
loadPesan();
console.log("loadpesan main");
AudioIcon();
imageHover();
clipboard();



// === API ===




// === Fungsi kirim pesan biasa & stiker ===
document.addEventListener("DOMContentLoaded", () => {
  ButtonKirim ();
  TampilStiker();

  KirimStiker();

});