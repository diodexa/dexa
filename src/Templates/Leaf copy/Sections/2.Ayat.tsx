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

const Ayat = ({ data, scrollY }: Props) => {

  // const p1 = progress(scrollY, 0, 500);
  const p2 = progress(scrollY, 500, 1000);
  const p3 = progress(scrollY, 1000, 1500);
  const p4 = progress(scrollY, 1500, 2000);
  const p5 = progress(scrollY, 2000, 2500);
  // const p6 = progress(scrollY, 2500, 3000);


  const x =200 -200 * p2 + 20 * p3 -30* p4 + 30 * p5  ;
  const y = 50 - 50 * p2;
  const scale = 3 - 2 * p2 - 0.2 * p3 - 0.2 * p4 ;
  const blur = 30 * p3 + 10* p4;
  const opacity = 1- p5;



  return (
    <div className="absolute left-1/2 top-1/2 w-full h-screen  flex flex-col pointer-events-none font-ColveticaCond text-2xl" 
    style={{transform: `translate(
    calc(-50% + ${x}%),
    calc(-50% + ${y}%))scale(${scale})`,opacity,filter: `blur(${blur}px)`}}>
      
      {/* ornament */}
      <div className="relative w-full h-[143px]  ">
        {/* <div className="absolute left-0 top-0 ">
          <img src="/Ornament/bunga2.png"  alt="" className=" w-auto sepia"/>
        </div> */}

      </div>
      
      <div className="flex flex-col px-3  h-[343px]  items-center justify-start " style={{opacity:p2-p3}}>
        <div className="absolute w-full h-full top-20">
          <img src="/Ornament/Ornament-1.png"  alt="" className="rotate-180 opacity-20" />

        </div>
        <div className="flex flex-col text-shadow-md text-shadow-white">
          <p>{data.Ayat}</p>
          <p>{data.NamaSurat}</p>
        </div>
      </div>

       <div className="h-[350px] relative ">
        <img src={data.Background?.Background2}alt="" className="absolute w-full h-auto "/>
      </div>
    </div>
  );
};

export default Ayat;