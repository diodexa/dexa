import type { Invitation } from "../../../types/invitationFlipBook";
import { CardRight } from "../Components/CardRight";

interface Props {
  data: Invitation
}

const Halaman9  = ({data}:Props) =>  {
  return (
    <div className="Kertas__half Kertas__half--front  flex w-full h-full relative"
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
      {data.Papper?.Halaman9 ? (
        <img src={data.Papper.Halaman9} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ): <>
      <div className="flex flex-col items-start w-full h-full pt-5">
          <h2 className="font-SephoraHayden text-[2rem] mb-5 ">Story</h2>
          <div className="flex flex-col gap-1 items-start p-2">
              <CardRight 
              Image={data.gallery[5]} 
              Head={data.Story?.Head3} 
              Content={data.Story?.Story3} />
              <CardRight 
              Image={data.gallery[6]} 
              Head={data.Story?.Head4} 
              Content={data.Story?.Story4} />

          </div>
      </div>
      </>}
    </div>
  )
};

export default Halaman9;