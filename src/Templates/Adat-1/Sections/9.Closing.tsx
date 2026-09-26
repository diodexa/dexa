import { useEffect, useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
}

const Closing = ({ data }: Props) => {
  const images = data.gallery ?? [];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 py-12 text-center" style={{ color: data.theme?.contrasfont }}>
      <div className="absolute inset-0 opacity-70 backdrop-blur-xl"  />
      <div className="relative z-10 w-full max-w-[430px]">
        <div className="relative h-[550px] w-full overflow-hidden rounded-[8px]">
          {images.map((image, index) => (
            <img key={index} src={image} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 shadow-xl ${currentSlide === index ? "opacity-100" : "opacity-0"}`} />
          ))}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-6 pb-8 pt-32 text-white">
            <p className="mb-3 text-[8px] uppercase tracking-[0.4em] opacity-80">With Love</p>
            <p className="text-4xl font-Tempting">{data.NamabridePanggilan} & {data.NamagroomPanggilan}</p>
            {data.Closing && <p className="mx-auto mt-4 max-w-[320px] whitespace-pre-line text-[10px] leading-5 opacity-80">{data.Closing}</p>}
          </div>
        </div>
        
        <div className="mt-6"  >
          <div className="mx-auto w-9">
            <img src="/logo-dio.webp" alt="" />
          </div>
          <p className=" text-[8px] tracking-[.25em] opacity-50">dexa-invitation.com</p>
        </div>
      </div>
    </section>
  );
};

export default Closing;