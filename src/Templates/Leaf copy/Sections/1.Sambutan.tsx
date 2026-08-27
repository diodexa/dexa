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

const Sambutan = ({ data, scrollY }: Props) => {

  const p1 = progress(scrollY, 0, 500);
  const p2 = progress(scrollY, 500, 1000);
  const p3 = progress(scrollY, 1000, 1500);
  // const p4 = progress(scrollY, 1500, 2000);
  // const p5 = progress(scrollY, 2000, 2500);
  // const p6 = progress(scrollY, 2500, 3000);



  //Animasi
  const x = 0 - 20 * p2 + 20 * p3 -20* p3;
  const y =  200 - 200 * p1
  const scale = 3 - 2 * p1 - 0.2 * p2 - 0.2 * p3;
  const blur = 5 * p2 + 5 * p3;
  const opacity =1 - p3;



  return (
    <div className="absolute left-1/2 top-1/2 w-full  h-screen flex flex-col pointer-events-none font-ColveticaCond text-2xl " 
    style={{transform: `translate(calc(-50% + ${x}%),calc(-50% + ${y}%)) scale(${scale})`,opacity ,filter: `blur(${blur}px)`,}}>
      {/* ornament */}
      <div className="relative w-full h-2/7  flex-1">
        {/* <div className="absolute inset-0 h-full  flex ">
          <img src="/Ornament/Ornament-2.png"  alt="" className="h-full w-auto "/>
          <img src="/Ornament/Ornament-2.png"  alt="" className="absolute right-0 top-1 h-full w-auto rotate-90  "/>
        </div> */}
      
      </div>

      {/* text */}
      <div className=" flex flex-col px-2 h-2/7  items-center justify-start " style={{opacity: (p1-p2),  color:data.theme?.warna1}}>
        <div className="absolute w-full h-full -top-40 ">
          <img src="/Ornament/Ornament-4.png"  alt="" className=" opacity-40" />

        </div>
        <p className="text-3xl">{data.Salam}</p>
        <p>{data.Sambutan}</p>
      </div>

      {/* foto */}
      <div className="h-3/7 relative ">
        <img src={data.Background?.Background1}alt="" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto object-contain object-bottom"/>
      </div>
    </div>
  );
};

export default Sambutan;