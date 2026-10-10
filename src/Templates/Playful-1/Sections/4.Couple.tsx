import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
}

const Couple = ({ data, animate }: Props) => {
  return (
    <section className="relative flex flex-col min-h-screen w-full items-center justify-center overflow-hidden px-6 text-center" style={{ color: data.theme?.contrasfont, background: data.theme?.warnaweddingInvitation }}>


      <div className="relative z-10 w-full max-w-[350px] py-16">
        {/* JUDUL */}
        <div className={`${animate ? "MunculBawah-1" : "opacity-0"}`}>
          <p className="rotate-[-2deg] font-KH-Blackline text-4xl" style={{ color: data.theme?.warna3 }}>Bride & Groom</p>
          <div className="mx-auto mt-2 h-[2px] w-24 rotate-[-2deg]" style={{ background: data.theme?.warna2 }} />
          <p className="mt-2 text-sm">{data.Sambutan}</p>
        </div>

        {/* SCRAPBOOK */}
        <div className="relative mt-10 w-full">
          {/* BRIDE */}
          <div className={`flex items-center justify-center gap-3 ${animate ? "MunculKiri-1" : "opacity-0"}`}>
            {/* FOTO BRIDE */}
            <div className="relative w-[180px] shrink-0 rotate-[-6deg]">
              <div className="absolute -top-4 left-1/2 z-20 h-8 w-20 -translate-x-1/2 rotate-[-4deg] opacity-80" style={{ background: data.theme?.warna1 }} />
              <div className="relative bg-white p-2  shadow-[2px_8px_15px_rgba(0,0,0,0.12)]">
                <div className="h-[220px] overflow-hidden">
                  <img src={data.FotoBride} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex items-start justify-start flex-col gap-1 mt-2">
                {data.AkunIGWanita && (
                    <a href={`https://instagram.com/${data.AkunIGWanita}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-1">
                      <i className="fa-brands fa-instagram "></i> 
                      {data.AkunIGWanita}
                    </a>
                  )}
                    {data.AkunTikTokWanita && (
                        <a href={`https://tiktok.com/@${data.AkunTikTokWanita}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end ">
                            <i className="fa-brands fa-tiktok "></i> 
                            {data.AkunTikTokWanita}
                        </a>
                    )}
                </div>
              </div>
              <span className="absolute -bottom-7 -left-2 rotate-[-8deg] text-[11px]" style={{ color: data.theme?.warna3 }}>the bride ♡</span>
            </div>

            {/* CATATAN BRIDE */}
            <div className="relative w-[125px] -right-3  rotate-[4deg] text-left">
              <p className=" mb-3 font-KH-Blackline text-3xl" style={{ color: data.theme?.warna3 }}>{data.Namabride} </p>
              <div className="relative bg-white/70 px-3 py-3 shadow-sm">
                <span className="absolute -top-3 right-2 rotate-[10deg] text-xl" style={{ color: data.theme?.warna3 }}>♡</span>
                <p className="font-KH-Blackline text-sm" style={{ color: data.theme?.warna3 }}>{data.Putri}</p>
                <p className="mt-1 text-sm leading-4">{data.BapakpengantinWanita}</p>
                <p className="text-sm">&amp;</p>
                <p className="text-sm leading-4">{data.IbupengantinWanita}</p>
              </div>
              
            </div>
          </div>

          {/* AMPERSAND */}
          <div className={`my-7 font-KH-Blackline text-5xl ${animate ? "MunculBawah-1" : "opacity-0"}`} style={{ color: data.theme?.warna3 }}>
            &amp;
          </div>

          {/* GROOM */}
          <div className={`flex items-center justify-center gap-3 ${animate ? "MunculKanan-1" : "opacity-0"}`}>
            {/* CATATAN GROOM */}
            <div className="relative w-[125px] -left-3 rotate-[-4deg] text-left">
              <p className=" mb-3  font-KH-Blackline text-3xl" style={{ color: data.theme?.warna3 }}>{data.Namagroom} </p>
              <div className="relative bg-white/70 px-3 py-3 shadow-sm">
                <span className="absolute -top-3 left-2 rotate-[-10deg] text-xl" style={{ color: data.theme?.warna2 }}>✦</span>
                <p className="font-KH-Blackline text-sm" style={{ color: data.theme?.warna2 }}>{data.Putra}</p>
                <p className="mt-1 text-sm leading-4">{data.BapakpengantinPria}</p>
                <p className="text-sm">&amp;</p>
                <p className="text-sm leading-4">{data.IbupengantinPria}</p>
              </div>
              
            </div>

            {/* FOTO GROOM */}
            <div className="relative w-[180px] shrink-0 rotate-[6deg]">
              <div className="absolute -top-4 left-1/2 z-20 h-8 w-20 -translate-x-1/2 rotate-[5deg] opacity-80" style={{ background: data.theme?.warna2 }} />
              <div className="relative bg-white p-2  shadow-[2px_8px_15px_rgba(0,0,0,0.12)]">
                <div className="h-[220px] overflow-hidden">
                  <img src={data.FotoGroom} alt="" className="h-full w-full object-cover" />
                  
                </div>
                <div className="flex items-start justify-start flex-col gap-1 mt-2">
                  {data.AkunIGPria && (
                    <a href={`https://instagram.com/${data.AkunIGPria}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-1">
                      <i className="fa-brands fa-instagram "></i> 
                      {data.AkunIGPria}
                    </a>
                  )}
                    {data.AkunTikTokPria && (
                        <a href={`https://tiktok.com/@${data.AkunTikTokPria}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end ">
                            <i className="fa-brands fa-tiktok "></i> 
                            {data.AkunTikTokPria}
                        </a>
                    )}
                </div>
              </div>
              <span className="absolute -bottom-7 right-0 rotate-[5deg] text-[11px]" style={{ color: data.theme?.warna2 }}>the groom ✦</span>
            </div>
          </div>
        </div>

       <div className={`absolute -right-8 top-1/2 z-[1] h-[100px] ${animate ? "MunculKanan-1" : "opacity-0"}`} >
        <img  src="/Ornament/doodleMerpati.webp"  alt=""
          className=" h-full w-auto scale-x-[-1] object-contain object-center"/>
      </div>
       <div className={`absolute -left-0 bottom-0 z-[1] h-[100px] ${animate ? "MunculKiri-1" : "opacity-0"}`} >
        <img  src="/Ornament/doodleFlower2.webp"  alt=""
          className=" h-full w-auto scale-x-[-1] object-contain object-center"/>
      </div>
      
      </div>
        <p className="my-5 font-KH-Blackline text-sm opacity-60">Dan selamanya dimulai dari sini ♡</p>
    </section>
  );
};

export default Couple;