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
                style={{ backgroundImage: "url('/Ornament/PatternJawa.webp')" }} />
            </div>
            <div className={`absolute bottom-20 right-0 grayscale  ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img src="/Ornament/RumahJoglo.webp"alt=""
                className="h-full w-auto object-contain object-center-bottom "/>
            </div>
            <div className={`absolute -top-0 left-1/2 -translate-x-1/2 grayscale h-1/2 w-screen ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img src="/Ornament/Gobyok.webp"alt=""
                className="absolute left-1/2 top-0 w-full max-w-none -translate-x-1/2 scale-[1.3] origin-top lg:scale-[0.4]"/>
            </div>
           

            <div className={`absolute bottom-40 -right-15 grayscale ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img  src="/Ornament/WayangLaki.webp" alt=""
                className="sway-flower h-full w-auto object-contain object-left-bottom "/>
            </div>
            <div className={`absolute bottom-40 -left-15 grayscale ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img  src="/Ornament/WayangPerempuan.webp" alt=""
                className="sway-flower h-full w-auto object-contain object-left-bottom "/>
            </div>
            <div className={`absolute bottom-40 -left-15 ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img  src="/Ornament/Janur.webp" alt=""
                className="sway-flower2 h-full w-auto object-contain object-left-bottom "/>
            </div>
            <div className={`absolute bottom-40 -right-15 ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img  src="/Ornament/Janur.webp" alt=""
                className="sway-flower h-full w-auto object-contain object-left-bottom scale-x-[-1] "/>
            </div>

            <div className={`absolute -bottom-10 right-15 h-[150px]   ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
            <img src="/Ornament/BungaJawa2.webp"
                className="sway-flower2 h-full w-auto object-contain object-left-bottom"
                alt="" />
            </div>

            <div className={`absolute -bottom-5 -right-25 h-[300px] ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
            <img src="/Ornament/BungaJawa1.webp" alt=""
                className="sway-flower2 h-full w-auto object-contain object-right-bottom scale-x-[-1]"/>
            </div>

     


            <div className={`absolute -bottom-5 -left-20 h-[300px] ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <img src="/Ornament/BungaJawa1.webp" alt=""
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
