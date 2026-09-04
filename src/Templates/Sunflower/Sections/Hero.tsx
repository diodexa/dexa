import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  guest: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero = ({ data, guest, isOpen, setIsOpen }: Props) => {
  return (
    <section className={`fixed inset-0 z-9998 overflow-hidden transition-all duration-700 ease-in-out max-w-[385px] mx-auto ${
        isOpen
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
      style={{
        background: data.theme?.warnaweddingInvitation,
        color: data.theme?.warna3,
      }}>
        <div className="pointer-events-none opacity-50 z-1">
            <div className="absolute bottom-0 -left-40 w-full h-[200px] rotate-45">
                <div className="sway-flower w-full h-full bg-no-repeat"
                style={{ backgroundImage: "url('/Ornament/sun5.png')" }}/>
                </div>
            <div className="absolute bottom-0 -right-40 w-full h-[200px] -rotate-45">
                <div className="sway-flower w-full h-full bg-no-repeat"
                style={{ backgroundImage: "url('/Ornament/sun5.png')" }}/>
            </div>
        </div>
      <div className="flex h-full flex-col">
        {/* PHOTO */}
        <div className="relative flex h-[55%] w-full items-center justify-center">
          {/* FRAME */}
          <div
            className="absolute h-[88%] w-[72%] rounded-t-[50%] rounded-b-[14px] border"
            style={{
              borderColor: data.theme?.warna3,
              opacity: 0.6,
            }}
          />

          {/* PHOTO */}
          <div className="relative h-[85%] w-[69%] overflow-hidden rounded-t-[50%] rounded-b-[10px]">
            <img
              src={data.coverImage}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>


        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col items-center px-7 text-center z-2" >
          <p
            className="text-[9px] uppercase tracking-[0.35em]"
            style={{ color: data.theme?.warna3 }}
          >
            The Wedding Of
          </p>

          <h1
            className="Judul mt-2 font-BetterChill text-5xl leading-none"
            style={{ color: data.theme?.warna2 }}
          >
            {data.NamabridePanggilan}
          </h1>

          <div className="my-1 flex items-center gap-3">
            <span
              className="h-px w-7"
              style={{ background: data.theme?.warna3 }}
            />
            <span style={{ color: data.theme?.warna2 }}>&</span>
            <span
              className="h-px w-7"
              style={{ background: data.theme?.warna3 }}
            />
          </div>

          <h1
            className="Judul font-BetterChill text-5xl leading-none"
            style={{ color: data.theme?.warna2 }}
          >
            {data.NamagroomPanggilan}
          </h1>

          <p
            className="mt-3 text-xs tracking-[0.2em]"
            style={{ color: data.theme?.warna3 }}
          >
            {data.TanggalAkad}
          </p>

          {/* BOTTOM */}
          <div className="mt-auto flex flex-col items-center pb-7">
            <p className="text-[9px] uppercase tracking-[0.3em] opacity-60">
              Dear
            </p>

            <p className="mt-1 text-sm font-semibold">
              {guest}
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="mt-3 px-8 py-2.5 text-[10px] uppercase tracking-[0.3em] transition-all duration-300 active:scale-95"
              style={{
                background: data.theme?.warnaButtonBackground,
                color: data.theme?.warnaButtonBorder,
              }}
            >
              Buka Undangan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
