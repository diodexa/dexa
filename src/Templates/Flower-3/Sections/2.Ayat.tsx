import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
}

const Ayat = ({ data, animate }: Props) => {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-8 py-20 text-center" style={{ color: data.theme?.contrasfont }}>
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[6px]" />

      <div className="pointer-events-none absolute -left-[20%] top-[15%] h-[180px] w-[80%] rounded-full bg-white/60 blur-[35px]" />
      <div className="pointer-events-none absolute -right-[20%] top-[28%] h-[150px] w-[75%] rounded-full bg-white/50 blur-[40px]" />
      <div className="pointer-events-none absolute -left-[15%] bottom-[20%] h-[170px] w-[70%] rounded-full bg-white/50 blur-[45px]" />
      <div className="pointer-events-none absolute -right-[20%] bottom-[10%] h-[190px] w-[80%] rounded-full bg-white/60 blur-[40px]" />

        {/* <div className="absolute -bottom-15 -right-15 z-[1] h-[250px] rotate-30">
          <img src="/Ornament/DaunDahlia.webp"alt=""
            className="sway-flower1  h-full w-auto object-contain object-right-bottom scale-x-[-1]"/>
        </div>
        <div className="absolute -top-15 -left-15 z-[1] h-[250px] rotate-210">
          <img src="/Ornament/DaunDahlia.webp"alt=""
            className="sway-flower1  h-full w-auto object-contain object-right-bottom scale-x-[-1]"/>
        </div> */}
         <div className={`  h-[150px] `}>
            <img src="/Ornament/LilyPink3.webp" alt=""
                className="sway-flower2 h-full w-auto object-contain object-center-bottom scale-x-[-1] "/>
            </div>
 
      <div className={`relative z-[2] flex w-full max-w-[330px] flex-col items-center ${animate ? "Fadein-1 " : "opacity-0"}`}>

        <p className="text-[24px] leading-[2.2]">
            {data.Ayat}
        </p>

        <p className="mt-8 text-[13px] leading-7 ">
          {data.Ayat2}
        </p>

        <div className="mt-7 text-[11px] uppercase tracking-[0.3em] "
          style={{ color: data.theme?.warna3 }}>
          {data.NamaSurat}
        </div>
      </div>
    </section>
  );
};

export default Ayat;