import { useEffect, useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate :boolean
}

const SaveTheDate = ({ data, animate }: Props) => {
    const tanggal = data.TanggalAkadISO ? new Date(`${data.TanggalAkadISO}T${data.JamAkad}:00`) : null;
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (!tanggal) return;

        const updateCountdown = () => {
        const sekarang = new Date().getTime();
        const target = tanggal.getTime();
        const selisih = target - sekarang;

        if (selisih <= 0) {
            setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        setCountdown({
            days: Math.floor(selisih / (1000 * 60 * 60 * 24)),
            hours: Math.floor((selisih / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((selisih / (1000 * 60)) % 60),
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

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `The Wedding of ${data.NamabridePanggilan} & ${data.NamagroomPanggilan}`
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      "Wedding Invitation"
    )}`;

    window.open(url, "_blank");
    
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-10 text-center" style={{ color: data.theme?.contrasfont }}>
      <div className="absolute inset-0 bg-white/70 blur/lg"  />

      <div className={`relative flex w-full max-w-md flex-col items-center ${animate ? "Fadein-1 " : "opacity-0"}`}>
        <p className="text-[11px] uppercase tracking-[0.35em]">Save The Date</p>
        <h2 className="mt-3 text-3xl uppercase tracking-[0.2em]" style={{ color: data.theme?.warna3 }}>Our Wedding Day</h2>

        <div className="my-10 flex items-center gap-5">
          <div className="h-px w-14" style={{ backgroundColor: data.theme?.warna3 }} />
          <span style={{ color: data.theme?.warna3 }}>♡</span>
          <div className="h-px w-14" style={{ backgroundColor: data.theme?.warna3 }} />
        </div>

        <p className="font-Tempting text-4xl" style={{ color: data.theme?.warna3 }}>
          {tanggal?.toLocaleDateString("en-US", { month: "long" })}
        </p>

        <div className="mt-2 flex items-center gap-4">
          <span className="text-lg">{tanggal?.toLocaleDateString("en-US", { weekday: "long" })}</span>
          <span className="text-5xl font-light" style={{ color: data.theme?.warna3 }}>{tanggal?.getDate()}</span>
          <span className="text-lg">{tanggal?.getFullYear()}</span>
        </div>

        <div className="mt-8 flex items-center gap-6">
          <div>
            <p className="text-2xl font-light" style={{ color: data.theme?.warna3 }}>{data.JamAkad} {data.FormatWaktu}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em]">Akad</p>
          </div>
          <div className="h-10 w-px" style={{ backgroundColor: data.theme?.warna3 }} />
          <div>
            <p className="text-2xl font-light" style={{ color: data.theme?.warna3 }}>{data.JamResepsi} {data.FormatWaktu}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em]">Resepsi</p>
          </div>
        </div>
        <div className="mt-8 max-w-xs">
            <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: data.theme?.warna3 }}>
                Wedding Venue
            </p>
            <p className="mt-2 text-sm leading-6">
                {data.LokasiAkad}
            </p>
            <a href={data.LinkGoogleMapsAkad} target="_blank" rel="noopener noreferrer"
                className="mt-3 inline-block border px-5 py-2 text-[9px] uppercase tracking-[0.2em]"
                style={{ background:data.theme?.warnaButtonBackground, color:data.theme?.warnaButtonBorder }}>
                View on Google Maps
            </a>
            </div>

        <div className="my-10 grid grid-cols-4 gap-3">
        {[
            { label: "Days", value: countdown.days },
            { label: "Hours", value: countdown.hours },
            { label: "Minutes", value: countdown.minutes },
            { label: "Seconds", value: countdown.seconds },
        ].map((item) => (
            <div key={item.label} className="flex h-16 w-16 flex-col items-center justify-center border" style={{ borderColor: data.theme?.warna3 }}>
              <span className="text-lg" style={{ color: data.theme?.warna3 }}>{String(item.value).padStart(2, "0")}</span>
              <span className="text-[8px] uppercase tracking-wider">{item.label}</span>
            </div>
        ))}
        </div>
        <button onClick={addToCalendar} className=" text-xs px-6 py-3"
         style={{ background: data.theme?.warnaButtonBackground, color: data.theme?.warnaButtonBorder }}>
          Add to Calendar
        </button>
      </div>

      {/* <img src="/Ornament/DahliaMerah.webp" alt="" className="absolute top-16 -left-40 z-[1] h-[390px] w-auto object-contain opacity-20 pointer-events-none" />
      <img src="/Ornament/DahliaMerah.webp" alt="" className="absolute top-16 -right-20 z-[1] h-[300px] w-auto scale-x-[-1] object-contain opacity-20" />
      <img src="/Ornament/DahliaCream.webp" alt="" className="absolute bottom-20 -right-40 z-[1] h-[250px] w-auto object-contain opacity-20 pointer-events-none" /> */}
    </section>
  );
};

export default SaveTheDate;