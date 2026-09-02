import { useEffect, useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  openGallery: (index: number) => void;
}

const Gallery = ({ data, openGallery }: Props) => {

    const gallery = data.gallery ?? [];

    const [current, setCurrent] = useState(1);
    const [transition, setTransition] = useState(true);

    const carouselGallery = gallery.length > 0
    ? [gallery[gallery.length - 1], ...gallery, gallery[0]]
    : [];

    useEffect(() => {
    if (gallery.length <= 1) return;

    const interval = setInterval(() => {
        setCurrent((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
    }, [gallery.length]);

    useEffect(() => {
    if (current === gallery.length + 1) {
        const timeout = setTimeout(() => {
        setTransition(false);
        setCurrent(1);
        }, 700);

        return () => clearTimeout(timeout);
    }

    if (!transition) {
        requestAnimationFrame(() => {
        setTransition(true);
        });
    }
    }, [current, gallery.length, transition]);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5 py-16" style={{ background: data.theme?.warna1, color: data.theme?.warna2 }}>
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.4em]">Our Gallery</p>
        <h2 className="mt-2 text-3xl">Beautiful Memories</h2>
      </div>

      <div className="w-full max-w-[600px] flex flex-col gap-2">
        {/* FOTO 1 & 2 */}
        <div className="grid grid-cols-2 gap-2">
            {gallery.slice(0, 2).map((foto, index) => (
            <div key={index} className="h-[120px] overflow-hidden rounded-xl">
                <img src={foto} alt="" className="w-full h-full object-cover" onClick={()=>openGallery(index)}/>
            </div>
            ))}
        </div>

        {/* CAROUSEL LANDSCAPE */}
        <div className="w-full aspect-video overflow-hidden rounded-xl">
            <div
                className={`flex h-full ${transition ? "transition-transform duration-700 ease-in-out" : ""}`}
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {carouselGallery.map((foto, index) => (
                <div key={index} className="min-w-full h-full flex-shrink-0">
                    <img src={foto} alt="" className="w-full h-full object-contain" />
                </div>
                ))}
            </div>
            </div>

        {/* FOTO 3 & 4 */}
        <div className="grid grid-cols-2 gap-2">
            {gallery.slice(2, 4).map((foto, index) => (
            <div key={index} className="h-[120px] overflow-hidden rounded-xl">
                <img src={foto} alt="" className="w-full h-full object-cover" onClick={()=>openGallery(index)} />
            </div>
            ))}
        </div>

        {/* FOTO 5 & 6 */}
        <div className="grid grid-cols-2 gap-2">
            {gallery.slice(4, 6).map((foto, index) => (
            <div key={index} className="h-[120px] overflow-hidden rounded-xl">
                <img src={foto} alt="" className="w-full h-full object-cover" onClick={()=>openGallery(index)}/>
            </div>
            ))}
        </div>
        </div>
    </section>
  );
};

export default Gallery;