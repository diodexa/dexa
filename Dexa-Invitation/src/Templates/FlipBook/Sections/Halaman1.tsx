import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const Halaman1 = ({data}:Props) => {
  return (
    <div className="Kertas__half Kertas__half--back  bg-gray-200 flex flex-col items-center justify-center">
      <div className=" p-3">
        <h2> <strong> {data.Salam} </strong></h2>
      </div>
      <div className="text-justify leading-3 p-2">
        <p>{data.Sambutan}</p>
      </div>
      <div>
        <p>{data.Ayat}</p>
        <p>{data.NamaSurat}</p>
      </div>
    </div>
  );
};

export default Halaman1;