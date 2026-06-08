import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const Halaman7  = ({data}:Props) =>  {
  return (
    <div className="Kertas__half Kertas__half--front  flex w-full h-full"
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
        <div className="flex flex-col items-start w-full h-full pt-5 pr-2">
            <h2 className="font-SephoraHayden text-[2rem] mb-5 "> he Date</h2>
            <div className="flex flex-col gap-1  items-end p-2" >
                <p className="text-lg font-bold" style={{color:data.theme?.headingFont}}>Resepsi</p>
                <div className=" pb-4 text-sm text-right">
                    <p><strong> {data.TanggalResepsi} </strong></p>
                    <p>Jam {data.JamResepsi}</p>
                </div>
                {data.LokasiAkad == data.LokasiResepsi ? (
                    <div className="h-[7vw] flex items-center">
                        <a href={data.LinkGoogleMapsResepsi} target="blank" className=" pointer-events-auto">
                            <button className="border-1 text-xs flex p-1 border-rounded">
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
                ) :
                (
                    <div className="w-full flex flex-col items-end">
                        <p className="text-xs mb-4 text-right md:h-[7vw]">{data.LokasiResepsi}</p>
                        <a href={data.LinkGoogleMapsResepsi} target="blank" className=" pointer-events-auto ">
                            <button className="border-1 text-xs flex p-1 items-center rounded-md hover:scale-110 transition" style={{background:data.theme?.bodyFont, color:data.theme?.PrimaryColor}}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                                fill="currentColor"
                                >
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/>
                                </svg>  Google map
                            </button>
                        </a>
                    </div>
                )}
            </div>
            {data.note &&(
                <div className="w-full">
                    <p className="text-[0.5rem] text-right leading-none" style={{color:data.theme?.headingFont}}>{data.note}</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default Halaman7;