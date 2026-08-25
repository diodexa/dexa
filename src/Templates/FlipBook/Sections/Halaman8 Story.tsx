import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation
}

const Halaman8  = ({data}:Props) =>  {
  return (
    <div className="Kertas__half Kertas__half--back  flex"
    style={{background: data.theme?.warna1, color: data.theme?.warna2}}>
      {data.Background?.Background8 ? (
        <img src={data.Background.Background8} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ): <>
      <div className="flex flex-col items-end w-full h-full pt-5">
          <h2 className="font-SephoraHayden text-[2rem] mb-5 ">Our</h2>
          <div className="flex flex-col gap-1 items-start p-2 ">
            {data.Story?.slice(0,2).map((Cerita,index)=>{
              return (
                <div key={index} className={`flex flex-row-reverse border p-1 w-full  mb-1`}>
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
      </div>
      </>}
    </div>
  )
};

export default Halaman8;