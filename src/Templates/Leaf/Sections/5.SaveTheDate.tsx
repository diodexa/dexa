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

const SaveTheDate = ({ data, scrollY }: Props) => {

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
    const blur = 30 * p6 + 15 * p7 ;

    const opacity = 1 - p7;
    const isActive = scrollY >= 2482 && scrollY < 2572;


  return (
    <div className={`absolute left-1/2 top-1/2 w-full h-screen  flex flex-col ${isActive ? "pointer-events-auto z-50" : "pointer-events-none z-0"}`} 
    style={{transform: `translate(
      calc(-50% + ${x}%),
      calc(-50% + ${y}%))scale(${scale})`,opacity,filter: `blur(${blur}px) `}}>
        <div className="flex-1 flex flex-col px-2 mt-10  items-center justify-center " style={{opacity:p5-p6}}>
        
        <div className="absolute inset-0 flex justify-center ">
          <img src="/Ornament/frame2.png" alt="" className="h-full w-auto" />
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center mt-20 pt-10 px-11 text-lg font-bold ">

          <h2 className="text-5xl font-Bromello">save the date</h2>
          
          <div className="flex flex-col w-full text-left mb-2 font-Colvetica text-sm">
            <p> Akad</p>
            <p>Tanggal {data.TanggalAkad}</p>
            <p>Pukul {data.JamAkad}</p>
            {data.LokasiAkad !== data.LokasiResepsi && (
              <p>{data.LokasiAkad}</p>
            )}

            <div >
              <a href={data.LinkGoogleMapsAkad} target="blank" >
                <button className="border-1 text-xs flex items-center p-1 rounded-md hover:scale-110 transition " style={{background:data.theme?.warnaButtonBackground, color:data.theme?.contrasfont}}>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 hover:scale-110 transition"
                  fill="currentColor"
                  >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/>
                  </svg>  Google map
                </button>
              </a>
            </div>

          </div>

          <div className="flex flex-col w-full  text-right  my-2 font-Colvetica text-sm items-end ">

            <p>Resepsi</p> 
            <p>Tanggal {data.TanggalResepsi}</p>
            <p>Pukul {data.JamResepsi}</p>
            <p>{data.LokasiResepsi}</p>
          
           

            <div className="z-11">
              <a href={data.LinkGoogleMapsResepsi} target="blank" >
                <button className="border-1 text-xs flex items-center p-1 rounded-md hover:scale-110 transition " style={{background:data.theme?.warnaButtonBackground, color:data.theme?.contrasfont}}>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 hover:scale-110 transition"
                  fill="currentColor"
                  >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/>
                  </svg>  Google map 
                </button>
              </a>
            </div>
          </div>
        </div>
        </div>

        <div className="pointer-events-none z-10  h-[350px]">

          <img src={data.Background?.Background3}alt="" className="pointer-events-none"/>
        </div>
    </div>
  );
};

export default SaveTheDate;