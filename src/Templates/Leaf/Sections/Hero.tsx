import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  guest: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero = ({ data, guest, isOpen, setIsOpen }: Props) => {
  return (
    <section className={`
        fixed inset-0 z-9998 overflow-hidden origin-top
        transition-all duration-[1200ms]
        ${ isOpen
            ? "scale-[1.12] opacity-0 blur-[2px] pointer-events-none"
            : "scale-100 opacity-100 blur-0"}`}
      style={{ background: data.theme?.warna1, color: data.theme?.warna2, }}>
      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: ` radial-gradient(circle at center,${data.theme?.warna3} 1px,transparent 1px )`,
          backgroundSize: "20px 20px",
        }}/>


      {/* CONTENT */}
      <div className="relative z-10 flex h-full flex-col items-center px-5">

        {/* HEADER */}
        <div className="pt-9 text-center">
          <p className="text-[9px] tracking-[0.4em] uppercase"
            style={{
              color: data.theme?.warnaweddingInvitation, }}>
            A Journey Begins
          </p>

          <div className="mx-auto mt-2 h-px w-8"
            style={{ background: data.theme?.warna3,}}/>
        </div>

        {/* FOTO */}
        <div className="relative mt-6 w-[58vw] max-w-[240px] ">

          {/* FRAME */}
          <div className="absolute -inset-1.5 rounded-t-full border "
            style={{ borderColor: data.theme?.warna3,opacity: 0.5,}}/>

          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full " >
            <img src={data.coverImage} alt="" className="h-full w-full object-cover"/>
          </div>

          {/* DATE */}
          <div  className=" absolute -bottom-3 left-1/2  -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] tracking-wider "
            style={{ background: data.theme?.warna3, color: data.theme?.warna1,}}>
            {data.TanggalAkad}
          </div>
        </div>

        {/* NAMA */}
        <div className="mt-7 text-center">

          <p className="text-[9px] tracking-[0.3em] uppercase"
            style={{ color: data.theme?.warnaweddingInvitation,}}>
            The Wedding Of
          </p>

          <h1 className="mt-1  Judul font-BetterChill text-5xl leading-[0.85]"
            style={{color: data.theme?.warna3,}}>
            {data.NamabridePanggilan}
          </h1>

          <p className="my-0.5 text-base"
            style={{ color: data.theme?.warna3,}}>
            &
          </p>

          <h1 className="Judul font-BetterChill text-5xl leading-[0.85] "
            style={{ color: data.theme?.warna3,}} >
            {data.NamagroomPanggilan}
          </h1>
        </div>

        {/* BOTTOM */}
        <div className="mt-auto pb-7 text-center">

          <p className="text-[10px] opacity-70">
            Dear
          </p>

          <p className="mt-0.5 text-base font-semibold">
            {guest}
          </p>

          <button onClick={() => setIsOpen(true)}
            className=" mt-3 rounded-full  px-7 py-2.5 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 hover:scale-105 active:scale-95"
            style={{background: data.theme?.warnaButtonBorder, color: data.theme?.warnaButtonBackground,
            }}>
            Open Invitation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;