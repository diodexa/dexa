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

const Story = ({ data, scrollY }: Props) => {

//  const p1 = progress(scrollY, 0, 500);
// const p2 = progress(scrollY, 500, 1000);
// const p3 = progress(scrollY, 1000, 1500);
// const p4 = progress(scrollY, 1500, 2000);
// const p5 = progress(scrollY, 2000, 2500);
const p6 = progress(scrollY, 2500, 3000);
const p7 = progress(scrollY, 3000, 3500);
const p8 = progress(scrollY, 3500, 4000);


const x = 200 - 200 * p6 + 20 * p7 - 30* p8;
const y = 50 - 50 * p6;
const scale = 3 - 2 * p6- 0.2 * p7 - 0.2 * p8 ;
const blur = 10 * p7 + 15 * p8;
const opacity = 1-  p7;

  return (
    <div className="absolute left-1/2 top-1/2 w-full h-screen  flex flex-col font-Colvetica" 
    style={{transform: `translate(
      calc(-50% + ${x}%),
      calc(-50% + ${y}%))scale(${scale})`,opacity,filter: `blur(${blur}px)`}}>
        <div className="text-center pt-5 shrink-0">

          <p className="text-xs tracking-[0.35em] uppercase opacity-70">
            Our Journey
          </p>

          <h2 className="text-5xl font-Bromello mt-1">
            Story of Love
          </h2>

        </div>
        <div className="flex-1 flex flex-col px-4 mt-3  items-center justify-center w-full gap-3 text-sm " style={{opacity:p6-p7}}>
          {data.Story?.map((Cerita,index)=>{
            return (
              <div key={index} className={` pl-1 rounded ${ index %2 ? "text-right" : "text-left"}`}
          style={{background:  `color-mix(in srgb, ${ index %2 ? data.theme?.warna2 : data.theme?.warna3} 30%, transparent)` }}>
                <strong className="text-lg">{Cerita.Head}</strong>
                <p>{Cerita.Story}</p>

              </div>
            )
          })}

         
       
        </div>
        <div className="h-[350px] relative ">
          <img src="/Ornament/bunga1.png"  alt="" className=" w-auto absolute rotate-180"/>
          <img src={data.Background?.Background2}alt="" className="absolute w-full h-auto "/>
        </div>
    </div>
  );
};

export default Story;