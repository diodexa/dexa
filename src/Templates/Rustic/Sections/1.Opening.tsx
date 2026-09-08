import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;

  isOpen : boolean
}

const Opening = ({ data }: Props) => {
  return (
    <section className={`relative flex h-screen items-center justify-center overflow-x-clip  text-center transition-all duration-2000 ease-out  `}
      style={{background: data.theme?.warna1,color: data.theme?.contrasfont,}}>
        <div className=" pointer-events-none">
            <div className="absolute inset-0   w-full h-full border opacity-80 ">
                <div className="w-full h-full bg-cover bg-no-repeat bg-center "
                style={{ backgroundImage: "url('/Ornament/backgroundRustic.webp')" }} />
            </div>
            <div className="absolute bottom-1/6 left-1/2 -translate-x-1/2  w-full h-[150px] border ">
                <div className="w-full h-full bg-contain bg-no-repeat bg-center "
                style={{ backgroundImage: "url('/Ornament/RumahJogloIjo.webp')" }} />
            </div>

            <div className="absolute bottom-55 -right-80 h-[350px] opacity-81">
                <img src="/Ornament/Pohon2.webp" alt=""
                className="sway-flower2 h-full w-auto object-contain object-right-bottom scale-x-[-1]" />
            </div>
            <div className="absolute -top-20 -right-60 h-[250px] opacity-81">
                <img src="/Ornament/Pohon1.webp" alt=""
                className="sway-flower2 h-full w-auto object-contain object-right-bottom scale-x-[-1]" />
            </div>

            <div className="absolute bottom-50 -left-80 h-[350px] opacity-81 -scale-x-100">
                <img src="/Ornament/Pohon1.webp" alt=""
                className="sway-flower2 h-full w-auto object-contain object-right-bottom scale-x-[-1]" />
            </div>
            <div className="absolute -top-20 -left-50 h-[250px] opacity-81 -scale-x-100">
                <img src="/Ornament/Pohon2.webp" alt=""
                className="sway-flower2 h-full w-auto object-contain object-right-bottom scale-x-[-1]"/>
            </div>



            {/* KANAN */}
            <div className="absolute bottom-0 -right-10 h-[250px]">
                <img src="/Ornament/DaunDahlia.webp" alt=""
                className="sway-flower1 h-full w-auto object-contain object-right-bottom scale-x-[-1]" />
            </div>

            <div className="absolute -bottom-20 right-20 h-[250px]">
                <img src="/Ornament/DaunDahlia.webp"alt=""
                className="sway-flower1 h-full w-auto object-contain object-right-bottom scale-x-[-1]"/>
            </div>

            

            <div className="absolute bottom-30 -right-10 h-[200px]">
            <img src="/Ornament/DahliaMerah.webp"  alt=""
                className="sway-flower1 h-full w-auto object-contain object-right-bottom scale-x-[-1]"/>
            </div>

            <div className="absolute -bottom-20 right-30 h-[200px] -scale-x-100 rotate-90">
            <img src="/Ornament/Dahlia1.webp"
                className="sway-flower2 h-full w-auto object-contain object-left-bottom"
                alt="" />
            </div>

            <div className="absolute -bottom-5 -right-7 h-[150px]">
            <img src="/Ornament/DahliaCream.webp" alt=""
                className="sway-flower2 h-full w-auto object-contain object-right-bottom scale-x-[-1]"/>
            </div>

            {/* KIRI */}
                    
            <div className="absolute bottom-0 -left-10 h-[250px]">
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

        

            <div className="absolute -bottom-5 -left-7 h-[150px]">
            <img src="/Ornament/DahliaCream.webp" alt=""
                className="sway-flower1 h-full w-auto object-contain object-left-bottom"/>
            </div>
        </div>



        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[600px] bg-black/40 [clip-path:ellipse(80%_60%_at_50%_70%)]" />
        </div>
        
           <div className={` flex flex-col items-center justify-center px-5  transition-all duration-6000 ease-out `}>
            <p className=" text-xl uppercase font-Cenova  ">
              {data.Salam}
            </p>

            <p className="mt-5 tracking-[0.1em] leading-7  ">
              {data.Sambutan}
            </p>

            <div className="mt-8 font-BylinerScript text-5xl" 
            style={{color:data.theme?.warna3}}>
              {data.NamabridePanggilan}
              <span className="mx-2 italic">&</span>
              {data.NamagroomPanggilan}
            </div>
           
        </div>
    </section>
  );
};

export default Opening;
