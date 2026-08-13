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

const Foto3 = ({ data, scrollY }: Props) => {

    // const p1 = progress(scrollY, 0, 500);
    // const p2 = progress(scrollY, 500, 1000);
    const p3 = progress(scrollY, 1000, 1500);
    const p4 = progress(scrollY, 1500, 2000);
    const p5 = progress(scrollY, 2000, 2500);
    const p6 = progress(scrollY, 2500, 3000);


    const x =-200 + 200 * p3 - 20 * p4 + 30* p5 - 30 *p6;
    const y = 50 - 50 * p3;
    const scale = 3 - 2 * p3 - 0.2 * p4 - 0.2 * p5 ;
    const blur = 5 * p4 + 10* p5;
    const opacity = 1 -  p6;

  
   return (
    <div className="absolute left-1/2 top-1/2 w-full h-screen border flex flex-col " 
    style={{transform: `translate(
      calc(-50% + ${x}%),
      calc(-50% + ${y}%))scale(${scale})`,opacity,filter: `blur(${blur}px)`}}>
        <div className="flex-1 flex flex-col px-2 mt-10 border items-center justify-center" style={{opacity:p3-p4}}>
          <p>{data.Namabride}</p>
          <p>putri dari :</p>
          <p>{data.BapakpengantinWanita} <br/> & <br/> {data.IbupengantinWanita}</p>
        </div>


        <img src={data.FotoBride}alt=""/>
    </div>
  );
};

export default Foto3;