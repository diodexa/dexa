import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const Halaman1 = ({data}:Props) => {
  const intialPria = data.Namagroom.charAt(0);
  return (
    <div className="Kertas__half Kertas__half--front  flex flex-col justify-center" 
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
      
      <div className="flex w-full justify-start mb-10">
        <h2 className="font-SephoraHayden text-[4rem] mt-10 pl-1">{intialPria}</h2>
      </div>
      <div className=" flex-1">
        <div className="w-full p-2 text-left break-words">
          <p className={`leading-none font-light ${(data.Salam?.length ?? 0) > 20 ? "text-sm" : "text-lg"}`}> <strong> {data.NamaSurat} </strong></p>
        </div>
        <div className={`text-left p-2 text-[0.7rem]  leading-4 ${(data.NamaSurat?.length ?? 0) > 14 ? "mt-3" : "mt-5"}`}>
          <p>{data.Ayat}</p>
        </div>
              {/* <div className="text-left p-2 font-light leading-4 flex flex-col gap-4">
                <p className="text-[0.8rem]"> <strong>{data.NamaSurat}</strong></p>
                <p className="text-[0.6rem]">{data.Ayat}</p>
              </div> */}
          
        </div>
      </div>
     
 
  );
};

export default Halaman1;