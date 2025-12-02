import { AnimasiLeaf } from "./Components/AnimasiLeaf.js";
import { clipboard } from "./Components/ClipboardRek.js";
import { DoaUcapan } from "./Components/DoaUcapan.js";
import { Join } from "./Components/JoinScroll.js";
import { Loader } from "./Components/Loader.js";
import { NamaTamu } from "./Components/Params.js";
import { AudioController } from "./Components/PlayAudio.js";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

AudioController.init();
AudioController.bindEvents();

Join();
NamaTamu();
Loader.init();
AnimasiLeaf();
clipboard()
DoaUcapan();


