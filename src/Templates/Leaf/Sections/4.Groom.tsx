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

const Groom = ({ data, scrollY }: Props) => {

//  const p1 = progress(scrollY, 0, 500);
// const p2 = progress(scrollY, 500, 1000);
// const p3 = progress(scrollY, 1000, 1500);
const p4 = progress(scrollY, 1500, 2000);
const p5 = progress(scrollY, 2000, 2500);
const p6 = progress(scrollY, 2500, 3000);
const p7 = progress(scrollY, 3000, 3500);


const x = 200 - 200 * p4 + 20 * p5 - 30 * p6 + 30 *p7;
const y = 50 - 50 * p4;
const scale = 3 - 2 * p4 - 0.2 * p5 - 0.2 * p6 ;
const blur = 25 * p5 + 15 * p6;
const opacity = 1-  p7;

 const isActive = scrollY >= 1930 && scrollY < 2052;

  return (
    <div className={`absolute left-1/2 top-1/2 w-full  h-screen flex flex-col  ${isActive ? "pointer-events-auto z-50" : "pointer-events-none z-0"}`}
    style={{transform: `translate(calc(-50% + ${x}%),calc(-50% + ${y}%)) scale(${scale})`,opacity,filter: `blur(${blur}px)`,}}>
      {/* frame + text */}
      <div className="relative w-full h-4/7 ">

        {/* frame */}
        <div className="absolute inset-0 flex justify-center">
          <img src="/Ornament/frame.png" alt="" className="h-full w-auto" />
        </div>

        {/* text di atas frame */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-10 px-2 text-xl "
          style={{ opacity: p4 - p5, color: data.theme?.warna1}}>
          <p className="font-cursive text-5xl  w-[300px]  break-words">{data.Namagroom}</p>
          
        </div>

      </div>
      {/* foto */}
      <div className="h-3/7 relative w-full ">
        <img src={data.FotoGroom} alt=""
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-auto object-contain object-bottom"/>
          <div className="text-left absolute bottom-40 left-2 w-1/4"
          style={{opacity}}>

            <p>putra dari :</p>
            <p className="w-[250px]  break-words"> {data.BapakpengantinPria}
            <br /> & <br />
            {data.IbupengantinPria}</p>
          </div>
      </div>
    </div>
  );
};

export default Groom;