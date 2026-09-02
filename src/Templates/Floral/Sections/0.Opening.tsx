import type { Invitation } from "../../../types/invitationType";
import Countdown from "../../1.Components/Countdown";
import {
  FloralCorner,
  FloralFlower,
} from "../utils/floralSvg";

interface Props {
  data: Invitation;
  guest: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Opening = ({
  data,
  guest,
  isOpen,
  setIsOpen,
}: Props) => {
  return (
    <section
      className={`absolute inset-0 z-50 flex min-h-screen w-full items-center justify-center overflow-hidden transition-all duration-1000 ${
        isOpen? "pointer-events-none opacity-0": "opacity-100"}`}
      style={{background: data.theme?.warna1,color: data.theme?.warna2,}}>

      <div className="absolute bottom-0 right-0">
        <FloralCorner
          color={data.theme?.warna3}
          size={180}
          flip
        />
      </div>

      <div className="absolute">
        <FloralFlower
          color={data.theme?.warna3}
          size={280}
          opacity={0.08}
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-8 text-center">
        <p className="mb-5 text-[10px] uppercase tracking-[0.45em]">
          The Wedding Of
        </p>

        <h1 className="font-serif text-5xl leading-tight">
          {data.NamabridePanggilan}
        </h1>

        <span className="my-2 font-serif text-2xl italic">
          &
        </span>

        <h1 className="font-serif text-5xl leading-tight">
          {data.NamagroomPanggilan}
        </h1>

        <div className="my-7 h-px w-20 bg-current opacity-40" />

        <p className="text-xs tracking-[0.2em]">
          {data.TanggalAkad}
        </p>
        <div className="pointer-events-none mt-3  flex items-center justify-center mb-8">
          <div style={{"--bg2": data.theme?.warna3 , "--bgcountdown": data.theme?.warna2,  "--minhcountdown": "60px",  "--minwcountdown": "60px", color:data.theme?.warna1, } as React.CSSProperties}>
            <Countdown date={`${data.TanggalAkadISO}T${data.JamAkad}:00`}/>
          </div>
        </div>

        <p className=" text-xs opacity-70">
          Kepada Yth.
        </p>

        <p className="mt-1 font-serif text-xl">
          {guest}
        </p>

        <button
          onClick={() => setIsOpen(true)}
          className="mt-8 border px-8 py-3 text-[10px] uppercase tracking-[0.3em] transition hover:scale-105"
          style={{
            borderColor: data.theme?.warna3,
            background: data.theme?.warnaButtonBackground,
            color: data.theme?.contrasfont,
          }}>
          Buka Undangan
        </button>
      </div>
    </section>
  );
};

export default Opening;
