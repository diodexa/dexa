import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean
}

const Sambutan = ({ data, animate }: Props) => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-8 text-center" style={{ color: data.theme?.contrasfont }}>
     <div className="absolute inset-0 blur-lg bg-transparent "
        style={{ background: data.theme?.warna1, }}/>

        
      <div className="relative h-screen flex w-full  flex-col items-center justify-center overflow-hidden">

        <div className="absolute -bottom-0 -right-20 z-[1] w-auto h-[250px]">
          <img src="/Ornament/RumahJoglomiring.webp"alt=""
            className="h-full w-auto object-contain object-right-bottom opacity-80"/>
        </div>
        
        {/* <div className="absolute inset-0 backdrop-blur-[8px] transition-all duration-300" /> */}
        <div className="z-10 flex flex-col items-center mt-7">
            <p className={`text-sm uppercase tracking-[0.1em] ${animate ? "MunculBawah-1 " : "opacity-0"}`}  style={{ color: data.theme?.warna3 }}>{data.Salam}</p>
            <div className="my-6 h-[1px] w-[80%]" style={{ backgroundColor: data.theme?.warna3 }} />
            <p className={`text-[13px] leading-7  ${animate ? "MunculAtas-1 " : "opacity-0"}`} >
            {data.Sambutan}
            </p>
            <div className={`mt-8 font-Tempting text-3xl  ${animate ? "MunculBawah-1 " : "opacity-0"}`} style={{ color: data.theme?.warna3 }}>
              {data.NamabridePanggilan.charAt(0)}
              <span className="mx-2 italic">&</span>
              {data.NamagroomPanggilan.charAt(0)}
            </div>
        </div>
       
      </div>
    </section>
  );
};

export default Sambutan;
