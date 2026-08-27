import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  scrollY: number;
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const progress = (
  scroll: number,
  start: number,
  end: number
) => clamp((scroll - start) / (end - start));

const Bride = ({ data, scrollY }: Props) => {

    // const p1 = progress(scrollY, 0, 500);
    // const p2 = progress(scrollY, 500, 1000);
    const p3 = progress(scrollY, 1000, 1500);
    const p4 = progress(scrollY, 1500, 2000);
    const p5 = progress(scrollY, 2000, 2500);
    const p6 = progress(scrollY, 2500, 3000);


    const x =-200 + 200 * p3 - 20 * p4 + 30* p5 - 30 *p6;
    const y = 50 - 50 * p3;
    const scale = 3 - 2 * p3 - 0.2 * p4 - 0.2 * p5 ;
    const blur = 10 * p4 + 10* p5;
    const opacity = scrollY < 1500 ? p3 : 1 - p6;

    const isActive = scrollY >= 1454 && scrollY < 1608;

    
  
   return (
    <div className={`absolute left-1/2 top-1/2 w-full  h-screen flex flex-col pointer-events-none  ${isActive ? "pointer-events-auto z-50" : "pointer-events-none z-0"}`}
    style={{transform: `translate(calc(-50% + ${x}%),calc(-50% + ${y}%)) scale(${scale})`,opacity,filter: `blur(${blur}px)`,}}>
      {/* frame + text */}
      <div className="relative w-full h-4/7">

        {/* frame */}
        <div className="absolute top-3 -right-2 flex justify-center ">
          <img src="/Ornament/Ornament-2.png" alt="" className="h-full w-auto rotate-90 opacity-40 " />
          
        </div>

        {/* text di atas frame */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full h-[300px]  z-10 flex flex-col items-center  pt-10 px-2 text-xl justify-end"
          style={{ opacity: p3 - p4, color: data.theme?.warna1}}>
          <p className={`font-Bromello w-[300px] break-words ${data.Namabride.length >25 ? "text-4xl" : "text-5xl" }`}>{data.Namabride}</p>
          <div className="m-5 font-ColveticaCond font-bold tracking-[0.1em]">
            <p>putri dari  </p>
            <p>{data.BapakpengantinWanita} & {data.IbupengantinWanita}</p>
          
          <div className="flex mt-2 gap-2">         
              {data.AkunIGWanita && (
              <div>
                  <a href={`https://instagram.com/${data.AkunIGPria}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end"
                  style={{pointerEvents: isActive ? "auto" : "none"}}>
                      <svg xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          className="w-6 h-6 hover:scale-110 transition"
                          fill="currentColor">
                              <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.25 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                      </svg>  
                      
                      <p>@{data.AkunIGWanita}</p> 
                  </a>
                </div>
                )}
                {data.AkunTikTokWanita && (
                <div className="flex items-center justify-end">
                    <a href={`https://tiktok.com/@${data.AkunTikTokPria}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end"
                    style={{pointerEvents: isActive ? "auto" : "none"}}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 hover:scale-110 transition"
                        fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.35V2h-3.01v13.3a2.9 2.9 0 11-2-2.76V9.48a5.93 5.93 0 104.99 5.87V8.56a7.84 7.84 0 004.59 1.47V6.69z"/>
                        </svg>
                        <p>@{data.AkunTikTokWanita}</p> 
                    </a>
                </div>
                )}
            </div>
          </div>
           {/* <div className="text-center absolute bottom- left-2 w-full"
          style={{opacity}}>
            <p>putri dari  </p>
            <p>{data.BapakpengantinWanita} {data.IbupengantinWanita}</p>
          </div> */}
          
        </div>

      </div>
      {/* foto */}
      <div className= " pointer-events-none h-4/7 relative w-full  ">
          <img src="/Ornament/Ornament-2.png" alt="" className="h-full w-auto absolute rotate-270 opacity-40 -left-1   " />
      </div>
        <img src={data.FotoBride} alt=""
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-auto object-contain object-bottom "/>
          
    </div>
  );
};

export default Bride;