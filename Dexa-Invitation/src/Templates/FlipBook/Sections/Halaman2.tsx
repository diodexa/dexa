import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const Halaman2  = ({data}:Props) =>  {
  return (
    <div className="Kertas__half Kertas__half--back bg-yellow-200 flex flex-col items-center justify-center">
      <img src={data.FotoBride} alt="Foto Pengantin Wanita" className="object-cover h-full"/>
      
    </div>
  );
};

export default Halaman2;