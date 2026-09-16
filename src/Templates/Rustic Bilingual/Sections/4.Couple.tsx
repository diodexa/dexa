import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate : boolean;
}

const Couple = ({ data, animate }: Props) => {
  return (
    <section className="relative flex w-full min-h-screen items-center justify-center overflow-hidden px-6 text-center" style={{ color: data.theme?.contrasfont }}>

        <div className="absolute inset-0 blur-sm" style={{ background: data.theme?.warna1 }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full z-[1] aspect-[2/1]">
        <div
            className="w-full h-full bg-contain bg-no-repeat bg-top"
            style={{ backgroundImage: "url('/Ornament/lace.webp')" }}
        />
        </div>
        

        <div className="relative z-10 flex w-full max-w-md flex-col items-center overflow-hidden my-30">
            <p className={`text-[11px] uppercase tracking-[0.35em] ${animate ? "Fadein-1 " : "opacity-0"}`}>
                The Happy Couple
            </p>
            <h2 className={`text-2xl uppercase tracking-[0.35em]  ${animate ? "Fadein-1 " : "opacity-0"}`} style={{ color: data.theme?.warna3 }}>Bride & Groom</h2>
            
            <div className="flex flex-col items-center justify-center mb-30 mt-10 gap-1">
                {/* foto */}
                <div className={` flex items-center gap-12 `}>
                    <div className={`h-[160px] w-[130px] overflow-hidden rounded-t-[90px] border ${animate ? "MunculKiri-1 " : "opacity-0"}`} style={{ borderColor: data.theme?.warna3 }}>
                        <img src={data.FotoBride} alt="" className="h-full w-full object-cover" />
                    </div>

                    <div className={`h-[160px] w-[130px] overflow-hidden rounded-t-[90px] border ${animate ? "MunculKanan-1 " : "opacity-0"}`} style={{ borderColor: data.theme?.warna3 }}>
                        <img src={data.FotoGroom} alt="" className="h-full w-full object-cover" />
                    </div>
                </div>


                <div className={` flex items-start justify-center gap-5  `}>
                    <div className={`flex flex-col justify-center items-center ${animate ? "MunculKiri-1 " : "opacity-0"}`} >
                        <p className="mt-5  " style={{ color: data.theme?.warna3 }}>{data.Namabride} <span>{data.GelarBride} </span> </p>
                        <p className="mt-1 text-xs ">The beloved daughter<br />{data.BapakpengantinWanita} <br/> & <br/> {data.IbupengantinWanita}</p>
                        <div className="mt-4 flex flex-col gap-2">
                            {data.AkunIGWanita && (
                            <div className="flex items-center justify-center text-xs ">
                                <a href={`https://instagram.com/${data.AkunIGWanita}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24" 
                                        className="w-5 h-5 hover:scale-110 transition"
                                        fill="currentColor">
                                            <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.25 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                                    </svg>  
                                    
                                    <p>@{data.AkunIGWanita}</p> 
                                </a>
                            </div>)}
                            {data.AkunTikTokWanita && (
                            <div className="flex items-center justify-center text-xs">
                                <a href={`https://tiktok.com/@${data.AkunTikTokWanita}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end ">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-4 h-4 hover:scale-110 transition"
                                    fill="currentColor">
                                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.35V2h-3.01v13.3a2.9 2.9 0 11-2-2.76V9.48a5.93 5.93 0 104.99 5.87V8.56a7.84 7.84 0 004.59 1.47V6.69z"/>
                                    </svg>
                                    <p>@{data.AkunTikTokWanita}</p> 
                                </a>
                            </div>
                            )}
                        </div>
                    </div>

                    <div className={`flex-flex-col justify-center items-center  ${animate ? "MunculKanan-1 " : "opacity-0"}`}>
                        <p className="mt-5   " style={{ color: data.theme?.warna3 }}>{data.Namagroom} <span>{data.GelarGroom} </span> </p>
                        <p className="mt-1 text-xs ">The beloved son<br />{data.BapakpengantinPria} <br/>& <br/> {data.IbupengantinPria}</p>
                        <div className="mt-4 flex flex-col gap-2">
                            {data.AkunIGPria && (
                            <div className="flex items-center justify-center text-xs ">
                                <a href={`https://instagram.com/${data.AkunIGPria}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24" 
                                        className="w-4 h-4 hover:scale-110 transition"
                                        fill="currentColor">
                                            <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.25 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                                    </svg>  
                                    
                                    <p>@{data.AkunIGPria}</p> 
                                </a>
                            </div>)}
                            {data.AkunTikTokPria && (
                            <div className="flex items-center justify-center text-xs">
                                <a href={`https://tiktok.com/@${data.AkunTikTokPria}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end ">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-4 h-4 hover:scale-110 transition"
                                    fill="currentColor">
                                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.35V2h-3.01v13.3a2.9 2.9 0 11-2-2.76V9.48a5.93 5.93 0 104.99 5.87V8.56a7.84 7.84 0 004.59 1.47V6.69z"/>
                                    </svg>
                                    <p>@{data.AkunTikTokPria}</p> 
                                </a>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        {/* <div className="absolute -top-0 -right-60 h-[300px] opacity-70">
        <img src="/Ornament/Pohon1.webp" alt=""
          className="h-full w-auto object-contain object-right-bottom scale-x-[-1]"/>
          </div> */}
        
        <div className={`absolute h-screen w-screen bottom-0  ${animate ? "MunculBawah-1 " : "opacity-0"}`}>
            <img src="/Ornament/DaunDahlia.webp" alt="" className="absolute -bottom-10 -left-0 z-[1] h-[180px] w-auto object-contain sway-flower1" />
            <img src="/Ornament/DaunDahlia.webp" alt="" className="absolute -bottom-20 left-50 z-[1] h-[190px] w-auto object-contain rotate-290 sway-flower2" />
            
            <img src="/Ornament/DahliaMerah.webp" alt="" className="absolute -bottom-10 -left-16 z-[1] h-[280px] w-auto object-contain sway-flower3" />

            <img src="/Ornament/DahliaCream.webp" alt="" className="absolute -bottom-10 left-5 z-[1] h-[180px] w-auto object-contain scale-x-[-1] sway-flower1 sepia-30" />
        </div>
      

  
    </section>
  );
};

export default Couple;