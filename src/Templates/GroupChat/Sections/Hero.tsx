import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  guest: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero = ({ data, guest, isOpen, setIsOpen }: Props) => {
  return (
    <section className={`fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`} style={{ background: data.theme?.warna1 }}>
      <div className="absolute top-8 left-8">
        <p className="text-[9px] tracking-[0.4em] uppercase" style={{ color: data.theme?.warna3 }}>
          Group Invitation
        </p>
      </div>

      <div className="relative w-[88%] max-w-sm overflow-hidden rounded-[2rem] shadow-2xl" style={{ background: data.theme?.warna2 }}>
        <div className="relative h-72 w-full overflow-hidden">
          {data.Background?.CoverFront ? (
            <img src={data.Background.CoverFront} alt="Group" className="h-full w-full object-cover" />
          ) : (
            <img src="/logo-dio.webp" alt="Group" className="h-full w-full object-contain" />
          )}
        </div>

        <div className="px-6 pt-6 pb-7 text-center">
          <p className="text-[9px] tracking-[0.35em] uppercase" style={{ color: data.theme?.warna1 }}>
            Wedding Invitation
          </p>

          <h1 className="mt-3 Judul font-BetterChill text-5xl leading-none" style={{ color: data.theme?.warna1 }}>
            {data.NamabridePanggilan}
          </h1>

          <div className="flex items-center justify-center gap-3 my-1">
            <span className="w-8 h-px" style={{ background: data.theme?.warna1 }} />
            <span style={{ color: data.theme?.warna1 }}>&</span>
            <span className="w-8 h-px" style={{ background: data.theme?.warna1 }} />
          </div>

          <h1 className="Judul font-BetterChill text-5xl leading-none" style={{ color: data.theme?.warna1 }}>
            {data.NamagroomPanggilan}
          </h1>

          <div className="mt-5 pt-4 border-t" style={{ borderColor: `${data.theme?.warna1}40` }}>
            <p className="text-[9px] tracking-[0.3em] uppercase opacity-60">
              You're Invited
            </p>

            <p className="mt-1 text-base font-semibold">
              {guest}
            </p>

            <button onClick={() => setIsOpen(true)} className="mt-5 w-full rounded-xl py-3 text-sm font-semibold tracking-[0.15em] uppercase transition-transform duration-200 hover:scale-[1.02] active:scale-95" style={{ background: data.theme?.warnaButtonBackground, color: data.theme?.warnaButtonBorder }}>
              Join
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;