import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;

  isOpen : boolean
}

const Background = ({ data, isOpen }: Props) => {

    // const [scrollProgress, setScrollProgress] = useState(0);

    // useEffect(() => {
    // const handleScroll = () => {
    //     const scrollY = window.scrollY;

    //     const progress = Math.min(
    //     Math.max(scrollY / 300, 0),
    //     1
    //     );

    //     setScrollProgress(progress);
    // };

    // window.addEventListener("scroll", handleScroll);

    // return () => window.removeEventListener("scroll", handleScroll);
    // }, []);
  return (
    <section className={`relative flex h-screen items-start justify-center overflow-clip  text-center transition-all duration-2000 ease-out  `}
      style={{background: data.theme?.warna1 ,color: data.theme?.contrasfont,}}>
        <div className=" pointer-events-none ">
            <div className={`absolute inset-0   w-full h-full  ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`} >
                <div className="w-full h-full bg-cover bg-no-repeat bg-center "
                style={{ backgroundImage: "url('/Ornament/BackgroundLampung.webp')" }} />
            </div>
     
           
            <div className={`absolute -top-10 -left-45 ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img  src="/Ornament/Pohon3.webp" alt=""
                className="sway-flower2 h-full w-auto object-contain object-left-bottom "/>
            </div>
            <div className={`absolute -top-10 -right-45 ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img  src="/Ornament/Pohon3.webp" alt=""
                className="sway-flower h-full w-auto object-contain object-left-bottom "/>
            </div>


            <div className={`absolute bottom-20 -right-65  ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img  src="/Ornament/PohonPisang.webp" alt=""
                className="sway-flower h-full w-auto object-contain object-left-bottom scale-x-[-1] "/>
            </div>
            <div className={`absolute bottom-20 -left-65  ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img  src="/Ornament/PohonPisang.webp" alt=""
                className="sway-flower h-full w-auto object-contain object-left-bottom "/>
            </div>

           

     


         
            <div className={`absolute -bottom-3 -left-7  ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img src="/Ornament/BungaMerah1.webp" alt=""
                className="sway-flower1 h-full w-auto object-contain object-left-bottom "/>
            </div>
            
            <div className={`absolute bottom-10 right-15 h-[100px]  ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img src="/Ornament/BungaMerah4.webp" alt=""
                className="sway-flower1 h-full w-auto object-contain object-left-bottom scale-x-[-1]"/>
            </div>
            <div className={`absolute -bottom-0 -right-10 h-[200px]  ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img src="/Ornament/BungaMerah2.webp" alt=""
                className="sway-flower1 h-full w-auto object-contain object-left-bottom "/>
            </div>
            <div className={`absolute -bottom-10 -right-10 h-[200px]  ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img src="/Ornament/BungaMerah3.webp" alt=""
                className="sway-flower1 h-full w-auto object-contain object-left-bottom "/>
            </div>
            <div className={`absolute -bottom-10 right-15 h-[150px]  ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img src="/Ornament/BungaMerah4.webp" alt=""
                className="sway-flower1 h-full w-auto object-contain object-left-bottom "/>
            </div>

            {/* <div className={`absolute top-0 -left-30 h-[350px] opacity-81  ${isOpen ? "MunculKiriBackground-1" : ""}`}>
                <img src="/Ornament/PohonWepping.webp" alt=""
                className="sway-flower2 h-full w-auto object-contain object-right-bottom  " />
            </div>
            <div className={`absolute top-20 -right-45 h-[350px] opacity-81 rotate-350  ${isOpen ? "MunculKananBackground-1" : ""}`}>
                <img src="/Ornament/PohonWepping.webp" alt=""
                className="sway-flower2 h-full w-auto object-contain object-right-bottom  " />
            </div> */}
        </div>


        
    </section>
        
  );
};

export default Background;
