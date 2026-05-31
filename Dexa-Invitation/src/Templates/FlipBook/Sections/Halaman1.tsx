import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const Halaman1 = ({data}:Props) => {
  return (
    <div className="Kertas__half Kertas__half--front  flex flex-col items-center justify-center" 
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
        <div className="w-full p-2 text-right break-words">
          <h2 className={`leading-none uppercase ${(data.Salam?.length ?? 0) > 20 ? "text-sm" : "text-lg"}`}> <strong> {data.Salam} </strong></h2>
        </div>
        <div className="text-left p-2 text-[0.6rem] font-light leading-4">
          <p>{data.Sambutan}</p>
        </div>
     
 
    </div>
  );
};

export default Halaman1;