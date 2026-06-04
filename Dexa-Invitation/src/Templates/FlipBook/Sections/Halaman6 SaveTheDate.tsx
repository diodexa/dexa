import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const Halaman6  = ({data}:Props) =>  {
  return (
    <div className="Kertas__half Kertas__half--back  flex w-full h-full"
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
        <div className="flex flex-col items-end w-full h-full pt-5 pr-2">
            <h2 className="font-SephoraHayden text-[2rem] flex-1">Save The Date</h2>
            <div className="flex flex-col gap-1">
                {data.TanggalAkad && (
                    <>    
                        <p>Akad</p>
                        <div className="flex pb-4 text-sm">
                            <p>{data.TanggalAkad}</p>
                            <p>Jam {data.JamAkad}</p>
                        </div>
                    </>
                )}
                {data.TanggalResepsi && (
                    <>    
                        <p>Resepsi</p>
                        <div className="flex pb-4 text-sm">
                            <p> {data.TanggalResepsi}</p>
                            <p>Jam {data.JamResepsi}</p>
                        </div>
                    </>
                )}
            </div>
            {/* <div className="p-1">
                <p>Location</p>
                <p className="text-xs">{data.location}</p>
                <a href={data.LinkGoogleMaps} target="blank" className="pointer-events-auto mt-2">
                    <img src={data.GoogleMaps} alt="" />
                </a>
            </div> */}
        </div>
    </div>
  );
};

export default Halaman6;