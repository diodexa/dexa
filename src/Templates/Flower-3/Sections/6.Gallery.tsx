import { useEffect, useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  openGallery: (index: number) => void;
  animate: boolean;
}

const Gallery = ({ data, openGallery, animate }: Props) => {
  const photos = data.gallery ?? [];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-20" >
      <div className="absolute inset-0 bg-white/20" />
      <div className="absolute inset-0 backdrop-blur-xs" />
      

      {/* Header */}
      <div className={`relative z-10 mb-10 text-center ${animate ? "MunculBawah-1" : "opacity-0"}`}>
        <p  className="mb-2 text-[.7em] tracking-[0.1em] text-shadow"
          style={{ color: data.theme?.warna3 }} >
          Our Beautiful Moments
        </p>
        <h2 className="text-5xl" style={{ color: data.theme?.warna3 }}>
          Gallery
        </h2>
      </div>

      {photos.length > 0 && (
        <div className="relative z-10 w-full max-w-[350px]">
          {/* Botanical Frame */}
          <div className="relative px-4 py-5">
            {/* Frame */}
            <div className={`relative overflow-hidden rounded-[45%_45%_12px_12px] border-[1.5px] p-1 shadow-lg ${ animate ? "Fadein-1" : "opacity-0" }`}
              style={{  borderColor: `${data.theme?.warna3}80`,  background: `${data.theme?.warna1}80`,  }}  >
              <button type="button"
                onClick={() => openGallery(currentSlide)}
                className="relative block w-full overflow-hidden rounded-[42%_42%_8px_8px]"  >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {photos.map((photo, index) => (
                    <img  key={index} src={photo} alt={`Gallery ${index + 1}`}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ currentSlide === index ? "opacity-100" : "opacity-0"  }`}
                    />
                  ))}
                </div>
              </button>
            </div>

    

            {/* Botanical kanan */}
            <div className={`absolute -right-7 top-0 z-20 w-[130px] ${
                animate ? "MunculKanan-1" : "opacity-0"
              }`}  >
              <img  src="/Ornament/BungaPinkTunggal2.webp"  alt=""
                className="h-auto w-full object-contain scale-x-[-1] sway-flower2" />
            </div>

            {/* Bunga kiri bawah */}
            <div className={`absolute -bottom-4 -left-8 z-30 w-[120px] ${
                animate ? "MunculKiri-1" : "opacity-0"
              }`} >
              <img src="/Ornament/LilyBouncet.webp"  alt=""
                className="h-auto w-full object-contain sway-flower"  />
            </div>


          </div>

          {/* Thumbnail */}
          {photos.length > 1 && (
            <div className="mt-5 grid grid-cols-3 gap-2 px-3">
              {photos.map((photo, index) => (
                <button key={index} type="button"
                  onClick={() => { setCurrentSlide(index);  openGallery(index); }}
                  className={`overflow-hidden rounded-lg border transition-all duration-500 ${
                    animate ? index % 2 ? "MunculKanan-1"  : "MunculKiri-1" : "opacity-0" } ${
                    currentSlide === index ? "scale-105 opacity-100" : "opacity-70"
                  }`}
                  style={{  borderColor: currentSlide === index ? data.theme?.warna3 : `${data.theme?.warna3}30`,}} >
                  <div className="aspect-square">
                    <img src={photo} alt={`Gallery ${index + 1}`}
                      className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Gallery;