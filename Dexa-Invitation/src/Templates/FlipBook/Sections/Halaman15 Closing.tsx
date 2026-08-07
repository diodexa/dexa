import type { Invitation } from "../../../types/invitationFlipBook";
import { CardRight } from "../Components/CardRight";

interface Props {
  data: Invitation
  
}

const Halaman15  = ({data}:Props) =>  {
  return (
    <div className="Kertas__half Kertas__half--front  flex w-full h-full relative"
    style={{background: data.theme?.warna1, color: data.theme?.warna2}}>
      {data.Papper?.Halaman15 ? (
        <img src={data.Papper.Halaman9} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ): <>
      <div className="flex flex-col  w-full h-full pt-5">
        <h2>ini closing</h2>
      </div>
      </>}
    </div>
  )
};

export default Halaman15;