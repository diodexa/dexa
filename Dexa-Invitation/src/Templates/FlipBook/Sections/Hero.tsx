import type { Invitation } from "../../../types/invitationFlipBook";
import "../FlipBook.css"

interface Props {
  data: Invitation;
  guest: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero = ({ data, guest, isOpen,setIsOpen }: Props) => {


  return (
    <section
      className={`fixed inset-0 overflow-hidden z-50 transition-all duration-700 ease-in-out ${ isOpen ? "-translate-y-full opacity-0 pointer-events-none" : " translate-y-0 opacity-100"}`}>
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 flex justify-center bg-black">
        <img src={data.coverImage} className="h-full w-auto object-cover"/>
      </div>

      {/* GRADIENT OVERLAY */}
      <div style={{"--warna": data.theme?.contrasfont,} as React.CSSProperties} className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--warna)]" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-start items-center text-center p-6 " style={{ color: data.theme?.warna2 }}>
        <p className="flex-1 text-3xl">Wedding Invitation</p>

        <h1 className="text-6xl  Judul font-BetterChill" style={{ color: data.theme?.warna3 
        }}>
          {data.NamabridePanggilan} & {data.NamagroomPanggilan}
        </h1>

        <p className="mt-2 text-2xl">{data.TanggalAkad}</p>

        <p className="mt-6 text-xl">Dear:</p>
        <p className="text-2xl font-semibold ">{guest}</p>

        <button
          onClick={() => setIsOpen(true)}
          className="mt-6 px-4 py-2 border rounded-lg text-xl"
          style={{
            background: data.theme?.warna2,
            color: data.theme?.contrasfont,
          }}
        >
          Buka Undangan
        </button>
      </div>
    </section>
  );
};

export default Hero;