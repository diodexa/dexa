import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
  scrollY: number;
}

const Couple = ({ data, animate, scrollY }: Props) => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 text-center" style={{ color: data.theme?.contrasfont }}>
        <div className="absolute inset-0 h-full w-full  opacity-80" style={{ background: `linear-gradient(180deg, ${data.theme?.warna1} 0%, ${data.theme?.warna1} 35%, ${data.theme?.warna2} 65%, ${data.theme?.warna2} 100%)` }} />
        <div className="absolute left-1/2 top-0 z-[1] aspect-[2/1] w-full -translate-x-1/2">
        <div className="h-full w-full bg-contain bg-top bg-no-repeat" style={{ backgroundImage: "url('/Ornament/lace.webp')" }} />
        </div>
        <div className="relative z-10 my-28 flex w-full max-w-md flex-col items-center">
        <p className={`text-[10px] uppercase tracking-[0.4em] ${animate ? "Fadein-1" : "opacity-0"}`}>The Happy Couple</p>
        <div className={`relative mt-8 w-full max-w-[350px] rotate-[-1deg] rounded-[6px]  p-3 shadow-xl ${animate ? "MunculBawah-1" : "opacity-0"}`} style={{background:data.theme?.warnaButtonBorder}}>
            <div className="relative border p-4" style={{ borderColor: `${data.theme?.warna3}70` }}>
            {/* <div className="absolute -right-18 -top-10 flex h-[160px] w-auto pointer-events-none" style={{ borderColor: `${data.theme?.warna3}80`, color: data.theme?.warna3 }}>
                <img src="/Ornament/BungaPinkTunggal2.webp" alt="" className="h-full w-auto object-contain opacity-80"/>
            </div> */}
            <div className="absolute -left-10 -top-15 flex h-[130px] w-auto  pointer-events-none " >
                <img src="/Ornament/BungaPinkTunggal1.webp" alt="" className="h-full w-auto object-contain " style={{transform: `rotate(${-scrollY *0.5 }deg)`}}/>
            </div>
            <div className="mb-5 mt-4">
                <p className="text-[9px] uppercase tracking-[0.35em]" >Together With</p>
                <p className="mt-1  text-xl " style={{ color: data.theme?.warna3 }}>Love & Happiness</p>
            </div>
            <div className="relative flex items-end justify-center gap-3">
                <div className={`relative w-[46%] ${animate ? "MunculKiri-1" : "opacity-0"}`}>
                <div className="rotate-[-2deg] bg-white p-2 pb-5 shadow-md" style={{ boxShadow: `0 5px 15px ${data.theme?.warna3}25` }}>
                    <div className="h-[185px] w-full overflow-hidden">
                    <img src={data.FotoBride} alt="" className="h-full w-full object-cover" />
                    </div>
                </div>
                </div>
                <div className={`relative w-[46%] ${animate ? "MunculKanan-1" : "opacity-0"}`}>
                <div className="rotate-[2deg] bg-white p-2 pb-5 shadow-md" style={{ boxShadow: `0 5px 15px ${data.theme?.warna3}25` }}>
                    <div className="h-[185px] w-full overflow-hidden">
                    <img src={data.FotoGroom} alt="" className="h-full w-full object-cover" />
                    </div>
                </div>
                </div>
            
            </div>
            <div className="mt-8">
                <p className=" text-xl" style={{ color: data.theme?.warna3 }}>{data.Namabride}{data.GelarBride && <span className="ml-1 text-sm">{data.GelarBride}</span>}</p>
                <p className="my-1 ">&amp;</p>
                <p className=" text-xl" style={{ color: data.theme?.warna3 }}>{data.Namagroom}{data.GelarGroom && <span className="ml-1 text-sm">{data.GelarGroom}</span>}</p>
            </div>
            <div className="mx-auto my-5 flex w-2/3 items-center gap-2">
                <div className="h-px flex-1" style={{ backgroundColor: `${data.theme?.warna3}50` }} />
                <span className="text-xs" style={{ color: data.theme?.warna3 }}>✦</span>
                <div className="h-px flex-1" style={{ backgroundColor: `${data.theme?.warna3}50` }} />
            </div>
            <div className="grid grid-cols-2 gap-5 text-[10px] leading-5">
                <div className={animate ? "MunculKiri-1" : "opacity-0"}>
                <p className="mb-1 text-[9px] uppercase tracking-[0.15em]" style={{ color: data.theme?.warna3 }}>Daughter of</p>
                <p>{data.Putri}</p>
                <p>{data.BapakpengantinWanita}</p>
                <p>&amp;</p>
                <p>{data.IbupengantinWanita}</p>
                </div>
                <div className={animate ? "MunculKanan-1" : "opacity-0"}>
                <p className="mb-1 text-[9px] uppercase tracking-[0.15em]" style={{ color: data.theme?.warna3 }}>Son of</p>
                <p>{data.Putra}</p>
                <p>{data.BapakpengantinPria}</p>
                <p>&amp;</p>
                <p>{data.IbupengantinPria}</p>
                </div>
            </div>
            <div className="mt-6  flex justify-between  gap-5 text-[10px]">
                <div className="flex justify-center gap-2  w-1/2">

                    {data.AkunIGWanita && (
                    <div className="flex items-center justify-center  ">
                        <a href={`https://instagram.com/${data.AkunIGWanita}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                className="w-4 h-4 hover:scale-110 transition"
                                fill="currentColor">
                                    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.25 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                            </svg>  
                            
                            <p>@{data.AkunIGWanita}</p> 
                        </a>
                    </div>)}
                    {data.AkunIGWanita && (
                    <div className="flex items-center justify-center ">
                        <a href={`https://tiktok.com/@${data.AkunIGWanita}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end ">
                            <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 hover:scale-110 transition"
                            fill="currentColor">
                                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.35V2h-3.01v13.3a2.9 2.9 0 11-2-2.76V9.48a5.93 5.93 0 104.99 5.87V8.56a7.84 7.84 0 004.59 1.47V6.69z"/>
                            </svg>
                            <p>@{data.AkunIGWanita}</p> 
                        </a>
                    </div>
                    )}
                </div>

                <div className="flex justify-center gap-2  w-1/2">

                    {data.AkunIGPria && (
                    <div className="flex items-center justify-center  ">
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
                    <div className="flex items-center justify-center ">
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
            <div className="mt-6 flex items-center justify-between text-[7px] uppercase tracking-[0.2em] opacity-60">
                <span>Our Story</span>
                <span>With Love</span>
                <span>Forever</span>
            </div>
            </div>
        </div>
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
