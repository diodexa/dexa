import { useEffect, useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

const ModalGallery = ({isOpen,images,initialIndex = 0,onClose}: Props) => {
  const [current, setCurrent] = useState(initialIndex);
  const thumbRefs = useRef<(HTMLImageElement | null)[]>([]);
  
  useEffect(() => {
    setCurrent(initialIndex);
  }, [initialIndex]);


useEffect(() => {
  thumbRefs.current[current]?.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });
}, [current]);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-[95%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Main Image */}
        <div className="relative">
          <img
            src={images[current]}
            alt=""
            className="w-full h-[60vh] object-cover rounded-lg"
          />

          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
                >
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>
        </div>

        {/* Thumbnail */}
        <div className="flex gap-1 mt-3 overflow-x-auto">
          {images.map((img, index) => (
            <img
                key={index}
                src={img}
                ref={(el)=>{thumbRefs.current[index]=el}}
                onClick={() => setCurrent(index)}
                className={`w-16 h-16 object-cover shrink-0 transition-all duration-300
                ${current === index
                    ? "scale-140  opacity-100"
                    : "opacity-60"}
                `}
            />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ModalGallery;