import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
  scrollY: number;
}

const Couple = ({ data, animate, scrollY }: Props) => {
  return (
    <section className="relative flex flex-col min-h-screen w-full items-center justify-center overflow-hidden px-5 text-center" style={{ color: data.theme?.contrasfont }}>
        <div className="absolute inset-0 h-full w-full  opacity-80" style={{ background: `linear-gradient(180deg, ${data.theme?.warna1} 0%, ${data.theme?.warna1} 35%, ${data.theme?.warna2} 65%, ${data.theme?.warna2} 100%)` }} />
        <div className="absolute left-1/2 top-0 z-[1] aspect-[2/1] w-full -translate-x-1/2">
          <div className="h-full w-full bg-contain bg-top bg-no-repeat" style={{ backgroundImage: "url('/Ornament/LacePinkHijau.webp')" }} />
        </div>
  
        <p className={`text-[10px] uppercase tracking-[0.4em] ${animate ? "Fadein-1" : "opacity-0"}`}>The Happy Couple</p>
            
            {/* <div className="absolute -right-18 -top-10 flex h-[160px] w-auto pointer-events-none" style={{ borderColor: `${data.theme?.warna3}80`, color: data.theme?.warna3 }}>
                <img src="/Ornament/BungaPinkTunggal2.webp" alt="" className="h-full w-auto object-contain opacity-80"/>
            </div> */}
            
            <div className="mb-5 mt-4">
                <p className="text-[9px] uppercase tracking-[0.35em]" >Together With</p>
                <p className="mt-1  text-xl " style={{ color: data.theme?.warna3 }}>Love & Happiness</p>
            </div>
            <div className="mt-2 flex w-full flex-col items-center gap-8">
  {/* BRIDE */}
  <div className={`flex w-full flex-col items-center ${animate ? "MunculKiri-1" : "opacity-0"}`}>
    <div className="relative w-[80%]">
  {/* FOTO DIBENTUK SEPERTI PINTU */}
  <div className="relative h-[310px] w-auto overflow-hidden [clip-path:polygon(18%_100%,18%_25%,25%_12%,50%_5%,75%_12%,82%_25%,82%_100%)]">
    <img src={data.FotoBride} alt="" className="h-full w-full object-contain grayscale" />
  </div>

  {/* ORNAMEN PINTU */}
  <div className="pointer-events-none absolute  h-[105%] w-[105%]  -top-15 -left-2 z-10">
    <img src="/Ornament/BingkaiJawa.webp" alt="" className="object-contain" />
  </div>
</div>

    <div className="mt-4 text-center">
      <p className="text-xl" style={{ color: data.theme?.warna3 }}>
        {data.Namabride}{data.GelarBride && <span className="ml-1 text-sm">{data.GelarBride}</span>}
      </p>
      <div className="mt-2 text-[10px] leading-5">
        <p style={{ color: data.theme?.warna3 }}>Daughter of</p>
        <p>{data.Putri}</p>
        <p>{data.BapakpengantinWanita}</p>
        <p>&amp;</p>
        <p>{data.IbupengantinWanita}</p>
      </div>
    </div>
  </div>

  {/* PEMISAH */}
  <div className="flex items-center gap-3">
    <div className="h-px w-10" style={{ backgroundColor: `${data.theme?.warna3}50` }} />
    <span className="text-sm" style={{ color: data.theme?.warna3 }}>&amp;</span>
    <div className="h-px w-10" style={{ backgroundColor: `${data.theme?.warna3}50` }} />
  </div>

  {/* GROOM */}
  <div className={`flex w-full flex-col items-center ${animate ? "MunculKanan-1" : "opacity-0"}`}>
    <div className="relative w-[80%]">
  {/* FOTO DIBENTUK SEPERTI PINTU */}
  <div className="relative h-[310px] w-auto overflow-hidden [clip-path:polygon(18%_100%,18%_25%,25%_12%,50%_5%,75%_12%,82%_25%,82%_100%)]">
    <img src={data.FotoGroom} alt="" className="h-full w-full object-contain grayscale" />
  </div>

  {/* ORNAMEN PINTU */}
  <div className="pointer-events-none absolute  h-[105%] w-[105%]  -top-15 -left-2 z-10">
    <img src="/Ornament/BingkaiJawa.webp" alt="" className="object-contain" />
  </div>
</div>

    <div className="mt-4 text-center">
      <p className="text-xl" style={{ color: data.theme?.warna3 }}>
        {data.Namagroom}{data.GelarGroom && <span className="ml-1 text-sm">{data.GelarGroom}</span>}
      </p>
      <div className="mt-2 text-[10px] leading-5">
        <p style={{ color: data.theme?.warna3 }}>Son of</p>
        <p>{data.Putra}</p>
        <p>{data.BapakpengantinPria}</p>
        <p>&amp;</p>
        <p>{data.IbupengantinPria}</p>
      </div>
    </div>
  </div>
</div>
            <div className="mt-6 flex items-center justify-between text-[7px] uppercase tracking-[0.2em] opacity-60">
                <span>Our Story</span>
                <span>With Love</span>
                <span>Forever</span>
            </div>
           
    

        
        <div className={`absolute top-10 -right-30 h-[350px] opacity-81  `}>
            <img src="/Ornament/PohonWepping.webp" alt=""
            className="sway-flower2 h-full w-auto object-contain object-right-bottom  scale-x-[-1]" />
        </div>
        <div className={`absolute -bottom-20 -left-50 h-[400px] opacity-81  `}>
            <img src="/Ornament/PohonSakura.webp" alt=""
            className="sway-flower2 h-full w-auto object-contain object-right-bottom  " />
        </div>
    </section>
  );
};

export default Couple;
