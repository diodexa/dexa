import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  openGallery: (index: number) => void;
  animate: boolean;
}

const Gallery = ({ data, openGallery, animate }: Props) => {
  const photos = data.gallery ?? [];
  const rotations = ["-rotate-3", "rotate-2", "rotate-1", "-rotate-2", "rotate-3", "-rotate-1"];

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-20">


      {/* Header */}
      <div className={`relative z-10 mb-12 text-center ${animate ? "MunculBawah-1" : "opacity-0"}`}>
        <h2 className="font-KH-Blackline text-5xl" style={{ color: data.theme?.warna3 }}>Gallery</h2>
        <p className="mt-2 text-[11px]" style={{ color: data.theme?.warna2 }}>Jejak cerita dalam setiap kenangan...</p>
      </div>

      {photos.length > 0 ? (
        <div className="relative z-10 w-full max-w-[350px]">
          {/* Doodle dekorasi luar kolase */}
          <img src="/Ornament/doodleFlower.webp" alt="" className={`pointer-events-none absolute -left-5 -top-12 z-20 w-[85px] object-contain ${animate ? "MunculKiri-1" : "opacity-0"}`} />

          {/* Scrapbook collage */}
          <div className="grid grid-cols-2 items-start gap-x-4 gap-y-5 px-2">
            {photos.map((photo, index) => {
              const isLarge = index === 0 || index === 3;
              return (
                <button key={`${photo}-${index}`} type="button" onClick={() => openGallery(index)} className={`group relative ${isLarge ? "col-span-2 mx-5 w-[calc(100%-2.5rem)]" : "w-full"} ${rotations[index % rotations.length]} transition-transform duration-500 hover:z-10 hover:rotate-0 hover:scale-[1.03] ${animate ? index % 2 === 0 ? "MunculKiri-1" : "MunculKanan-1" : "opacity-0"}`}>
                  <div className="relative border p-2 pb-7 shadow-md bg-white" style={{ borderColor: `${data.theme?.warna3}45` }}>
                    <div className={`overflow-hidden ${isLarge ? "aspect-[5/3]" : "aspect-[4/5]"}`}>
                      <img src={photo} alt={`Gallery ${index + 1}`} loading={index > 3 ? "lazy" : "eager"} className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    
                  </div>
                 {/* Washi tape */}
                  <span className={`pointer-events-none absolute -top-2 left-1/2 h-4 w-10 -translate-x-1/2 opacity-70 ${index % 2 === 0 ? "rotate-[-8deg]" : "rotate-[6deg]"}`} style={{ background: `${data.theme?.warna2}55` }} />
                </button>
              );
            })}
          </div>


    
        </div>
      ) : (
        <p className="relative z-10 text-sm" style={{ color: data.theme?.warna3 }}>Our memories will be here ♡</p>
      )}

      {/* Vas bunga di luar kolase */}
      <img src="/Ornament/doodleStand.webp" alt="" className={`pointer-events-none absolute -bottom-0 -right-10 z-20 w-[150px] object-contain ${animate ? "MunculKanan-1" : "opacity-0"}`} />
      {/* Footer */}
      {photos.length > 0 && (
        <div className={`relative z-10 mt-14 text-center ${animate ? "MunculBawah-1" : "opacity-0"}`}>
          <p className="font-KH-Blackline text-lg" style={{ color: data.theme?.warna3 }}>Pamer bahagia dikit ♡</p>
          <p className="mt-1 text-[10px]" style={{ color: data.theme?.warna2 }}>Mohon dimaklumi, lagi kasmaran</p>
        </div>
      )}
    </section>
  );
};

export default Gallery;