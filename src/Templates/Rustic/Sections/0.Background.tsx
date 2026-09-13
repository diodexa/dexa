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
    <section className={`relative flex h-screen items-center justify-center overflow-clip  text-center transition-all duration-2000 ease-out  `}
      style={{background: data.theme?.warna1,color: data.theme?.contrasfont,}}>
        <div className=" pointer-events-none z-[1] ">
            <div className={`absolute inset-0   w-full h-full  opacity-80 ${isOpen ? "MunculBawahZoomOutBackground-1" : ""}`}>
                <div className="w-full h-full bg-cover bg-no-repeat bg-center sepia-30"
                style={{ backgroundImage: "url('/Ornament/backgroundRustic.webp')" }} />
            </div>
            <div className="absolute bottom-1/7 left-1/2 -translate-x-1/2  w-full h-[350px]  ">
                <div className={`w-full h-full bg-cover bg-no-repeat bg-center  transition-all    ${isOpen ? "MunculBawahZoomOutBackground-1" : "opacity-0"}`}
                style={{ backgroundImage: "url('/Ornament/RumahJoglo.webp')" }} />
            </div>

            <div className={`absolute bottom-55 -right-90 h-[350px] opacity-81 ${isOpen ? "MunculKananBackground-1" : ""}`}>
                <img src="/Ornament/Pohon2.webp" alt=""
                className="sway-flower2 h-full w-auto object-contain object-right-bottom scale-x-[-1]" />
            </div>

            <div className={`absolute inset-0 z-[1] ${isOpen ? "MunculKananZoomOutBackground-2" : "opacity-0"}`}>

                {/* KANAN */}
                <div className={`absolute bottom-5 -right-10 h-[250px] `}>
                    <img src="/Ornament/DaunDahlia.webp" alt=""
                    className="sway-flower1 h-full w-auto object-contain object-right-bottom scale-x-[-1]" />
                </div>

                <div className={`absolute -bottom-20 right-20 h-[250px] `}>
                    <img src="/Ornament/DaunDahlia.webp"alt=""
                    className="sway-flower1 h-full w-auto object-contain object-right-bottom scale-x-[-1]"/>
                </div>

                

                <div className={`absolute bottom-30 -right-10 h-[200px] `}>
                <img src="/Ornament/DahliaMerah.webp"  alt=""
                    className="sway-flower1 h-full w-auto object-contain object-right-bottom scale-x-[-1]"/>
                </div>

                <div className={`absolute -bottom-20 right-30 h-[200px] -scale-x-100 rotate-90 `}>
                <img src="/Ornament/Dahlia1.webp"
                    className="sway-flower2 h-full w-auto object-contain object-left-bottom"
                    alt="" />
                </div>

                <div className={`absolute bottom-0 -right-7 h-[150px] `}>
                <img src="/Ornament/DahliaCream.webp" alt=""
                    className="sway-flower2 h-full w-auto object-contain object-right-bottom scale-x-[-1] sepia-30"/>
                </div>
            </div>

            <div className={`absolute inset-0 z-[1] ${isOpen ? "MunculKiriZoomOutBackground-2" : "opacity-0"}`}>
                {/* KIRI */}
                        
                <div className={`absolute bottom-5 -left-10 h-[250px] `}>
                <img  src="/Ornament/DaunDahlia.webp" alt=""
                    className="sway-flower2 h-full w-auto object-contain object-left-bottom"/>
                </div>
                <div className="absolute -bottom-20 left-20 h-[250px]">
                <img  src="/Ornament/DaunDahlia.webp" alt=""
                    className="sway-flower h-full w-auto object-contain object-left-bottom"/>
                </div>

                <div className="absolute bottom-30 -left-10 h-[200px]">
                <img src="/Ornament/DahliaMerah.webp" alt=""
                    className="sway-flower h-full w-auto object-contain object-left-bottom"/>
                </div>


                <div className="absolute -bottom-0 -left-7 h-[150px]">
                <img src="/Ornament/DahliaCream.webp" alt=""
                    className="sway-flower1 h-full w-auto object-contain object-left-bottom sepia-30"/>
                </div>
                
            </div>
            <div className={`absolute bottom-50 -left-90 h-[350px] opacity-81  ${isOpen ? "MunculKiriBackground-1" : ""}`}>
                <img src="/Ornament/Pohon1.webp" alt=""
                className="sway-flower2 h-full w-auto object-contain object-right-bottom scale-x-[-1] " />
            </div>
        </div>
        



        
    </section>
        
  );
};

export default Background;
