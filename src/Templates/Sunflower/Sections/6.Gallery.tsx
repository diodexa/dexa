import type { Invitation } from "../../../types/invitationType";
import Video from "../../Leaf copy/Sections/video";

interface Props {
  data: Invitation;
  openGallery: (index: number) => void;
  scrollY: number;
  animate: boolean
}

const Gallery = ({ data, openGallery ,animate }: Props) => {
  const gallery = data.gallery ?? [];

  // Posisi dan rotasi masing-masing polaroid
  const positions = [
    { top: "3%", left: "8%", rotate: "-12deg" },
    { top: "3%", left: "50%", rotate: "0deg" },
    { top: "25%", left: "8%", rotate: "5deg" },
    { top: "25%", left: "51%", rotate: "-11deg" },
    { top: "45%", left: "3%", rotate: "-8deg" },
    { top: "48%", left: "43%", rotate: "-6deg" },
    { top: "65%", left: "18%", rotate: "-10deg" },
    { top: "68%", left: "58%", rotate: "7deg" },
  ];

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center overflow-x-clip px-5 pt-10"
      style={{ background: data.theme?.warna1,
        color: data.theme?.warna2,}} >
      {/* JUDUL */}
      <div className={`mb-8 text-center ${animate ? "MunculAtas-1 " : "opacity-0"}`}>
        <p className="text-xs uppercase tracking-[0.4em]">
          Our Gallery
        </p>

        <h2 className="mt-2 text-2xl font-Cenova uppercase">
          Beautiful Memories
        </h2>
      </div>

      {/* AWAN */}
      <div className="pointer-events-none opacity-70">
        <img src="/Ornament/awan1.png" alt=""
          className="MunculKiri absolute -left-1/2 -top-20 h-[50%] w-auto object-contain" />
      </div>

      <div className="pointer-events-none opacity-50">
        <img src="/Ornament/awan3.png" alt=""
          className="MunculKanan absolute left-1/2 top-60 h-[40%] w-auto object-contain"/>
      </div>

      {/* AREA POLAROID */}
      <div className="relative h-[650px] w-full max-w-[360px] overflow-hidden">
        {gallery.map((foto, index) => {
          const position = positions[index % positions.length];

          return (
            <div  key={index}
              className={`absolute w-[145px] cursor-pointer bg-white p-2 pb-8 shadow-lg transition-transform duration-300 hover:z-20 hover:scale-105  ${animate ? "Fadein-1 " : "opacity-0"}`}
              style={{ top: position.top, left: position.left, transform: `rotate(${position.rotate})`,}}
              onClick={() => openGallery(index)} >
              <div className="aspect-square w-full overflow-hidden">
                <img src={foto} alt="" className="h-full w-full object-cover"/>
              </div>
            </div>
          );
        })}
      </div>
      <Video data={data} />

    </section>
  );
};

export default Gallery;