import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean
}

const Sambutan = ({ data, animate }: Props) => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-8 text-center "
    style={{color: data.theme?.contrasfont, }} >

      <div className="absolute w-screen h-screen inset-0 backdrop-blur-xs opacity-80"
      style={{ background: data.theme?.warna1 }}/>

        
      <div className="absolute -bottom-30 -left-40 z-[1] w-full  scale-x-[-1] ">
        <img src="/Ornament/LilyWhite.webp"alt=""
          className="h-full w-auto object-contain object-bottom sway-flower1"/>
      </div>
      <div className="absolute -bottom-30 -right-40 z-[1] w-full  ">
        <img src="/Ornament/LilyWhite.webp"alt=""
          className="h-full w-auto object-contain object-bottom sway-flower2"/>
      </div>
      <div className="relative mx-auto w-full max-w-md" style={{ aspectRatio: "400 / 680" }}>
 

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-[15%] text-center">
        <p className={`text-sm uppercase tracking-[0.1em] ${animate ? "MunculBawah-1 " : "opacity-0"}`}>
          {data.Salam}
        </p>
        <div className="my-6 h-[1px] w-[80%]" style={{ backgroundColor: data.theme?.warna2 }} />
        <p className={`text-[13px] leading-7 ${animate ? "MunculAtas-1 " : "opacity-0"}`}>
          {data.Sambutan}
        </p>
        <div className={`mt-8 text-3xl ${animate ? "MunculBawah-1 " : "opacity-0"}`}>
          <span className="font-Tempting">{data.NamabridePanggilan.charAt(0)}</span>
          <span className="text-xl"> & </span>
          <span className="font-Tempting">{data.NamagroomPanggilan.charAt(0)}</span>
        </div>
      </div>
    </div>
        
        {/* <div className="absolute inset-0 backdrop-blur-[8px] transition-all duration-300" /> */}
       
   
    </section>
  );
};

export default Sambutan;
