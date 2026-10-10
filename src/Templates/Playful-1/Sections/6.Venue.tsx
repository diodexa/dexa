
import { useEffect, useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
}

const Venue = ({ data, animate }: Props) => {

  const [countdown, setCountdown] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });

useEffect(() => {
  if (!data.TanggalAkadISO) return;
  const target = new Date(`${data.TanggalAkadISO}T${data.JamAkad || "00:00"}:00`).getTime();

  const updateCountdown = () => {
    const selisih = target - Date.now();
    if (selisih <= 0) {
      setCountdown({ hari: 0, jam: 0, menit: 0, detik: 0 });
      return;
    }
    setCountdown({
      hari: Math.floor(selisih / 86400000),
      jam: Math.floor((selisih / 3600000) % 24),
      menit: Math.floor((selisih / 60000) % 60),
      detik: Math.floor((selisih / 1000) % 60),
    });
  };

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
  return () => clearInterval(interval);
}, [data.TanggalAkadISO, data.JamAkad]);
  return (
    <section className={`relative w-full px-6 py-12 text-center ${animate ? "Fadein-1" : "opacity-0"}`} style={{ color: data.theme?.contrasfont }}>
      <div className="relative mx-auto flex w-full max-w-[320px] flex-col items-center">
      

        {/* JUDUL */}
        <p className="mt-2 font-KH-Blackline text-3xl" style={{ color: "#af4364" }}>The Venue</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="h-px w-10" style={{ backgroundColor: data.theme?.warna2 }} />
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={data.theme?.warna3} strokeWidth="1.5">
            <path d="M12 21S3 15 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12-9 12Z" />
          </svg>
          <span className="h-px w-10" style={{ backgroundColor: data.theme?.warna2 }} />
        </div>

        {/* KARTU LOKASI */}
        <div className="relative mt-5 w-full px-5 py-6">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 300 200" preserveAspectRatio="none" fill="none">
            <path d="M18 9 Q8 7 10 22 L8 176 Q10 191 25 190 L275 192 Q291 190 290 175 L292 25 Q291 8 276 10 Q150 5 18 9Z" stroke={data.theme?.warna2 }strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 16 Q150 11 276 17 L282 174 Q280 183 268 183 L30 182 Q17 181 17 170" stroke={data.theme?.warna3} strokeWidth="1" strokeDasharray="3 5" strokeLinecap="round" />
          </svg>

          <div className="relative z-10 pb-5">
            <p className="mt-3 text-xl leading-relaxed" style={{ color: data.theme?.warna3 }}>{data.LokasiAkad}</p>
            <div className="mx-auto my-3 h-px w-12" style={{ backgroundColor: data.theme?.warna2 }} />
            {data.LinkGoogleMapsAkad && (
              <a href={data.LinkGoogleMapsAkad} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[9px] uppercase tracking-[0.2em] transition-transform hover:scale-105" style={{ color: data.theme?.warnaButtonBorder, borderColor: data.theme?.warna2, background: data.theme?.warnaButtonBackground }}>
                 <i className="fa-solid fa-location-dot text-2xl"></i>
                View Location
              </a>
            )}
          </div>
        </div>

        {/* MEJA MAKAN DOODLE */}
        <img src="/Ornament/doodleMejaMakan.webp" alt="" className="relative z-10 mt-1 h-auto w-[240px] object-contain" />
      </div>

      {/* DOODLE COUNTDOWN */}
      <div className="mt-6 w-full">
        <div className="relative mb-5">

          <p className="rotate-[-2deg] font-KH-Blackline text-2xl" style={{ color: data.theme?.warna3 }}>Tick-Tock, Love!</p>
          <svg viewBox="0 0 150 12" className="mx-auto mt-2 h-3 w-28" fill="none" stroke={data.theme?.warna2} strokeWidth="1.3" strokeLinecap="round">
            <path d="M2 6 Q20 1 38 6 T74 6 T110 6 T148 6" />
          </svg>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "hari", value: countdown.hari },
            { label: "jam", value: countdown.jam },
            { label: "menit", value: countdown.menit },
            { label: "detik", value: countdown.detik },
          ].map((item, i) => (
            <div key={item.label} className={`relative flex flex-col items-center justify-center px-1 py-4 ${i % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"}`}>
              <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 80 100" preserveAspectRatio="none" fill="none">
                <path d="M12 5 Q40 1 68 6 Q77 4 75 18 L77 81 Q78 95 65 94 L14 96 Q3 96 5 82 L4 19 Q3 6 12 5Z" stroke={i % 2 === 0 ? data.theme?.warna2 : data.theme?.warna3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="relative z-10 font-KH-Blackline text-2xl leading-none" style={{ color: data.theme?.warna3 }}>{String(item.value).padStart(2, "0")}</span>
              <span className="relative z-10 mt-2 rotate-[-3deg] text-[9px] lowercase tracking-wider" style={{ color: data.theme?.warna2 }}>{item.label}</span>
        
            </div>
          ))}
        </div>

        <div className="mt-5 flex rotate-[-1deg] items-center justify-center gap-2">
        
          <p className="text-sm" style={{ color: data.theme?.warna3 }}>our forever starts soon!</p>
          
        </div>
    
      </div>
    </section>
  );
};

export default Venue;
