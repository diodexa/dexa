import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const Halaman1 = ({data}:Props) => {
  return (
    <div className="Kertas__half Kertas__half--front  bg-gray-200 flex flex-col items-center leading-3">
      <div className="flex-3">
        <div className=" p-3 text-left">
          <h2> <strong> {data.Salam} </strong></h2>
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