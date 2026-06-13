import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
  openGallery: (index: number) => void;
  isActive: boolean;
}

const Halaman10 = ({data,openGallery,isActive}:Props) =>  {

  return (
    <div className="Kertas__half Kertas__half--back  flex w-full h-full"
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
        <div className="grid grid-cols-6 grid-rows-6 gap-1 h-full w-full p-1" style={{pointerEvents: isActive ? "auto" : "none"}}>
            <div className="col-span-6 row-span-2 relative" >
                <img src={data.gallery[0]} alt="" className="absolute w-full h-full object-cover object-top"
                onClick={() => openGallery(0)}/>
            </div>
            <div className="col-span-3 row-span-2 relative" >
                <img src={data.gallery[1]} alt="" className="absolute w-full h-full object-cover object-center"
                onClick={() => openGallery(1)}/>
            </div>
            <div className="col-span-3 row-span-4 relative" >
                <img src={data.gallery[2]} alt="" className="absolute w-full h-full object-cover object-center"
                onClick={() => openGallery(2)}/>
            </div>
            <div className="col-span-3 row-span-2 col-start-1 row-start-5 place-self-center  text-3xl font-Colvetica" style={{color:data.theme?.headingFont}}> 
                <strong><h2>Love <br/> Galery</h2></strong></div>
            {/* <div className="col-span-3 row-span-1 relative" style={{pointerEvents: isActive ? "auto" : "none"}}>
                <img src={data.gallery[4]} alt="" className="absolute w-full h-full object-cover object-center"
                onClick={() => openGallery(4)}/>
            </div> */}
        </div>
    </div>
  )
};

export default Halaman10;