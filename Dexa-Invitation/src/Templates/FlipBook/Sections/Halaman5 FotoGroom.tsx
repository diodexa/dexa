import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const Halaman5  = ({data}:Props) =>  {
  return (
    <div className="Kertas__half Kertas__half--front  flex flex-col justify-start items-center"
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
      <img src={data.FotoGroom} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="z-2 mt-5">
        <h2 className="text-5xl font-BetterChill ">Groom</h2>
      </div>
      
    </div>
  );
};

export default Halaman5;