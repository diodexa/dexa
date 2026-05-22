import { useState } from "react";
import type { Invitation } from "../../../types/invitationFlipBook";
import "../FlipBook.css"

interface Props {
  data: Invitation;
  guest: string;
}

const Hero = ({ data, guest }: Props) => {
  const [isOpen,SetisOpen] = useState(false);

  return (
    <section
      id="hero-slider" className={`fixed inset-0 overflow-hidden z-50 ${ isOpen ? "opacity-0 pointer-events-none" : "opacity-100"} transition-opacity duration-500`}>
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 flex justify-center bg-black">
        <img src={data.coverImage} className="h-full w-auto object-cover"/>
      </div>

      {/* GRADIENT OVERLAY */}
      <div style={{"--warna": data.theme?.backgroundColor,} as React.CSSProperties} className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--warna)]" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-start items-center text-center p-6" style={{ color: data.theme?.bodyFont }}>
        <p className="flex-1">Wedding Invitation</p>

        <h1 className="text-3xl font-bold text-glow Judul" style={{ color: data.theme?.headingFont }}>
          {data.bride} & {data.groom}
        </h1>

        <p className="mt-2">{data.date}</p>

        <p className="mt-6">Dear:</p>
        <p className="text-lg font-semibold">{guest}</p>

        <button
          onClick={() => SetisOpen(true)}
          className="mt-6 px-4 py-2 border rounded"
          style={{
            background: data.theme?.headingFont,
            color: data.theme?.bodyFont,
          }}
        >
          Buka Undangan
        </button>
      </div>
    </section>
  );
};

export default Hero;