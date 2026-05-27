import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const Halaman1 = ({data}:Props) => {
  console.log(data.Salam?.length)
  return (
    <div className="Kertas__half Kertas__half--front  flex flex-col items-center " 
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
      <div className="flex-3">
        <div className="w-full p-4 text-right break-words border-1 border-red-700">
          <h2 className={`leading-none uppercase ${(data.Salam?.length ?? 0) > 20 ? "text-sm" : "text-lg"}`}> <strong> {data.Salam} </strong></h2>
        </div>
        <div className="text-left p-2">
          <p>{data.Sambutan}</p>
        </div>
      </div>
      <div className="flex-2 ">
        <p>{data.Ayat}</p>
        <p>{data.NamaSurat}</p>
      </div>
    </div>
  );
};

export default Halaman1;