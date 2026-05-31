import type { Invitation } from "../../../types/invitationFlipBook";
import Countdown from "../Components/Countdown";

interface Props {
  data: Invitation
}

const CoverFront = ({data}: Props) => {

  // const brideInitial = data.bride.charAt(0);
  // const groomInitial = data.groom.charAt(0);
  

  return (
    <div className="Kertas__half Kertas__half--front  Cover-wrapper " style={{
    "--bg1": data.theme?.CoverFrontPrimaryColor} as React.CSSProperties} >
      <img src={data.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-end z-2" style={{color:data.theme?.bodyFont}}>
        <div className="text-center w-full relative">
          <p className="text-[0.6rem] mb-1" >The Wedding</p>
        
          <h1 className="font-cursive text-3xl m-0  flex flex-col leading-none">
            <span>{data.Namabride}</span>
            <span className="ml-3">{data.Namagroom}</span>
          </h1>
        </div>
        
        <div className="w-full text-[0.5rem] mb-1 scale-75" style={{"--bg2": data.theme?.bodyFont} as React.CSSProperties}>
          <Countdown date={data.date}  />
        </div>
      </div>

   
    </div>
  );
};

export default CoverFront;