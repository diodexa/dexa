import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  
}

const Closing = ({ data }: Props) => {
  const images = data.gallery ?? [];

  return (
    <div className="relative w-full h-[110vh] mt-0">
        <div className="absolute inset-0 ">

      <div className="absolute inset-0 z-10 pointer-events-none "
          style={{ background: `linear-gradient(to top,${data.theme?.warnaweddingInvitation}, transparent)`}}/>
      {images.slice(0, 3).map((image, index) => (
        <div key={index}
          className="absolute inset-0 flex justify-center items-center h-screen origin-top"
          style={{ opacity: 0,  animation: "zoomfade 12s infinite",animationDelay: `${index * 4}s`}}>
          <img src={image}  alt={`Foto ${index + 1}`} className="w-full h-full object-cover"/>

        </div>
      ))}
      <div className="absolute flex flex-col bottom-15 z-10 mb-20 w-full" >

          <p className="text-lg px-[0.2rem] mb-2 whitespace-pre-line"
          style={{color:data.theme?.warna3 }}> {data.Closing} </p>
          <p className="text-6xl font-BetterChill break-words"
          style={{color:data.theme?.warna3 }}>{data.NamabridePanggilan} & {data.NamagroomPanggilan}</p>
      </div>
        </div>
    </div>
  );
};

export default Closing;