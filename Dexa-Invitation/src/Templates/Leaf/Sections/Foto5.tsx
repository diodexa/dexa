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
  end: number) => clamp((scroll - start) / (end - start));

const Foto5 = ({ data, scrollY }: Props) => {

    // const p1 = progress(scrollY, 0, 500);
    // const p2 = progress(scrollY, 500, 1000);
    // const p3 = progress(scrollY, 1000, 1500);
    // const p4 = progress(scrollY, 1500, 2000);
    const p5 = progress(scrollY, 2000, 2500);
    const p6 = progress(scrollY, 2500, 3000);
    const p7 = progress(scrollY, 3000, 3500);
    const p8 = progress(scrollY, 3500, 4000);


    const x =-200 + 200 * p5  -20 * p6 + 30* p7 - 30  * p8;
    const y = 50 - 50 * p5;
    const scale = 3 - 2 * p5 - 0.2 * p6 - 0.2 * p7 ;
    const blur = 10 * p6 + 15 * p7 ;

    const opacity = 1 - p7;

  return (
    <div className="absolute left-1/2 top-1/2 w-full h-screen border flex flex-col " 
    style={{transform: `translate(
      calc(-50% + ${x}%),
      calc(-50% + ${y}%))scale(${scale})`,opacity,filter: `blur(${blur}px)`}}>
        <div className="flex-1 flex flex-col px-2 mt-10 border items-center justify-center" style={{opacity:p5-p6}}>
          <h2>save the date</h2>
          Akad
          <p>{data.TanggalAkad}</p>
          <p>{data.JamAkad}</p>
          <p>{data.LokasiAkad}</p>
          Resepsi 
          <p>{data.TanggalResepsi}</p>
          <p>{data.JamResepsi}</p>
          <p>{data.LokasiResepsi}</p>
        </div>


        <img src={data.Background?.Background3}alt=""/>
          </div>
  );
};

export default Foto5;