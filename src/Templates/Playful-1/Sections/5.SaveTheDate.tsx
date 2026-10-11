
import { useEffect, useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
}

const SaveTheDate = ({ data, animate }: Props) => {
  const tanggal = data.TanggalAkadISO ? new Date(`${data.TanggalAkadISO}T${data.JamAkad}:00`) : null;
  const tahun = tanggal?.getFullYear() ?? new Date().getFullYear();
  const bulan = tanggal?.getMonth() ?? new Date().getMonth();
  const tanggalWedding = tanggal?.getDate();
  const jumlahHari = new Date(tahun, bulan + 1, 0).getDate();
  const hariPertama = new Date(tahun, bulan, 1).getDay();
  const kalender = [...Array(hariPertama).fill(null), ...Array.from({ length: jumlahHari }, (_, i) => i + 1)];
   const [countdown, setCountdown] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });

  const addToCalendar = () => {
    if (!data.TanggalAkadISO || !data.JamAkad) return;
    const date = data.TanggalAkadISO.replace(/-/g, "");
    const time = data.JamAkad.replace(":", "") + "00";
    const start = `${date}T${time}`;
    const end = `${date}T100000`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`The Wedding of ${data.NamabridePanggilan} & ${data.NamagroomPanggilan}`)}&dates=${start}/${end}&details=${encodeURIComponent("Wedding Invitation")}`;
    window.open(url, "_blank");
  };

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
    <section className="relative -mt-px flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-5 text-center" style={{ color: data.theme?.contrasfont }}>



      <div className={`relative z-10 flex w-full max-w-md flex-col items-center ${animate ? "Fadein-1" : "opacity-0"}`}>
        {/* LAMPU GANTUNG PALING ATAS */}
        <div className="pointer-events-none absolute left-1/2 top-[-35px] z-20 h-[125px] -translate-x-1/2">
          <img src="/Ornament/doodleLampuGantungBesar.webp" alt="" className="h-full w-auto object-contain" />
        </div>
  
        <div className="pointer-events-none absolute -right-10 bottom-1/6  h-[155px] ">
          <img src="/Ornament/doodleCake.webp" alt="" className="h-full w-auto object-contain" />
        </div>

        {/* DOODLE COUNTDOWN */}
        <div className="mt-27 w-full">
          <div className="relative mb-5">

            <p className="rotate-[-2deg] font-KH-Blackline text-3xl" style={{ color: data.theme?.warna3 }}> Countdown</p>
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
                <span className="relative z-10 mt-2 rotate-[-3deg] text-sm lowercase tracking-wider" style={{ color: data.theme?.warna2 }}>{item.label}</span>
          
              </div>
            ))}
          </div>

          <div className="mt-5 flex rotate-[-1deg] items-center justify-center gap-2">
          
            <p className="text-sm" style={{ color: data.theme?.warna3 }}>Siap-siap ikut bahagia bareng kami! ♡</p>
            
          </div>
      
        </div>
        <p className="mt-10 text-4xl font-KH-Blackline">Save The Date</p>
        <div className="mt-1 flex w-full items-center justify-center gap-4">
          <div className="h-px w-12" style={{ backgroundColor: data.theme?.warna3 }} />
          <span style={{ color: data.theme?.warna3 }}>✦</span>
          <div className="h-px w-12" style={{ backgroundColor: data.theme?.warna3 }} />
        </div>

        

        {/* KALENDER */}
        <div className="relative mt-3 w-full max-w-[235px]">
          <div className="relative px-5 pb-5 pt-6" style={{ color: data.theme?.contrasfont }}>
            {/* SVG bingkai tetap gunakan yang sebelumnya */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 300 370" preserveAspectRatio="none" fill="none">
              <path d="M24 9 Q10 7 11 23 L10 343 Q12 360 28 359 L272 359 Q289 358 289 342 L290 25 Q290 9 274 11 Q150 6 24 9Z" stroke={data.theme?.warna2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M24 53 Q150 48 276 53" stroke={data.theme?.warna2} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3">
                <span className="text-sm" style={{ color: data.theme?.warna3 }}>♡</span>
                <p className="uppercase tracking-[0.3em]" style={{ color: data.theme?.warna3 }}>
                  {tanggal?.toLocaleDateString("en-US", { month: "long" })}
                </p>
                <span className="text-sm" style={{ color: data.theme?.warna3 }}>♡</span>
              </div>
              <p className="mt-1 text-center text-xs tracking-[0.25em]" style={{ color: data.theme?.warna2 }}>
                {tanggal?.getFullYear()}
              </p>
              <div className="mt-5 grid grid-cols-7 text-center text-sm font-semibold uppercase" style={{ color: data.theme?.warna2 }}>
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => <span key={i}>{day}</span>)}
              </div>
              <div className="mt-3 grid grid-cols-7 gap-y-2 text-center">
                {kalender.map((day, i) => (
                  <span key={i} className="relative mx-auto flex h-6 w-6 items-center justify-center">
                    {day === tanggalWedding && (
                      <svg viewBox="0 0 40 40" className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 overflow-visible" fill="none">
                        <path d="M20 34 C16 30 4 21 5 13 C6 4 16 4 20 12 C25 3 35 5 35 14 C35 22 25 30 20 34Z" stroke={data.theme?.warna3} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <span className="relative z-10 text-sm" style={{ color: day === tanggalWedding ? data.theme?.warna3 : data.theme?.contrasfont, fontWeight: day === tanggalWedding ? 700 : 400 }}>
                      {day}
                    </span>
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-center gap-2">
                <span className="h-px w-6" style={{ backgroundColor: data.theme?.warna2 }} />
                <p className="text-[7px] uppercase tracking-[0.25em]" style={{ color: data.theme?.warna3 }}>Our Special Day</p>
                <span className="h-px w-6" style={{ backgroundColor: data.theme?.warna2 }} />
              </div>
            </div>
          </div>
        </div>
        {/* ANGKA TANGGAL BESAR DI LUAR KALENDER */}
        <div className="relative mt-5 text-center" style={{ color: data.theme?.warna3 }}>
          <p className="mt-1  uppercase tracking-[0.3em]">
            {tanggal?.toLocaleDateString("id-ID", { weekday: "long" })}
          </p>
          <p className=" text-3xl leading-none">{tanggal?.getDate()}</p>
          <p className="mt-1 text- uppercase tracking-[0.2em]">
            {tanggal?.toLocaleDateString("en-US", { month: "long" })}
          </p>

        </div>
        {/* JADWAL AKAD DAN RESEPSI */}
        <div className="mt-5 flex items-center justify-center gap-7 rounded-[30px] border-[3px] p-4" style={{ background: data.theme?.warnaButtonBorder, borderColor: data.theme?.warna2 }}>
          <div><p className="text-xl font-light" style={{ color: data.theme?.warna3 }}>{data.JamAkad} {data.FormatWaktu}</p><p className="mt-1 text-[9px] uppercase tracking-[0.25em]">Akad</p></div>
          <div className="h-10 w-px" style={{ backgroundColor: data.theme?.warna2 }} />
          <div><p className="text-xl font-light" style={{ color: data.theme?.warna3 }}>{data.JamResepsi} {data.FormatWaktu}</p><p className="mt-1 text-[9px] uppercase tracking-[0.25em]">Resepsi</p></div>
        </div>
        {/* COUNTDOWN */}
        {/* <div className="mt-6 grid grid-cols-4 gap-2" style={{ color: data.theme?.contrasfont }}>
          {[{ label: "Days", value: countdown.days }, { label: "Hours", value: countdown.hours }, { label: "Minutes", value: countdown.minutes }, { label: "Seconds", value: countdown.seconds }].map((item) => (
            <div key={item.label} className="flex h-[58px] w-[58px] flex-col items-center justify-center rounded-2xl border" style={{ borderColor: data.theme?.warna2, background: data.theme?.warnaButtonBorder }}>
              <span className="text-lg" style={{ color: data.theme?.warna3 }}>{String(item.value).padStart(2, "0")}</span>
              <span className="text-[7px] uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div> */}
          <button onClick={addToCalendar} className=" rounded-full px-7 py-3 mt-2 text-[10px] uppercase tracking-[0.2em]" style={{ background: data.theme?.warnaButtonBackground, color: data.theme?.warnaButtonBorder }}>Simpan Tanggal Acara</button>



      </div>
    </section>
  );
};

export default SaveTheDate;
