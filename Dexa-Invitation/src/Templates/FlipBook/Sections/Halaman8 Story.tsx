import type { Invitation } from "../../../types/invitationFlipBook";
import { CardLeft } from "../Components/CardLeft";

interface Props {
  data: Invitation
}

const Halaman8  = ({data}:Props) =>  {
  return (
    <div className="Kertas__half Kertas__half--back  flex w-full h-full"
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
        <div className="flex flex-col items-end w-full h-full pt-5">
            <h2 className="font-SephoraHayden text-[2rem] mb-5 ">Our</h2>
            <div className="flex flex-col gap-1 items-start p-2">
                <CardLeft 
                Image={data.gallery[4]} 
                Head={data.Story?.Head1} 
                Content={data.Story?.Story1} />
                <CardLeft 
                Image={data.gallery[3]} 
                Head={data.Story?.Head2} 
                Content={data.Story?.Story2} />

            </div>
        </div>
    </div>
  )
};

export default Halaman8;