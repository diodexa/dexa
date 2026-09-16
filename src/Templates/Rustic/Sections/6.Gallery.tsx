import { useEffect, useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  openGallery: (index: number) => void;
  animate: boolean
}

const Gallery = ({ data, openGallery, animate }: Props) => {
  const photos = data.gallery ?? [];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay foto besar
  useEffect(() => {
    if (photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-20">
      {/* Ornamen */}
      <div className="w-full h-full backdrop-blur-xs absolute inset-0"/>
      <div className="w-full h-full bg-white/20 absolute inset-0"/>
      {/* Header */}
      <div className={`relative z-10 mb-8 text-center ${animate ? "MunculBawah-1" : " opacity-0"}`}>
        <p className="mb-2 text-[.7em]  tracking-[0.1em] text-shadow"
          style={{ color: data.theme?.warna1 }} >
          Our Beautiful Moments
        </p>

        <h2 className="text-5xl"
          style={{ color: data.theme?.warna3}}>
          Gallery
        </h2>
      </div>

      {/* Gallery */}
      {photos.length > 0 && (
        <div className="relative z-10 w-full max-w-[430px]">
          {/* Foto besar / autoplay carousel */}
          <button type="button"
            onClick={() => openGallery(currentSlide)}
            className={`group mb-2 block w-full overflow-hidden rounded-xl ${animate? "Fadein-1": "opacity-0"}`} >
            <div className="relative aspect-[4/3] overflow-hidden">
              {photos.map((photo, index) => (
                <img key={index} src={photo}  alt={`Gallery ${index + 1}`}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                  currentSlide === index  ? "opacity-100": "opacity-0"}`}/>
              ))}
            </div>
          </button>

          {/* Foto lainnya */}
          {photos.length > 1 && (
            <div className="grid grid-cols-2 gap-2">
              {photos.slice(0).map((photo, index) => {
                const galleryIndex = index + 1;

                return (
                  <button key={galleryIndex}  type="button"
                    onClick={() => openGallery(galleryIndex)}
                    className={`group block w-full overflow-hidden rounded-xl ${animate ? index%2 ? "MunculKanan-1" :"MunculKiri-1" : " opacity-0"}`}>
                    <div className="aspect-square overflow-hidden">
                      <img src={photo}  alt={`Gallery ${galleryIndex + 1}`}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Caption
      <p  className="relative z-10 mt-8 max-w-[300px] text-center text-sm italic"
        style={{ color: data.theme?.warna3 }} >
        A collection of moments that we will always cherish.
      </p> */}
    </section>
  );
};

export default Gallery;
