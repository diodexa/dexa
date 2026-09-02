import type { Invitation } from "../../../types/invitationType";
import { FloralDivider } from "../utils/floralSvg";

interface Props {
  data: Invitation;

}

const SaveTheDate = ({ data }: Props) => {
  return (
    <section className="relative flex h-screen flex-col items-center  px-2 text-center"
      style={{ background: data.theme?.warna1, color: data.theme?.warna2,}}>
      <div className="absolute -left-50 top-20 w-full h-full bg-no-repeat bg-left-top bg-contain"
      style={{backgroundImage: "url('/Ornament/sun3.png')", }}/>
      <div className="absolute -right-40 bottom-0 w-[300px] h-[500px] bg-no-repeat bg-right-bottom bg-contain"
      style={{backgroundImage: "url('/Ornament/sun3.png')", }}/>
      <div className="opacity-50">
        <img src="/Ornament/awan2.png" alt=""className="absolute left-20 top-60 w-auto h-[40%] object-contain  MunculKanan "/>
      </div>
      <div className="opacity-50">
        <img src="/Ornament/awan1.png" alt=""className="absolute right-20 bottom-0 w-auto h-[40%] object-contain  MunculKanan "/>
      </div>

      <div className="mt-10">
        <p className=" text-xl uppercase tracking-[0.4em]">
          Save The Date
        </p>
        
      </div>

      <div className="w-full flex  justify-center">
        <FloralDivider color={data.theme?.warna3} width={500} />
      </div>

      <div className="mt-5 w-full flex flex-col space-y-8 items-end">
        <div className="w-[200px] flex flex-col items-end text-right">
          <div>
            <p className="font-serif text-2xl">
              Akad
            </p>
            <p className="mt-2 text-sm">
              {data.TanggalAkad}
            </p>
            <p className="text-sm">
              {data.JamAkad}
            </p>
            <p className="mt-2 text-sm">
              {data.LokasiAkad}
            </p>

          </div>
          <div className="z-11">
              <a href={data.LinkGoogleMapsResepsi} target="blank" >
                <button className="border-1  flex items-center p-1 rounded-md hover:scale-110 transition mt-2" style={{background:data.theme?.warnaButtonBackground, color:data.theme?.contrasfont}}>
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

        <div className="text-left flex flex-col ">
          <div>
            <p className="font-serif text-2xl">
              Resepsi
            </p>
            <p className="mt-2 text-sm">
              {data.TanggalResepsi}
            </p>
            <p className="text-sm">
              {data.JamResepsi}
            </p>
            <p className="mt-2 text-sm">
              {data.LokasiResepsi}
            </p>

          </div>
          <div className="z-11">
            <a href={data.LinkGoogleMapsResepsi} target="blank" >
              <button className="border-1  flex items-center p-1 rounded-md hover:scale-110 transition mt-2" style={{background:data.theme?.warnaButtonBackground, color:data.theme?.contrasfont}}>
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

      {/* <div className="pointer-events-none z-10  h-[350px] flex items-center justify-center pb-24 mb-8">
          <div style={{"--bg2": data.theme?.warna3 , "--bgcountdown": data.theme?.warna2,  "--minhcountdown": "60px",  "--minwcountdown": "60px", color:data.theme?.warna1, } as React.CSSProperties}>
            <Countdown date={`${data.TanggalAkadISO}T${data.JamAkad}:00`}/>
          </div>
        </div> */}
    </section>
  );
};

export default SaveTheDate;
