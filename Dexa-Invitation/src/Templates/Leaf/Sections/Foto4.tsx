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

const Foto4 = ({ data, scrollY }: Props) => {

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
const blur = 10 * p5 + 15 * p6;
const opacity = 1-  p7;

  return (
    <div className="absolute left-1/2 top-1/2 w-full h-screen border flex flex-col " 
    style={{transform: `translate(
      calc(-50% + ${x}%),
      calc(-50% + ${y}%))scale(${scale})`,opacity,filter: `blur(${blur}px)`}}>
        <div className="flex-1 flex flex-col px-2 mt-10 border items-center justify-center" style={{opacity:p4-p5}}>
          <p>{data.Namagroom}</p>
          <p>putra dari :</p>
          <p>{data.BapakpengantinPria} <br/> & <br/> {data.IbupengantinPria}</p>
        </div>


        <img src={data.FotoGroom}alt=""/>
    </div>
  );
};

export default Foto4;