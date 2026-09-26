import { useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  guest: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero = ({ data, guest, isOpen, setIsOpen }: Props) => {
    const [HideHero,setHideHero] = useState(false)
  return (
    <section className={`fixed inset-0 z-9998 mx-auto flex max-w-[385px] items-center justify-center overflow-hidden transition-all duration-800 ${HideHero ? "pointer-events-none opacity-0" : "opacity-100"}`} style={{ background: data.theme?.warnaweddingInvitation, color: data.theme?.warna3 }}>
      <div className={`relative flex h-[520px] w-[330px] items-end justify-center `}>

        {/* BAGIAN DALAM AMPLOP */}
        <div className={`absolute bottom-[65px]  h-[200px] w-[330px] overflow-hidden rounded-b-2xl shadow-xl ${isOpen ? "BukaEnvelopee" : ""}`} 
        onAnimationEnd={() => setHideHero(true)} 
        style={{ background: data.theme?.warna1 }}>
          {/* LIPATAN KIRI */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(145deg, transparent 49.5%, ${data.theme?.warna3}20 50%, transparent 50.5%)` }} />
          {/* LIPATAN KANAN */}
          <div className="absolute inset-0 " style={{ background: `linear-gradient(215deg, transparent 49.5%, ${data.theme?.warna3}20 50%, transparent 50.5%)` }} />
          {/* DEPAN AMPLOP */}
          <div className="absolute bottom-0 left-0 z-30 h-[190px] w-full" style={{ background: data.theme?.warna3, clipPath: "polygon(0 0, 50% 48%, 100% 0, 100% 100%, 0 100%)" }} />
          {/* BUTTON */}
          <button type="button" onClick={() => setIsOpen(true)} className={`absolute left-1/2 top-[47%] z-32 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 shadow-lg transition-all duration-500 active:scale-90 `} style={{ background: data.theme?.warnaButtonBackground, borderColor: data.theme?.warnaButtonBorder, color: data.theme?.warnaButtonBorder }}>
            <span className="mt-1 text-xs uppercase tracking-[.15em]">Open</span>
          </button>
        </div>

        {/* FLAP AMPLOP TERBUKA */}
        <div className={`absolute bottom-[90px] h-[340px] w-[330px] origin-bottom ${isOpen ? "BukaEnvelopee" : ""}`}>
          <div className="absolute bottom-0 h-[170px] w-full" style={{ background: `${data.theme?.warna3}80` }} />
          <div className="absolute left-0 top-0 h-[170px] w-full" style={{ background: `${data.theme?.warna3}80`, clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }} />
        </div>
        

        {/* KARTU UNDANGAN */}
        <div className={`absolute bottom-[80px]  h-[240px] w-[320px] flex flex-col items-center justify-start border bg-white px-6 pt-8 text-center shadow-xl  [transform-origin:center_bottom] ${isOpen ? "BukaKartu" : " "}`} style={{ background: data.theme?.warnaButtonBorder, borderColor: `${data.theme?.warna3}60`, color: data.theme?.contrasfont }}>
            <p className="text-[8px] uppercase tracking-[.45em] opacity-60">The Wedding Of</p>
            <div className="flex items-center justify-center gap-3">
                <p className="text-2xl font-Tempting" style={{ color: data.theme?.warna3 }}>{data.NamabridePanggilan}</p>
                <p className="my-1 text-lg">&</p>
                <p className="text-2xl font-Tempting" style={{ color: data.theme?.warna3 }}>{data.NamagroomPanggilan}</p>
            </div>
            <div className="mx-auto h-px w-10 opacity-30" style={{ background: data.theme?.warna3 }} />
            <p className="text-[8px] uppercase tracking-[.25em] opacity-60 mb-3">{data.TanggalAkad}</p>
            <p className="text-[8px]">You're Invited </p>
            {/* <div className="border w-full h-1/2 opacity-10"/> */}
        </div>

        {/* GUEST */}
        <div className={`absolute -bottom-1  text-center transition-all duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`} style={{color: data.theme?.warna3}}>
          <p className="text-[8px] uppercase tracking-[.3em] ">Dear</p>
          <p className="mt-1  font-semibold">{guest}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;