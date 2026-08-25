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
    const blur = 20 * p4 + 10* p5;
    const opacity = 1 -  p6;

    const isActive = scrollY >= 1454 && scrollY < 1608;
    
  
   return (
    <div className={`absolute left-1/2 top-1/2 w-full  h-screen flex flex-col pointer-events-none  ${isActive ? "pointer-events-auto z-50" : "pointer-events-none z-0"}`}
    style={{transform: `translate(calc(-50% + ${x}%),calc(-50% + ${y}%)) scale(${scale})`,opacity,filter: `blur(${blur}px)`,}}>
      {/* frame + text */}
      <div className="relative w-full h-4/7">

        {/* frame */}
        <div className="absolute inset-0 flex justify-center">
          <img src="/Ornament/frame.png" alt="" className="h-full w-auto" />
        </div>

        {/* text di atas frame */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-10 px-2 text-xl"
          style={{ opacity: p3 - p4, color: data.theme?.warna1}}>
          <p className="font-cursive text-5xl  w-[300px]  break-words">{data.Namabride}</p>
          
        </div>

      </div>
      {/* foto */}
      <div className= " pointer-events-none h-3/7 relative w-full ">
        <img src={data.FotoBride} alt=""
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full h-auto object-contain object-bottom"/>
          <div className="text-left absolute bottom-25 left-2 w-1/4"
          style={{opacity}}>
            <p>putri dari :</p>
            <p> {data.BapakpengantinWanita}<br />
              <span className="text-center">&</span>
            <br />{data.IbupengantinWanita}</p>

          </div>
      </div>
    </div>
  );
};

export default Bride;