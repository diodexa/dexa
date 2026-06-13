import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
  isActive: boolean;
}

const Halaman12 = ({data,isActive}:Props) =>  {

  return (
    <div className="Kertas__half Kertas__half--back  flex w-full h-full"
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
      {data.Papper?.Halaman12 ? (
        <img src={data.Papper.Halaman12} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ): <>
        <div className="flex flex-col items-center mt-2 w-full  " style={{pointerEvents: isActive ? "auto" : "none"}}>
            <h2 className="font-Colvetica text-2xl">Ucapan & Doa</h2>
            <div>
              <input type="text" className="w-full border text-lg"/>
            </div>
            <div className="border w-full h-full my-1">

            </div>
        </div>
        
      </>}
    </div>
  )
};

export default Halaman12;