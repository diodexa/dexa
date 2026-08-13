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

const Foto1 = ({ data, scrollY }: Props) => {

  const p1 = progress(scrollY, 0, 500);
  const p2 = progress(scrollY, 500, 1000);
  const p3 = progress(scrollY, 1000, 1500);
  const p4 = progress(scrollY, 1500, 2000);
  // const p5 = progress(scrollY, 2000, 2500);
  // const p6 = progress(scrollY, 2500, 3000);



  //Animasi
  const x = 0 - 20 * p2 + 20 * p3 -20* p4;
  const y =  200 - 200 * p1
  const scale = 3 - 2 * p1 - 0.2 * p2 - 0.2 * p3;
  const blur = 5 * p2 + 5 * p3 + 10 * p4;
  const opacity =1 - p4;



  return (
    <div className="absolute left-1/2 top-1/2 w-full  h-screen border flex flex-col " 
    style={{transform: `translate(calc(-50% + ${x}%),calc(-50% + ${y}%)) scale(${scale})`,opacity,filter: `blur(${blur}px)`,}}>
      <div className="flex-1 flex flex-col px-2 mt-10 border items-center justify-center" style={{opacity: (p1-p2), background: data.theme?.warna2, color:data.theme?.warna1}}>
        <p>{data.Salam}</p>
        <p>{data.Sambutan}</p>
      </div>

      <img src={data.Background?.Background1}alt=""/>
    </div>
  );
};

export default Foto1;