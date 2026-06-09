import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const Halaman2  = ({data}:Props) =>  {
  return (
    <div className="Kertas__half Kertas__half--back  flex flex-col justify-start items-center relative"
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
      {data.Papper?.Halaman2 ? (
        <img src={data.Papper.Halaman2} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <>
        <img src={data.FotoBride} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="z-2 mt-5">
          <h2 className="text-5xl font-BetterChill ">Bride</h2>
        </div>
        </>
      )
      }
      
    </div>
  );
};

export default Halaman2;