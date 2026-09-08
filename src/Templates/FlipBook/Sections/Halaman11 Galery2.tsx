import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation
  openGallery: (index: number) => void;
  isActive: boolean;
}

const Halaman11 = ({data,openGallery,isActive}:Props) =>  {
    const gallery = data.gallery ?? [];
  return (
    <div className="Kertas__half Kertas__half--front  flex w-full h-full"
    style={{background: data.theme?.warna1, color: data.theme?.warna2}}>
        <div className="grid grid-cols-6 grid-rows-6 gap-1 h-full w-full p-1" style={{pointerEvents: isActive ? "auto" : "none"}}>
            <div className="col-span-3 row-span-2 relative" >
                <img src={gallery[3]} alt="" className="absolute w-full h-full object-cover object-center"
                onClick={() => openGallery(3)} loading="lazy" decoding="async"/>
            </div>
            <div className="col-span-3 row-span-2 relative" >
                <img src={gallery[4]} alt="" className="absolute w-full h-full object-cover object-center"
                onClick={() => openGallery(4) } loading="lazy" decoding="async"/>
            </div>
            <div className="col-span-6 row-span-2 relative" >
                <img src={gallery[5]} alt="" className="absolute w-full h-full object-cover object-top"
                onClick={() => openGallery(5)} loading="lazy" decoding="async"/>
            </div>
            <div className="col-span-3 row-span-2 relative">
                <img src={gallery[6]} alt="" className="absolute w-full h-full object-cover object-center"
                onClick={() => openGallery(6)} loading="lazy" decoding="async"/>
            </div>
            <div className="col-span-3 row-span-2 relative" >
                <img src={gallery[7]} alt="" className="absolute w-full h-full object-cover object-center"
                onClick={() => openGallery(7)} loading="lazy" decoding="async"/>
            </div>
        </div>
   
    </div>
  )
};

export default Halaman11;