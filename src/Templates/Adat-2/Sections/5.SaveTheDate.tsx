import { useEffect, useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
}

const SaveTheDate = ({ data, animate }: Props) => {
  const tanggal = data.TanggalAkadISO ? new Date(`${data.TanggalAkadISO}T${data.JamAkad}:00`) : null;
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const tahun = tanggal?.getFullYear() ?? new Date().getFullYear();
  const bulan = tanggal?.getMonth() ?? new Date().getMonth();
  const tanggalWedding = tanggal?.getDate();
  const jumlahHari = new Date(tahun, bulan + 1, 0).getDate();
  const hariPertama = new Date(tahun, bulan, 1).getDay();
  const kalender = [...Array(hariPertama).fill(null), ...Array.from({ length: jumlahHari }, (_, i) => i + 1)];

  useEffect(() => {
    if (!tanggal) return;
    const updateCountdown = () => {
      const selisih = tanggal.getTime() - new Date().getTime();
      if (selisih <= 0) return setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setCountdown({
        days: Math.floor(selisih / 86400000),
        hours: Math.floor((selisih / 3600000) % 24),
        minutes: Math.floor((selisih / 60000) % 60),
        seconds: Math.floor((selisih / 1000) % 60),
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [data.TanggalAkadISO, data.JamAkad]);

  const addToCalendar = () => {
    if (!data.TanggalAkadISO || !data.JamAkad) return;
    const date = data.TanggalAkadISO.replace(/-/g, "");
    const time = data.JamAkad.replace(":", "") + "00";
    const start = `${date}T${time}`;
    const end = `${date}T100000`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`The Wedding of ${data.NamabridePanggilan} & ${data.NamagroomPanggilan}`)}&dates=${start}/${end}&details=${encodeURIComponent("Wedding Invitation")}`;
    window.open(url, "_blank");
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-4 py-10 text-center" style={{ background: data.theme?.warna1, color: data.theme?.contrasfont }}>
      {/* GORDEN PANGGUNG */}
      <img
        src="/Ornament/gorden merah.webp"
        alt=""
        className={`pointer-events-none absolute left-1/2 top-0 z-[1] h-[780px] w-auto -translate-x-1/2 `}
      />

      {/* ISI PANGGUNG */}
      <div className={`relative z-[3] mx-auto flex w-full max-w-[275px] flex-col items-center pt-[125px] ${animate ? "Fadein-1" : "opacity-0"}`}>
        {/* JUDUL */}
        <div className="relative flex flex-col items-center justify-center">
          <p className="text-[8px]  uppercase tracking-[0.45em]" style={{ color: data.theme?.warna3 }}>
            The Wedding Day
          </p>
      
      
        </div>

        {/* TANGGAL */}
        <div className="mt-5 w-full">
          <p className="mt-3 text-[9px] uppercase tracking-[0.3em]">
            {tanggal?.toLocaleDateString("en-US", { weekday: "long" })}
          </p>

          <p className="mt-5 font-Tempting text-[82px] leading-[0.8]" style={{ color: data.theme?.warna3 }}>
            {tanggal?.getDate()}
          </p>
          <p className="text-[9px] uppercase tracking-[0.4em]" style={{ color: data.theme?.warna3 }}>
            {tanggal?.toLocaleDateString("en-US", { month: "long" })}
          </p>


          <p className="mt-1 text-xs tracking-[0.35em]" style={{ color: data.theme?.warna3 }}>
            {tahun}
          </p>
        </div>


        {/* CALENDAR */}
        <div className="mt-4 w-full px-4">
          <div className="grid grid-cols-7 gap-y-1 text-[7px] opacity-60">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-y-1 text-[8px]">
            {kalender.map((day, i) => (
              <span key={i} className="relative mx-auto flex h-5 w-5 items-center justify-center">
                {day === tanggalWedding && (
                  <i className="fas fa-heart absolute text-[22px]" style={{ color: data.theme?.warna3 }} />
                )}
                <span className={`relative z-10 ${day === tanggalWedding ? "text-red-900" : ""}`}>
                  {day}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* WAKTU */}
        <div className="mt-6 flex w-full border-y py-3" style={{ borderColor: `${data.theme?.warna3}55` }}>
          <div className="w-1/2 border-r" style={{ borderColor: `${data.theme?.warna3}40` }}>
            <p className="text-sm" style={{ color: data.theme?.warna3 }}>
              {data.JamAkad}
            </p>
            <p className="mt-1 text-[7px] uppercase tracking-[0.3em]">
              Akad
            </p>
          </div>

          <div className="w-1/2">
            <p className="text-sm" style={{ color: data.theme?.warna3 }}>
              {data.JamResepsi}
            </p>
            <p className="mt-1 text-[7px] uppercase tracking-[0.3em]">
              Resepsi
            </p>
          </div>
        </div>

        {/* VENUE */}
        <div className="mt-5 max-w-[240px]">
          <i className="fa-solid fa-location-dot text-xl"></i>
          <p className="text-[7px] uppercase tracking-[0.4em]" style={{ color: data.theme?.warna3 }}>
            Wedding Venue
          </p>

          <p className="mt-2 text-[10px] leading-5">
            {data.LokasiAkad}
          </p>

          {data.LinkGoogleMapsAkad && (
            <a
              href={data.LinkGoogleMapsAkad}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex rounded-full  px-4 py-1.5 text-[7px] uppercase tracking-[0.2em]"
              style={{ color: data.theme?.warnaButtonBorder, background:data.theme?.warnaButtonBackground }}
            >
              View Location
            </a>
          )}
        </div>

        {/* COUNTDOWN */}
        <div className="mt-7 w-full">
          <p className="mb-3 text-[7px] uppercase tracking-[0.4em]" style={{ color: data.theme?.warna3 }}>
            Counting The Days
          </p>

          <div className="grid grid-cols-4 gap-1.5">
            {[
              { label: "Days", value: countdown.days },
              { label: "Hours", value: countdown.hours },
              { label: "Minutes", value: countdown.minutes },
              { label: "Seconds", value: countdown.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="flex h-[52px] flex-col items-center justify-center border"
                style={{ background: `${data.theme?.warna1}dd`, borderColor: `${data.theme?.warna3}60` }}
              >
                <span className="font-Tempting text-base" style={{ color: data.theme?.warna3 }}>
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="mt-0.5 text-[6px] uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={addToCalendar}
          className="mb-10 mt-6 rounded-full px-6 py-2.5 text-[7px] uppercase tracking-[0.25em]"
          style={{
            background: data.theme?.warnaButtonBackground,
            color: data.theme?.warnaButtonBorder,
          }}
        >
          Add To Calendar
        </button>
      </div>
    </section>
  );
};

export default SaveTheDate;