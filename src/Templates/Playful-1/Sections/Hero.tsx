import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  guest: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero = ({ data, guest, isOpen, setIsOpen }: Props) => {
  const StickerHeart = ({ className = "", rotate = "0deg" }: { className?: string; rotate?: string }) => (
    <div className={className} style={{ transform: `rotate(${rotate})` }}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <path d="M50 88C43 81 15 61 8 42C2 25 12 12 27 12C38 12 46 18 50 28C54 18 62 12 73 12C88 12 98 25 92 42C85 61 57 81 50 88Z" fill={data.theme?.warna3} stroke="white" strokeWidth="8" strokeLinejoin="round" />
      </svg>
    </div>
  );

  const StickerStar = ({ className = "", rotate = "0deg" }: { className?: string; rotate?: string }) => (
    <div className={className} style={{ transform: `rotate(${rotate})` }}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <path d="M50 5L61 37L95 38L68 58L77 92L50 72L23 92L32 58L5 38L39 37Z" fill={data.theme?.warna2} stroke="white" strokeWidth="8" strokeLinejoin="round" />
      </svg>
    </div>
  );

  const StickerText = ({ children, className = "", rotate = "0deg" }: { children: React.ReactNode; className?: string; rotate?: string }) => (
    <div className={`relative ${className}`} style={{ transform: `rotate(${rotate})` }}>
      <div className="absolute inset-[-7px] bg-white" style={{ clipPath: "polygon(3% 18%, 12% 7%, 27% 11%, 39% 4%, 52% 9%, 66% 5%, 81% 10%, 97% 20%, 92% 38%, 98% 53%, 92% 70%, 96% 86%, 80% 91%, 65% 96%, 50% 91%, 34% 97%, 20% 91%, 4% 87%, 8% 70%, 2% 54%, 8% 38%)" }} />
      <div className="relative z-10">{children}</div>
    </div>
  );

  return (
    <section className={`fixed inset-0 z-9998 mx-auto flex max-w-[385px] items-center justify-center overflow-hidden transition-all duration-700 ${isOpen ? "pointer-events-none opacity-0" : "MunculBawah-1 pointer-events-auto"}`} style={{ background: data.theme?.warnaweddingInvitation, color: data.theme?.warna3 }}>
      <div className="relative flex h-full w-full flex-col items-center px-7">

        {/* STICKER DEKORASI */}
        <StickerHeart className="absolute left-5 top-[15%] h-14 w-14 Fadein-1" rotate="-18deg" />
        <StickerStar className="absolute right-6 top-[15%] h-11 w-11 Fadein-1" rotate="16deg" />
        <StickerStar className="absolute left-8 top-[39%] h-7 w-7 Fadein-1" rotate="-22deg" />
        <StickerHeart className="absolute right-7 top-[45%] h-10 w-10 Fadein-1" rotate="18deg" />

        {/* INVITATION STICKER */}
        <div className={`mt-[14%] ${isOpen ? "opacity-0" : "Fadein-1"}`}>
          <div className="px-5 py-2 text-center">
            <p className="text-lg font-medium uppercase tracking-[.35em]" style={{ color: data.theme?.warna3 }}>Wedding Invitation</p>
          </div>
        </div>

        {/* NAMA */}
        <div className={`relative z-20 mt-[17%] flex flex-col items-center text-center font-KH-Blackline leading-[.8] ${isOpen ? "opacity-0" : "MunculBawah-1"}`} style={{ color: data.theme?.warna3 }}>
          <StickerText rotate="-5deg">
            <div className="px-5 py-3">
              <p className="text-7xl">{data.NamabridePanggilan}</p>
            </div>
          </StickerText>
          <div className="my-5 flex h-12 w-12 items-center justify-center text-6xl" style={{color:data.theme?.warna2}}>
            &
          </div>
          <StickerText rotate="4deg">
            <div className="px-5 py-3">
              <p className="text-7xl">{data.NamagroomPanggilan}</p>
            </div>
          </StickerText>
        </div>

        {/* LOVE NOTE */}
    
          <div className="px-7 py-2 text-center mt-5">
            <p className="uppercase tracking-[.1em]" style={{ color: data.theme?.warna3 }}>{data.TanggalAkad}</p>
          </div>


        {/* GUEST */}
        <div className={`mt-5 text-center ${isOpen ? "opacity-0" : "Fadein-1"}`}>
          <p className="text-sm uppercase tracking-[.45em]">Dear</p>
          <p className="mt-2 text-2xl" style={{ color: data.theme?.warna2 }}>{guest}</p>
        </div>

        {/* OPEN BUTTON */}
        <div className={`mt-4 ${isOpen ? "scale-110 opacity-0" : "MunculBawah-1"}`}>
          <button type="button" onClick={() => setIsOpen(true)} className="relative px-9 py-3 text-[9px] font-medium uppercase tracking-[.25em] transition-all duration-300 active:scale-90" style={{ color: data.theme?.warnaButtonBorder }}>
            <span className="absolute inset-0 shadow-md" style={{ clipPath: "polygon(4% 15%, 18% 5%, 35% 10%, 52% 3%, 69% 9%, 85% 5%, 97% 17%, 93% 39%, 98% 60%, 93% 84%, 76% 94%, 58% 89%, 40% 97%, 22% 91%, 4% 94%, 7% 72%, 2% 49%, 7% 27%)", background: data.theme?.warnaButtonBackground }} />
            <span className="relative z-10">Open Invitation</span>
          </button>
        </div>

        {/* TRANSISI */}
        <div className={`pointer-events-none absolute left-1/2 bottom-5 z-50 h-14 w-14 -translate-x-1/2 translate-y-1/2 rounded-full transition-transform duration-700 ease-in-out ${isOpen ? "scale-[35]" : "scale-0"}`} style={{ background: data.theme?.warna3 }} />
      </div>
    </section>
  );
};

export default Hero;