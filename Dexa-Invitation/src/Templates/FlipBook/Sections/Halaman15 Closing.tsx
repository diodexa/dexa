import { Bold } from "lucide-react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  
}

const Halaman15 = ({ data }: Props) => {
  const images = data.gallery ?? [];

  return (
    <div className="Kertas__half Kertas__half--front w-full h-full"
      style={{ background: data.theme?.warna1, color: data.theme?.warna2}}>
      <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to top,${data.theme?.contrasfont},
              transparent)`,}}/>
      {images.slice(3, 6).map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 flex justify-center items-center"
          style={{
            opacity: 0,
            animation: "zoomfade 12s infinite",
            animationDelay: `${index * 4}s`,
          }}
        >
          <img
            src={image}
            alt={`Foto ${index + 1}`}
            className="w-full h-full object-cover"
          />

        </div>
      ))}
      <div className="absolute bottom-0 z-10 mb-2">

          <p className="leading-none text-[0.7rem] px-[0.2rem] mb-2 whitespace-pre-line"> {data.Closing} </p>
          <p className="text-2xl font-BetterChill"
          style={{color:data.theme?.warna3 , font:Bold}}>{data.NamabridePanggilan} & {data.NamagroomPanggilan}</p>
      </div>
    </div>
  );
};

export default Halaman15;