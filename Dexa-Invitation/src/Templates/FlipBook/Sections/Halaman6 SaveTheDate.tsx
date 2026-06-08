import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const Halaman6  = ({data}:Props) =>  {
  return (
    <div className="Kertas__half Kertas__half--back  flex w-full h-full"
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
        <div className="flex flex-col items-end w-full h-full pt-5 pr-2">
            <h2 className="font-SephoraHayden text-[2rem] mb-5 ">Save T</h2>
            <div className="flex flex-col gap-1 items-start p-2">  
                <p className="text-lg font-bold" style={{color:data.theme?.headingFont}}>Akad</p>
                <div className="pb-4 text-sm text-left">
                    <p><strong>{data.TanggalAkad} </strong></p>
                    <p>Jam {data.JamAkad}</p>
                </div>
                    
                {data.LokasiAkad == data.LokasiResepsi ? (
                    <div>
                        <p className="text-xs mb-4 text-left h-[7vw]">{data.LokasiAkad}</p>
                    </div>
                ) :
                (
                    <div>
                        <p className="text-xs mb-4 text-left md:h-[7vw]">{data.LokasiAkad}</p>
                        <a href={data.LinkGoogleMapsResepsi} target="blank" className=" pointer-events-auto">
                            <button className="border-1 text-xs flex items-center p-1 rounded-md hover:scale-110 transition" style={{background:data.theme?.bodyFont, color:data.theme?.PrimaryColor}}>
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
                )
                }
            </div>
        </div>
    </div>
  );
};

export default Halaman6;