import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const Halaman10 = ({data}:Props) =>  {
  return (
    <div className="Kertas__half Kertas__half--back  flex w-full h-full"
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
      {data.Papper?.Halaman10 ? (
        <img src={data.Papper.Halaman10} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ): <>
        <div className="grid grid-cols-6 grid-rows-4 gap-1 h-full w-full p-1">
            <div className="col-span-3 row-span-2 relative">
                <img src={data.gallery[0]} alt="" className="absolute w-full h-full object-cover"/>
            </div>
            <div className="col-span-3 row-span-2 relative">
                <img src={data.gallery[1]} alt="" className="absolute w-full h-full object-cover"/>
            </div>
            <div className="col-span-6 row-span-1 relative">
                <img src={data.gallery[3]} alt="" className="absolute w-full h-full object-cover object-center"/>
            </div>
            <div className="col-span-3 row-span-1 self-center text-3xl font-Colvetica" style={{color:data.theme?.headingFont}}> 
                <strong><h2>Love <br/> Galery</h2></strong></div>
            <div className="col-span-3 row-span-1 relative">
                <img src={data.gallery[4]} alt="" className="absolute w-full h-full object-cover"/>
            </div>
        </div>
        
      </>}
    </div>
  )
};

export default Halaman10;