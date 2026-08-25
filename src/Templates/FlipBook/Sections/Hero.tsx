import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  guest: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero = ({ data, guest, isOpen, setIsOpen }: Props) => {
  return (
    <section
      className={`fixed inset-0 z-9998 overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
      style={{ background: data.theme?.warna1, color: data.theme?.warna2 }}
    >
      {/* SOFT BACKGROUND */}
      <div className="absolute inset-0 opacity-20" style={{ background: data.theme?.warna3 }} />
      <div className="absolute -right-24 top-20 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: data.theme?.warna3 }} />
      <div className="absolute -left-24 bottom-10 h-64 w-64 rounded-full blur-3xl opacity-20" style={{ background: data.theme?.warna2 }} />

      {/* FRAME */}
      <div className="absolute inset-4 border opacity-30 pointer-events-none" style={{ borderColor: data.theme?.warna3 }} />

      {/* HEADER */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: data.theme?.warna3 }}>
            Wedding
          </p>
          <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: data.theme?.warna3 }}>
            Invitation
          </p>
        </div>
      </div>

      {/* PHOTO */}
      <div className="absolute top-[18%] right-[8%] w-[55vw] max-w-[230px]">
        <div className="absolute -inset-2 border opacity-40 rotate-3" style={{ borderColor: data.theme?.warna3 }} />
        <div className="relative aspect-[3/4] overflow-hidden">
          <img src={data.coverImage} className="h-full w-full object-cover" alt="" />
        </div>
      </div>

      {/* SIDE TEXT */}
      <div className="absolute left-8 top-[23%]">
        <p className="[writing-mode:vertical-rl] rotate-180 text-[9px] tracking-[0.35em] uppercase opacity-70">
          A Story About Two Souls
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="absolute left-8 right-8 bottom-9">
        <p className="text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: data.theme?.warna3 }}>
          The Wedding Of
        </p>

        <div className="flex items-end gap-3">
          <h1 className="Judul font-BetterChill text-6xl leading-[0.75]" style={{ color: data.theme?.warna3 }}>
            {data.NamabridePanggilan}
          </h1>
          <span className="mb-1 text-xl" style={{ color: data.theme?.warna3 }}>&</span>
        </div>

        <h1 className="Judul font-BetterChill text-6xl leading-[0.75] mt-1" style={{ color: data.theme?.warna3 }}>
          {data.NamagroomPanggilan}
        </h1>

        <div className="mt-5 flex items-center gap-4">
          <span className="h-px w-10" style={{ background: data.theme?.warna3 }} />
          <p className="text-xs tracking-[0.2em]" style={{ color: data.theme?.warna3 }}>
            {data.TanggalAkad}
          </p>
        </div>

        {/* GUEST + BUTTON */}
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase opacity-60">
              Dear
            </p>
            <p className="mt-1 text-sm font-semibold">
              {guest}
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase transition-transform duration-300 active:scale-95"
            style={{
              background: data.theme?.warnaButtonBackground,
              color: data.theme?.contrasfont,
            }}
          >
            Open
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;