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
      <div className="flex flex-col items-start w-full  pt-5">
          <h2 className="font-SephoraHayden text-[2rem] mb-5 ">Story</h2>
          {data.Story?.slice(2,4).map((Cerita,index)=>{
              return (
                <div key={index} className={`flex flex-row border p-1 w-full h-1/2 mb-1`}>
                  <div className="leading-none text-right w-2/4 pr-1">
                      <h2 className="text-[0.8rem] lg:text-[0.6rem] mb-1"><strong>{Cerita.Head}</strong></h2>
                      <p className="text-[0.6rem] lg:text-[0.5rem] whitespace-pre-line">{Cerita.Story}</p>
                  </div>
                  <div className="relative w-2/4 ">
                      <img src={data.gallery?.[index % 2 === 0 ? 3 : 4]} alt="Foto Story" className="w-1/3  absolute inset-0 w-full h-full object-cover object-center" />
                  </div>
                </div>
              )
            })}
      </div>
      </>}
    </div>
  )
};

export default Halaman9;