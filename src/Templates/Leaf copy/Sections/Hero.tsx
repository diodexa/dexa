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
      style={{ background: data.theme?.warnaweddingInvitation, color: data.theme?.warna3 }}
    >
      <div className="h-full flex flex-col">
        {/* PHOTO */}
        <div className="relative h-[53%] w-full overflow-hidden">
          <img src={data.coverImage}
            className="h-full w-full object-cover"
            alt=""/>

          <div className="absolute inset-x-0 bottom-0 h-24"
            style={{
              background: `linear-gradient(to bottom, transparent, ${data.theme?.warnaweddingInvitation})`,
            }}
          />

          <p className="absolute top-7 left-7 text-[9px] tracking-[0.4em] uppercase"
            style={{ color: data.theme?.warna3 }}>
            Wedding Invitation
          </p>


        </div>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col items-center text-center px-7">
          <p
            className="mt-1 text-[9px] tracking-[0.35em] uppercase"
            style={{ color: data.theme?.warna3 }}
          >
            The Wedding Of
          </p>

          <h1
            className="mt-2 Judul font-BetterChill text-5xl leading-none"
            style={{ color: data.theme?.warna3 }}
          >
            {data.NamabridePanggilan}
          </h1>

          <div className="flex items-center gap-3 my-1">
            <span className="w-7 h-px" style={{ background: data.theme?.warna3 }} />
            <span style={{ color: data.theme?.warna3 }}>&</span>
            <span className="w-7 h-px" style={{ background: data.theme?.warna3 }} />
          </div>

          <h1
            className="Judul font-BetterChill text-5xl leading-none"
            style={{ color: data.theme?.warna3 }}
          >
            {data.NamagroomPanggilan}
          </h1>

          <p
            className="mt-3 text-xs tracking-[0.2em]"
            style={{ color: data.theme?.warna3 }}
          >
            {data.TanggalAkad}
          </p>

          <div className="mt-auto pb-7 flex flex-col items-center">
            <p className="text-[9px] tracking-[0.3em] uppercase opacity-60">
              Dear
            </p>

            <p className="mt-1 text-sm font-semibold">
              {guest}
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="mt-3 px-8 py-2.5 text-[10px] tracking-[0.3em] uppercase transition-all duration-300 active:scale-95"
              style={{ background: data.theme?.warnaButtonBackground,
                color: data.theme?.warnaButtonBorder,}}>
              Buka Undangan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;