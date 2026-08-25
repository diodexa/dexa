import { useEffect, useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  images: string;
  initialIndex?: number;
  type?: "image" | "video";
  onClose: () => void;
}

const ModalLook = ({isOpen,images,initialIndex = 0, type = "image",onClose}: Props) => {
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


  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center "
      onClick={onClose}
    >
      <div
        className="w-[95%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Main Image */}
        <div className="relative">
          {type === "video" ? (
            <video src={images} controls playsInline muted
              className="w-full h-[60vh] object-cover rounded-lg"/>
          ) : (
            <img src={images} alt="" className="w-full h-[60vh] object-cover rounded-lg" />
          )}
        </div>

    
      </div>
    </div>
  );
};

export default ModalLook;