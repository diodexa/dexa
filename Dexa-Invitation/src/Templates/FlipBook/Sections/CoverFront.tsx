import type { Invitation } from "../../../types/invitationType";
import Countdown from "../../Components/Countdown";

interface Props {
  data: Invitation
}

const CoverFront = ({data}: Props) => {

  // const brideInitial = data.bride.charAt(0);
  // const groomInitial = data.groom.charAt(0);
  

  return (
    <div className="Kertas__half Kertas__half--front  Cover-wrapper " style={{
    "--bg1": data.theme?.contrasfont} as React.CSSProperties} >
      <img src={data.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-start z-2" style={{color:data.theme?.warna2}}>
          <p className="tracking-[0.2rem] text-[0.8rem] flex-1 " >The Wedding of </p>
        <div className="text-center w-full relative">
        
          <h1 className="font-Signature text-3xl m-0 flex flex-col leading-none">
            <span>{data.NamabridePanggilan}</span> &
            <span>{data.NamagroomPanggilan}</span>
          </h1>
        </div>
        
        <div className="w-full text-[0.5rem] mb-1 scale-75" style={{"--bg2": data.theme?.warna2} as React.CSSProperties}>
          <Countdown date={`${data.TanggalAkadISO}T${data.JamAkad}:00`}  />
        </div>
      </div>

   
    </div>
  );
};

export default CoverFront;