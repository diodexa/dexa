import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation
}

const Halaman9  = ({data}:Props) =>  {
  return (
    <div className="Kertas__half Kertas__half--front  flex w-full  relative"
    style={{background: data.theme?.warna1, color: data.theme?.warna2}}>
      {data.Background?.Background9 ? (
        <img src={data.Background.Background9} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ): <>
      <div className="flex flex-col items-start w-full gap-3 pt-5">
          <h2 className="font-SephoraHayden text-[2rem] mb-5 ">Story</h2>
          <div className="flex flex-col gap-1 items-start justify-center p-2 ">
            {data.Story?.slice(2,4).map((Cerita,index)=>{
                return (
                  <div key={index} className={`flex flex-row border p-2 w-full  mb-1 justify-center`}>
                    <div className="leading-none text-right w-2/4 pr-1">
                        <h2 className="text-[0.7rem] lg:text-[0.5rem] mb-1"><strong>{Cerita.Head}</strong></h2>
                        <p className="text-[0.5rem]  whitespace-pre-line">{Cerita.Story}</p>
                    </div>
                    <div className="relative w-2/5 ">
                        <img src={data.gallery?.[index % 2 === 0 ? 3 : 4]} alt="Foto Story" className="  absolute inset-0 w-full h-full object-cover object-center" />
                    </div>
                  </div>
                )
              })}
          </div>
      </div>
      </>}
    </div>
  )
};

export default Halaman9;