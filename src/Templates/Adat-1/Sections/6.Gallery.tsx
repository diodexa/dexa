import { useEffect, useState } from "react";
import type { Invitation } from "../../../types/invitationType";
import ModalLook from "../../1.Components/ModalLook";

interface Props {
  data: Invitation;
  openGallery: (index: number) => void;
  animate: boolean;
}

const Gallery = ({ data, openGallery, animate }: Props) => {
  const photos = data.gallery ?? [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"image" | "video">("image");
  const [modalSrc, setModalSrc] = useState("");

  const openMedia = (src: string, type: "image" | "video") => {
    setModalSrc(src);
    setModalType(type);
    setModalOpen(true);
  };

  useEffect(() => {
    if (photos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-20">
      <div className="absolute inset-0 bg-white/20" />
      <div className="absolute inset-0 backdrop-blur-xs" />

      <div className={`relative z-10 mb-8 text-center ${animate ? "MunculBawah-1" : "opacity-0"}`}>
        <p className="mb-2 text-[.7em] tracking-[0.1em] text-shadow" style={{ color: data.theme?.warna3 }}>Our Beautiful Moments</p>
        <h2 className="text-5xl" style={{ color: data.theme?.warna3 }}>Gallery</h2>
      </div>

      {photos.length > 0 && (
        <div className="relative z-10 w-full max-w-[350px]">
          <div className="relative px-3 py-3">
            <div className={`pointer-events-none absolute -right-7 -top-10  w-[120px] ${animate ? "MunculKanan-1" : "opacity-0"}`}>
              <img src="/Ornament/BungaJawa3.webp" alt="" className="h-auto w-full scale-x-[-1] object-contain sway-flower2" />
            </div>
            <div className={`relative overflow-hidden rounded-2xl border-[1.5px] p-1 shadow-lg ${animate ? "Fadein-1" : "opacity-0"}`} style={{ borderColor: `${data.theme?.warna3}80`, background: `${data.theme?.warna1}80` }}>
              <div className="relative aspect-square overflow-hidden rounded-xl z-10">
                {data.video ? (
                  <button type="button" onClick={() => openMedia(data.video!, "video")} className="h-full w-full">
                    <video src={data.video}   className="h-full w-full object-cover" />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
                        ▶
                      </div>
                    </div>
                  </button>
                ) : (
                  <button type="button" onClick={() => openGallery(currentSlide)} className="h-full w-full">
                    {photos.map((photo, index) => (
                      <img key={index} src={photo} alt={`Gallery ${index + 1}`} className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-1000 grayscale ${currentSlide === index ? "opacity-100" : "opacity-0"}`} />
                    ))}
                  </button>
                )}
              </div>
            </div>


            <div className={`pointer-events-none absolute -bottom-5 -left-8  w-[110px] ${animate ? "MunculKiri-1" : "opacity-0"}`}>
              <img src="/Ornament/BungaJawa2.webp" alt="" className="h-auto w-full object-contain sway-flower" />
            </div>
          </div>

          {photos.length > 1 && (
            <div className="mt-6 grid grid-cols-2 gap-4 px-3">
              {photos.map((photo, index) => (
                <button key={index} type="button" onClick={() => { setCurrentSlide(index); openGallery(index); }} className={`relative  shadow-md transition-all duration-500 ${index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"} ${animate ? index % 2 === 0 ? "MunculKiri-1" : "MunculKanan-1" : "opacity-0"}`}>
                  
                    <img src={photo} alt={`Gallery ${index + 1}`} className="h-full w-full object-cover transition duration-700 hover:scale-105 grayscale" />
                  
                  <div className="absolute bottom-1.5 left-0 right-0 text-center">
                
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <ModalLook isOpen={modalOpen} images={modalSrc} type={modalType}  onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default Gallery;