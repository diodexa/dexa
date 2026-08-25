import type { Invitation } from "../../../types/invitationType";
import VideoBackground from "./Videobackground";


interface Props {
  data: Invitation;
  guest: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cover = ({ data, guest, isOpen, setIsOpen }: Props) => {
  return (
    <section className={`fixed inset-0 overflow-hidden z-9998 transition-all duration-700 ease-in-out  ${ isOpen ? "-translate-y-full opacity-0 pointer-events-none" : " translate-y-0 opacity-100"}`}
    style={{background:data.theme?.warna1, color:data.theme?.warna2}}>

      <VideoBackground
        src={data.video}
        overlay
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

        <p className="text-sm tracking-[0.4em] uppercase "
        style={{color:`color-mix(in srgb, ${data.theme?.warna2} 80%, transparent)`}}>
          The Wedding Of
        </p>

        <h1 className="mt-6 text-6xl font-serif font-light">
          {data.NamabridePanggilan}
        </h1>

        <p className="text-3xl font-serif italic my-2">
          &
        </p>

        <h1 className="text-6xl font-serif font-light">
          {data.NamagroomPanggilan}
        </h1>

        <div className="w-16 h-px my-8"
        style={{color:`color-mix(in srgb, ${data.theme?.warna2} 70%, transparent)`}} />

        <p className="text-lg tracking-[0.25em]">
          {data.TanggalAkad}
        </p>

        <p className="mt-8  "
        style={{color:`color-mix(in srgb, ${data.theme?.warna2} 90%, transparent)`}}>
          Dear {guest}
        </p>

        <button className="mt-8 px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition"
        onClick={() => setIsOpen(true)}
        style={{border:`1px solid ${data.theme?.warna2}`}}
        >
          Open Invitation
        </button>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 " 
        style={{background:`color-mix(in srgb, ${data.theme?.warna2} 60%, transparent)`}}/>
      </div>

    </section>
  );
};

export default Cover;