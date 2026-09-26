import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;

}

const Couple = ({ data, animate }: Props) => {
  return (
    <section className="relative flex flex-col min-h-screen w-full items-center justify-center overflow-hidden px-5 text-center" style={{ color: data.theme?.contrasfont }}>
      <div className="absolute inset-0 h-full w-full backdrop-blur-xs opacity-50" style={{ background: data.theme?.warna1 }} />
      
      <div className="absolute left-1/2 top-0 z-[1] aspect-[2/1] w-full -translate-x-1/2">
        <div className="h-full w-full bg-contain bg-top bg-no-repeat" style={{ backgroundImage: "url('/Ornament/lace.webp')" }} />
      </div>

      <p className={`text-3xl my-20 uppercase tracking-[0.2em] ${animate ? "Fadein-1" : "opacity-0"}`} style={{color:data.theme?.warna3}}>Bride & Groom</p>
          
      <div className="relative  z-2 w-[90%] py-10   rounded-b-[60px]  rounded-t-[60px]" style={{ background: `${data.theme?.warna2}` }}>

        <div className="mt-2 flex w-full flex-col items-center gap-8">
          {/* BRIDE */}
          <div className={`flex w-full flex-col items-center ${animate ? "MunculKiri-1" : "opacity-0"}`}>
            <div className="relative flex justify-center ">
              <div className={`absolute -top-10 -right-10 h-[120px]   `}>
                <img src="/Ornament/BungaJawa1.webp" alt=""
                className=" h-full w-auto object-contain object-top -rotate-60 scale-x-[-1] " />
            </div>
              <div className="relative h-[220px] w-[130px] overflow-hidden rounded-t-full rounded-b-full">
                <img src={data.FotoBride} alt="" className="h-full w-full object-contain  " />
                
              </div>
              <div className={`absolute -bottom-0 -left-15 h-[80px]   `}>
                <img src="/Ornament/BungaJawa2.webp" alt=""
                className=" h-full w-auto object-contain object-top rotate-40 scale-x-[-1] " />
            </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-2xl font-Tempting mt-3" style={{ color: data.theme?.warna3 }}>
                {data.Namabride}{data.GelarBride && <span className="ml-1 text-sm">{data.GelarBride}</span>}
              </p>
              <div className="mt-2 text-sm leading-5">
                <p > {data.Putri}</p>
                <p>{data.Putri}</p>
                <p>{data.BapakpengantinWanita}</p>
                <p>&amp;</p>
                <p>{data.IbupengantinWanita}</p>
              </div>
              <div className="mt-4 flex items-center justify-center  gap-2">
                  {data.AkunIGWanita && (
                  <div className="flex items-center justify-center text-xs ">
                      <a href={`https://instagram.com/${data.AkunIGWanita}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-1 p-1 border rounded-full"
                      style={{background:data.theme?.warnaButtonBackground, color:data.theme?.warnaButtonBorder}}>
                          <svg xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" 
                              className="w-4 h-4 hover:scale-110 transition"
                              fill="currentColor">
                                  <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.25 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                          </svg>  
                          
                          
                      </a>
                  </div>)}
                  {data.AkunTikTokWanita && (
                  <div className="flex items-center justify-center text-xs">
                      <a href={`https://tiktok.com/@${data.AkunTikTokWanita}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end p-1 border rounded-full"
                      style={{background:data.theme?.warnaButtonBackground, color:data.theme?.warnaButtonBorder}}>
                          <svg xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4 hover:scale-110 transition"
                          fill="currentColor">
                              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.35V2h-3.01v13.3a2.9 2.9 0 11-2-2.76V9.48a5.93 5.93 0 104.99 5.87V8.56a7.84 7.84 0 004.59 1.47V6.69z"/>
                          </svg>
                      </a>
                  </div>
                  )}
              </div>
            </div>
          </div>

          {/* PEMISAH */}
          <div className="flex items-center gap-3">
            <h2 className="text-5xl"
            style={{color:data.theme?.warna3}}>&</h2>
          </div>

          {/* GROOM */}
          <div className={`flex w-full flex-col items-center ${animate ? "MunculKanan-1" : "opacity-0"}`}>
            <div className="relative flex justify-center ">
              {/* FOTO DIBENTUK SEPERTI PINTU */}
              <div className={`absolute -top-10 -right-10 h-[120px]   `}>
                <img src="/Ornament/BungaJawa1.webp" alt=""
                className=" h-full w-auto object-contain object-top -rotate-60 scale-x-[-1] " />
            </div>
              <div className="relative h-[220px] w-[130px] overflow-hidden rounded-t-full rounded-b-full">
                <img src={data.FotoGroom} alt="" className="h-full w-full object-contain  " />
                
              </div>
              <div className={`absolute -bottom-0 -left-15 h-[80px]   `}>
                <img src="/Ornament/BungaJawa2.webp" alt=""
                className=" h-full w-auto object-contain object-top rotate-40 scale-x-[-1] " />
            </div>

              {/* ORNAMEN PINTU */}
              {/* <div className="pointer-events-none absolute  h-[70%] w-[70%]  -top-15 left-1/2 -translate-x-1/2 z-10">
                <img src="/Ornament/BingkaiJawa.webp" alt="" className="object-contain" />
              </div> */}
            </div>

            <div className="mt-4 text-center">
              <p className="text-2xl font-Tempting mt-3" style={{ color: data.theme?.warna3 }}>
                {data.Namagroom}{data.GelarGroom && <span className="ml-1 text-sm">{data.GelarGroom}</span>}
              </p>
              <div className="mt-2 text-sm leading-5">
                <p>{data.Putra}</p>
                <p>{data.Putra}</p>
                <p>{data.BapakpengantinPria}</p>
                <p>&amp;</p>
                <p>{data.IbupengantinPria}</p>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                  {data.AkunIGPria && (
                  <div className="flex items-center justify-center text-xs ">
                      <a href={`https://instagram.com/${data.AkunIGPria}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-1 p-1 border rounded-full"
                      style={{background:data.theme?.warnaButtonBackground, color:data.theme?.warnaButtonBorder}}>
                          <svg xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" 
                              className="w-4 h-4 hover:scale-110 transition"
                              fill="currentColor">
                                  <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.25 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                          </svg>  
                          
                      </a>
                  </div>)}
                  {data.AkunTikTokPria && (
                  <div className="flex items-center justify-center text-xs">
                      <a href={`https://tiktok.com/@${data.AkunTikTokPria}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end p-1 border rounded-full"
                      style={{background:data.theme?.warnaButtonBackground, color:data.theme?.warnaButtonBorder}}>
                          <svg xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4 hover:scale-110 transition"
                          fill="currentColor">
                              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.35V2h-3.01v13.3a2.9 2.9 0 11-2-2.76V9.48a5.93 5.93 0 104.99 5.87V8.56a7.84 7.84 0 004.59 1.47V6.69z"/>
                          </svg>
                      </a>
                  </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between text-[7px] uppercase tracking-[0.2em] opacity-60">
          <span>Our Story</span>
          <span>With Love</span>
          <span>Forever</span>
      </div>
          
  

      

  </section>
  );
};

export default Couple;
