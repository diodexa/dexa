
export const AnimasiLeaf = () => {
    
const gambar1 = document.getElementById ('gambar1');
const gambar2 = document.getElementById ('gambar2');
const gambar3 = document.getElementById ('gambar3');
const gambar4 = document.getElementById ('gambar4');
const gambar5 = document.getElementById ('gambar5');
const gambar6 = document.getElementById ('gambar6');
const kiri = document.querySelectorAll ('.kiri');
const kanan = document.querySelectorAll ('.kanan');



const scrollPositions = [648, 1108, 0, 1568, 3330 ];

document.querySelectorAll('.bottom-nav a').forEach((link, i) => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetScroll = scrollPositions[i]; 
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  });
});


gsap.to(["dotlottie-wc", ".judul1"], {
  opacity: 0,
  y:100,
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".page",     
    start: "top top",   
    end: "100 top",      
    scrub: true,         
  }
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page",
    start: "top top",  
    end: "bottom top",     
    scrub: true, 
    pin:true,
             
    // markers: true,  
    onUpdate: (self) => {
        const absoluteScroll = self.scroll();
        console.log(`Posisi Scroll (px): ${absoluteScroll}`);
           
}    
  },
});


tl.fromTo(
  gambar1,
  { y:"60%", opacity: 0, scale: 3 },
  { opacity: 1, scale: 1,}
);

tl.fromTo("#text1", 
  { scale:2}, 
  { scale:1, opacity: 1, duration: 1 },
  "<" 
);

//////////////////////////gambar2//////////////////////////////////
tl.to(
  gambar1,
  { x: "-20%", scale: 0.8, filter: "blur(5px)", duration:1 }
);


tl.fromTo(
  gambar2,
  { y:"80%", x:"150%",  scale:2},
  { x:"20%", opacity:1, scale:1.2,duration:1},
  "<" 
);

tl.to("#text1", 
   { x: "-20%", opacity:0, filter: "blur(5px)", duration:1 },
  "<" 
);
tl.fromTo("#text2", 
  { x: "100%"}, 
  { x:0, opacity: 1, duration: 1 },
  "<" 
);

/////////////////////////gambar3///////////////////////////////////
tl.to(
  [gambar1],
  { x: "5%",  filter: "blur(10px)", scale:0.6, duration:1 }
);

tl.to(
  [gambar2],
  { x: "40%",  filter: "blur(5px)", scale:1, duration:1 }, "<"
);


tl.fromTo(
  gambar3,
  { y:"50%",x:"-150%", scale:1.5},
  { x:"-30%", opacity:1, scale:1.2,duration:1},
  "<" 
);

tl.to("#text2", 
   { x: "80%", scale:0.8, opacity:0, filter: "blur(5px)", duration:1 },
  "<" 
);
tl.fromTo(["#text3", "#bride"], 
  { x: "-50%", scale:1.5}, 
  { x:0, opacity: 1, scale:1,pointerEvents: "auto", duration: 1 },
  "<" 
);
////////////////////////////gambar4////////////////////////////////

tl.to(
  [gambar3],
  { x: "-30%",   filter: "blur(10px)", scale:0.8, duration:1 }
);


tl.to(
  [gambar2],
  { x: "10%", filter: "blur(15px)", scale:0.8, duration:1 }, "<"
);

tl.to(
  [gambar1],
  { x: "-10%",  filter: "blur(20px)", scale:0.4, duration:1 }, "<"
);

tl.fromTo(
    gambar4,
    { y:"50%",x:"150%", scale:2},
    { x: "20%", opacity:1, scale:1,duration:1},
    "<" 
);

tl.to(["#text3", "#bride"], 
   { x: "-70%", opacity:0, scale:0.5, filter: "blur(5px)",pointerEvents: "none", duration:1 },
  "<" 
);
tl.fromTo(["#text4", "#groom"], 
  { x: "100%", pointerEvents: "none",  scale:2}, 
  { x:0, opacity: 1, scale:1,pointerEvents: "auto", duration: 1 },
  "<" 
);
////////////////////////////gambar5////////////////////////////////
tl.to(
  [gambar4],
  { x: "35%",   filter: "blur(10px)", scale:0.7, duration:1 }
);


tl.to(
  [gambar3],
  { x: "-15%", filter: "blur(15px)", scale:0.5, duration:1 }, "<"
);

tl.to(
  [gambar2],
  { x: "20%",  filter: "blur(20px)", scale:0.5, duration:1 }, "<"
);
tl.to(
  [gambar1],
  { x: "5%",  filter: "blur(25px)", scale:0.3, duration:1 }, "<"
);

tl.fromTo(
    gambar5,
    { y:"60%",x:"-130%", scale:1.5},
    { x: "-30%", opacity:1, scale:1,duration:1},
    "<" 
);

tl.to(["#text4", "#groom"], 
   { x: "50%", scale:0.7, opacity:0, pointerEvents: "none", filter: "blur(5px)", duration:1 },
  "<" 
);
tl.fromTo("#text5", 
  { x: "-50%",scale:1.5}, 
  { x:0, opacity: 1, scale:1, pointerEvents: "auto", duration: 1 },
  "<" 
);

///////////////////////////////gambar6////////////////////////////////////

tl.to(
  [gambar5],
  { x: "-50%",   filter: "blur(10px)", scale:0.8, duration:1 }
);

tl.to(
  [gambar4],
  { x: "5%", filter: "blur(15px)", scale:0.5, duration:1 }, "<"
);

tl.to(
  [gambar3],
  { x: "-30%", opacity: 0.5,  filter: "blur(20px)", scale:0.4, duration:1 }, "<"
);

tl.to(
  [gambar2],
  { x: "0",  opacity: 0.5,  scale:0.3, duration: 1 }, "<"
);
tl.to(
  [gambar1],
  { x: "-10%",  opacity: 0.5, scale:0.2, duration: 1 }, "<"
);

// tl.to([gambar1,gambar2],
//   { opacity: 0, pointerEvents: "none", duration: 1 },
//   "<"
// );


tl.fromTo(
    gambar6,
    { y:"80%",x:"130%", scale:2},
    {  x: "20%", opacity:1, scale:1, duration:1},
    "<" 
);

tl.to("#text5", 
   { x: "-35%", scale:0.8, opacity:0, pointerEvents: "none", filter: "blur(5px)", duration:1 },
  "<" 
);
tl.fromTo("#text6", 
  { x: "50%", scale:1.5}, 
  { x:0, opacity: 1, scale:1, duration: 1 },
  "<" 
);



tl.to([ gambar1, gambar2,gambar3,gambar4,gambar5,gambar6],
  { opacity: 0, filter: "blur(10px)", pointerEvents: "none", duration: 1 }
);


tl.to("#text6", 
   {  scale:0.9, opacity:0, filter: "blur(5px)", duration:1 },
  "<" 
);

// =====================================================

tl.fromTo("#text7", 
  { opacity:0,pointerEvents: "none"}, 
  {  opacity:1,pointerEvents: "auto", duration: 1 },
  "<" 
);
tl.fromTo(kiri, 
  { x: "-100%", opacity:0}, 
  { x:0,   opacity:1, duration: 1 },
  "<" 
);
tl.fromTo(kanan, 
  { x: "100%", opacity:0}, 
  { x:0, opacity:1, duration: 1 },
  "<" 
);
tl.fromTo("#tulisan", 
  { y: "-100%", opacity:0}, 
  { y:0, opacity:1, duration: 1 },
  "<" 
);
}