import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  scrollY: number;
}

const Sambutan = ({ data }: Props) => {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-x-clip  text-center "
      style={{background: data.theme?.warna1,color: data.theme?.contrasfont,}}>
        <div>
          <img src="/Ornament/ButterflyBlue.png" alt=""className="absolute left-0 bottom-30 w-auto h-[10%] object-contain butterfly-fly -scale-x-90 z-2"/>
          <img src="/Ornament/ButterflyBlue.png" alt=""className="absolute right-0 bottom-30 w-auto h-[10%] object-contain  butterfly-fly z-2"/>
          <img src="/Ornament/awan2.png" alt=""className="absolute left-20 top-0 w-auto h-[40%] object-contain "/>


          <div className="absolute bottom-0 -left-30 w-full h-[200px] rotate-45">
            <div className="sway-flower w-full h-full"
            style={{ backgroundImage: "url('/Ornament/sun5.png')" }}/>
          </div>
          <div className="absolute bottom-0 -right-32 w-full h-[200px] -rotate-45">
            <div className="sway-flower w-full h-full"
            style={{ backgroundImage: "url('/Ornament/sun5.png')" }}/>
          </div>
      
          

        </div>
        
           <div className=" flex flex-col items-center justify-center px-5 font-LoveFlorida">
            <p className=" text-xl uppercase tracking-[0.4em]  ">
              {data.Salam}
            </p>

            <p className="mt-5 tracking-[0.1em] leading-7  ">
              {data.Sambutan}
            </p>

            <div className="mt-8 font-BetterChill text-5xl" 
            style={{color:data.theme?.warna3}}>
              {data.NamabridePanggilan}
              <span className="mx-2 italic">&</span>
              {data.NamagroomPanggilan}
            </div>
           
        </div>
    </section>
  );
};

export default Sambutan;
