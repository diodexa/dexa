import { AudioController } from "./PlayAudio.js";


export const Join = () => {

    document.getElementById("btnJoin").addEventListener("click", () => {
        const btnJoin = document.getElementById("btnJoin");
        const joinSection = document.getElementById("join");
        const judul = document.querySelector(".judul");
    
     gsap.fromTo(".judul",
      { opacity: 0, y: 20, rotate: -20, scale: 0.2 },
      { opacity: 1, y: 0, rotate: 0, scale:1, duration: 4, delay: 0.5, ease: "power2.out" }
    );
      
    gsap.to(joinSection, {
    duration: 1,
    y:-100,
    opacity: 0,
    
    onComplete: () => {
        joinSection.classList.add("hidden"); 
        
    }
    });
    
    AudioController.play();
    
    // Join()

    window.scrollTo({
    top: 0,
    
    })
});
}