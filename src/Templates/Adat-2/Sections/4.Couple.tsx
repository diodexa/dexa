import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
  scrollY: number;
}

const Couple = ({ data, animate, scrollY }: Props) => {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5 text-center" style={{ color: data.theme?.contrasfont }}>
      <div className="absolute inset-0 h-full w-full backdrop-blur-xs opacity-50" style={{ background: data.theme?.warna1 }} />

      {/* MOTIF LAMPUNG */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-[1] h-[90px] w-full -translate-x-1/2 overflow-hidden">
        <div className="h-full w-full bg-top bg-repeat-x" style={{ backgroundImage: "url('/Ornament/MotifLampung.webp')", backgroundSize: "auto 100%", backgroundPositionX: `${-scrollY * 0.5}px` }} />
      </div>

      {/* TITLE */}
      <p className={`relative z-[2] mt-36 mb-8 text-3xl uppercase tracking-[0.2em] ${animate ? "Fadein-1" : "opacity-0"}`} style={{ color: data.theme?.warna3 }}>
        Bride & Groom
      </p>

      {/* CARD */}
      <div className="relative z-[2] w-[86%] max-w-md mb-5 rounded-[55px] px-5 py-10 border" style={{ background: data.theme?.warna1, border:`1px solid ${data.theme?.warna3}` }}>

        {/* BRIDE */}
        <div className={`flex flex-col items-center ${animate ? "MunculKiri-1" : "opacity-0"}`}>
          <div className="relative flex h-[250px] w-[150px] items-center justify-center">
            <div className="absolute -right-12 -top-8 h-[125px]">
              <img src="/Ornament/BungaMerah4.webp" alt="" className="h-full w-auto -rotate-0 scale-x-[-1] object-contain" />
            </div>

            <div className="relative h-[235px] w-[140px] overflow-hidden rounded-[70px]">
              <img src={data.FotoBride} alt="" className="h-full w-full object-cover" />
            </div>

            <div className="absolute -bottom-2 -left-1 h-[85px]">
              <img src="/Ornament/BungaMerah2.webp" alt="" className="h-full w-auto -rotate-40  object-contain" />
            </div>
          </div>

          <div className="mt-6">
            <p className="font-Tempting text-3xl" style={{ color: data.theme?.warna3 }}>
              {data.Namabride}
              {data.GelarBride && <span className="ml-1 text-sm">{data.GelarBride}</span>}
            </p>
            <div className="mt-3 text-sm leading-5">
              <p>{data.Putri}</p>
              <p>{data.BapakpengantinWanita}</p>
              <p>&amp;</p>
              <p>{data.IbupengantinWanita}</p>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              {data.AkunIGWanita && (
              <div className="flex items-center justify-center text-xs ">
                  <a href={`https://instagram.com/${data.AkunIGWanita}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-1 p-1 border rounded-full"
                  style={{background:data.theme?.warnaButtonBackground, color:data.theme?.warnaButtonBorder}}>
                      <i className="fa-brands fa-instagram "></i> 
                      
                  </a>
              </div>)}
              {data.AkunTikTokWanita && (
              <div className="flex items-center justify-center text-xs">
                  <a href={`https://tiktok.com/@${data.AkunTikTokWanita}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end p-1 border rounded-full"
                  style={{background:data.theme?.warnaButtonBackground, color:data.theme?.warnaButtonBorder}}>
                      <i className="fa-brands fa-tiktok "></i>
                  </a>
              </div>
              )}
          </div>
          </div>
        </div>

        {/* PEMISAH */}
        <div className="my-8 flex items-center justify-center gap-4">
          <span className="h-px w-12 opacity-50" style={{ background: data.theme?.warna3 }} />
          <span className="font-Tempting text-5xl" style={{ color: data.theme?.warna3 }}>&amp;</span>
          <span className="h-px w-12 opacity-50" style={{ background: data.theme?.warna3 }} />
        </div>

        {/* GROOM */}
        <div className={`flex flex-col items-center ${animate ? "MunculKanan-1" : "opacity-0"}`}>
          <div className="relative flex h-[250px] w-[150px] items-center justify-center">
            <div className="absolute -right-12 -top-8 h-[125px]">
              <img src="/Ornament/BungaMerah4.webp" alt="" className="h-full w-auto -rotate-0 scale-x-[-1] object-contain" />
            </div>

            <div className="relative h-[235px] w-[140px] overflow-hidden rounded-[70px]">
              <img src={data.FotoGroom} alt="" className="h-full w-full object-cover" />
            </div>

            <div className="absolute -bottom-2 -left-1 h-[85px]">
              <img src="/Ornament/BungaMerah2.webp" alt="" className="h-full w-auto -rotate-40  object-contain" />
            </div>
          </div>

          <div className="mt-6">
            <p className="font-Tempting text-3xl" style={{ color: data.theme?.warna3 }}>
              {data.Namagroom}
              {data.GelarGroom && <span className="ml-1 text-sm">{data.GelarGroom}</span>}
            </p>
            <div className="mt-3 text-sm leading-5">
              <p>{data.Putra}</p>
              <p>{data.BapakpengantinPria}</p>
              <p>&amp;</p>
              <p>{data.IbupengantinPria}</p>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
                {data.AkunIGWanita && (
                <div className="flex items-center justify-center text-xs ">
                    <a href={`https://instagram.com/${data.AkunIGWanita}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-1 p-1 border rounded-full"
                    style={{background:data.theme?.warnaButtonBackground, color:data.theme?.warnaButtonBorder}}>
                        <i className="fa-brands fa-instagram "></i> 
                        
                    </a>
                </div>)}
                {data.AkunTikTokPria && (
                <div className="flex items-center justify-center text-xs">
                    <a href={`https://tiktok.com/@${data.AkunTikTokPria}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end p-1 border rounded-full"
                    style={{background:data.theme?.warnaButtonBackground, color:data.theme?.warnaButtonBorder}}>
                        <i className="fa-brands fa-tiktok"></i>
                    </a>
                </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Couple;