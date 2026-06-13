import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
  openGallery: (index: number) => void;
  isActive: boolean;
}

const Halaman11 = ({data,openGallery,isActive}:Props) =>  {

  return (
    <div className="Kertas__half Kertas__half--front  flex w-full h-full"
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
        <div className="grid grid-cols-6 grid-rows-6 gap-1 h-full w-full p-1" style={{pointerEvents: isActive ? "auto" : "none"}}>
            <div className="col-span-3 row-span-2 relative" >
                <img src={data.gallery[3]} alt="" className="absolute w-full h-full object-cover object-center"
                onClick={() => openGallery(3)}/>
            </div>
            <div className="col-span-3 row-span-2 relative" >
                <img src={data.gallery[4]} alt="" className="absolute w-full h-full object-cover object-center"
                onClick={() => openGallery(4)}/>
            </div>
            <div className="col-span-6 row-span-2 relative" >
                <img src={data.gallery[5]} alt="" className="absolute w-full h-full object-cover object-top"
                onClick={() => openGallery(5)}/>
            </div>
            <div className="col-span-3 row-span-2 relative">
                <img src={data.gallery[6]} alt="" className="absolute w-full h-full object-cover object-center"
                onClick={() => openGallery(6)}/>
            </div>
            <div className="col-span-3 row-span-2 relative" >
                <img src={data.gallery[7]} alt="" className="absolute w-full h-full object-cover object-center"
                onClick={() => openGallery(7)}/>
            </div>
        </div>
   
    </div>
  )
};

export default Halaman11;