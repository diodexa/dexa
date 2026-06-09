import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const CoverBack = ({data}: Props) => {
  const initialWanita = data.Namabride.charAt(0);
  return (
    <div className="Kertas__half Kertas__half--back flex flex-col justify-center relative" style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
      {data.Papper?.CoverBack ? (
        <img src={data.Papper.CoverBack} alt="" className="object-cover w-full h-full absolute"/>
      ): (
        <>
          <div className="flex w-full justify-end mb-10">
            <h2 className=" font-SephoraHayden text-[4rem] mt-10 pr-2">{initialWanita}</h2>
          </div>
          <div className="flex-1 ">
            <div className="w-full p-2 text-right break-words">
              <h2 className={`leading-none uppercase  ${(data.Salam?.length ?? 0) > 20 ? "text-sm" : "text-lg"}`}> <strong> {data.Salam} </strong></h2>
            </div>
            <div className="text-right p-2 text-[0.7rem]  leading-4">
              <p>{data.Sambutan}</p>
              <br />
              <p>Hormat kami,</p>
              <p>Keluarga kedua mempelai</p>
            </div>
          </div>
        </>
      )
      };
      
    </div>
  );
};

export default CoverBack;