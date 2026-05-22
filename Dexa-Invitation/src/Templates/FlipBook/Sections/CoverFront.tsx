import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const CoverFront = ({data}: Props) => {

  const brideInitial = data.bride.charAt(0);
  const groomInitial = data.groom.charAt(0);

  return (
    <div className="Kertas__half Kertas__half--front bg-gray-300 cover-card" style={{
    "--bg1": data.theme?.CoverFrontPrimaryColor,
    "--bg2": data.theme?.CoverFrontSecondaryColor,} as React.CSSProperties}>
 
      <div className="absolute inset-2 flex flex-col items-center justify-center text-center" style={{color:data.theme?.bodyFont}}>
        <h2 className="mt-10 text-lg"> INVITATION</h2>
        <div className="flex-1 flex items-center justify-center">
          <p className="Judul leading-none my-4"> 
            <span className="block -translate-x-2 -rotate-6"> {brideInitial}</span> 
            <span className="block translate-x-2 rotate-6">{groomInitial}</span> 
          </p>
        </div>
        <p className="flex-none">{data.date}</p>
        
      </div>

   
    </div>
  );
};

export default CoverFront;