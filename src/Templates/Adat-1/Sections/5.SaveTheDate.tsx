import { useEffect, useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate :boolean
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
    <section className="relative flex -mt-px min-h-screen w-full items-center justify-center overflow-hidden px-6 py-12 text-center " style={{ color: data.theme?.contrasfont }}>
    <div className="absolute inset-0 opacity-80" style={{ background: data.theme?.warna2 }} />
    <div className="absolute bottom-9 -left-20 z-11 w-full  ">
        <img src="/Ornament/BungaPanjang.webp"alt=""
          className="h-full w-auto object-contain origin-bottom rotate-90 saturate-70"/>
      </div>
    <div className={`relative z-10 flex w-full max-w-md flex-col items-center ${animate ? "Fadein-1" : "opacity-0"}`}>
      <p className="text- uppercase tracking-[0.4em] text-white" >Save The Date</p>
      <div className="mt-5 flex w-full items-center justify-center gap-4">
        <div className="h-px w-12" style={{ backgroundColor: data.theme?.warnaButtonBorder }} />
        <span style={{ color: data.theme?.warnaButtonBorder }}>✦</span>
        <div className="h-px w-12" style={{ backgroundColor: data.theme?.warnaButtonBorder }} />
      </div>

      <div className="relative mt-7 w-full max-w-[300px]">
        <div className="absolute -inset-2 rounded-[35px] " style={{ background: data.theme?.warna1 }} />
        <div className="relative overflow-hidden rounded-[30px]  px-7 py-7" style={{ background: `${data.theme?.warnaButtonBorder}`, color:data.theme?.contrasfont  }}>
          <p className="text-[10px] uppercase tracking-[0.35em]" style={{ color: data.theme?.warna3 }}>{tanggal?.toLocaleDateString("en-US", { month: "long" })}</p>
          <div className="mx-auto my-3 h-px w-16" style={{ backgroundColor: data.theme?.warna3 }} />
          <p className="font-Tempting text-7xl leading-none" style={{ color: data.theme?.warna3 }}>{tanggal?.getDate()}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.3em]">{tanggal?.toLocaleDateString("en-US", { weekday: "long" })}</p>
          <p className="mt-1 text-sm tracking-[0.2em]" style={{ color: data.theme?.warna3 }}>{tanggal?.getFullYear()}</p>
          <div className="mt-6 grid grid-cols-7 gap-y-3 text-[8px] uppercase tracking-wider opacity-60">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => <span key={i}>{day}</span>)}
        </div>
        <div className="mt-3 grid grid-cols-7 gap-y-3 text-[10px]" >
          {kalender.map((day, i) => (
            <span key={i} className={`mx-auto flex h-6 w-6 items-center justify-center ${day === tanggalWedding ? "rounded-full" : ""}`} style={day === tanggalWedding ? { backgroundColor: data.theme?.warna3, color: data.theme?.warna1 } : undefined}>
              {day}
            </span>
          ))}
        </div>
            
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-7 p-4 border-[7px] rounded-[35px] " 
      style={{background:data.theme?.warnaButtonBorder, borderColor: `${data.theme?.warna1}`}}>
        <div><p className="text-xl font-light" style={{ color: data.theme?.warna3 }}>{data.JamAkad} {data.FormatWaktu}</p><p className="mt-1 text-[9px] uppercase tracking-[0.25em]">Akad</p></div>
        <div className="h-10 w-px" style={{ backgroundColor: data.theme?.warna3 }} />
        <div><p className="text-xl font-light" style={{ color: data.theme?.warna3 }}>{data.JamResepsi} {data.FormatWaktu}</p><p className="mt-1 text-[9px] uppercase tracking-[0.25em]">Resepsi</p></div>
      </div>

      <div className="mt-8 max-w-xs rounded-[35px]  pt-7 pb-4 border-[7px]"
      style={{background:data.theme?.warnaButtonBorder, borderColor: `${data.theme?.warna1}`}}>
        <p className="text-[9px] uppercase tracking-[0.3em]" style={{ color: data.theme?.warna3 }}>Wedding Venue</p>
        <p className="mt-2 text-sm leading-6">{data.LokasiAkad}</p>
        <a href={data.LinkGoogleMapsAkad} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block rounded-full border px-5 py-2 text-[9px] uppercase tracking-[0.2em]" 
        style={{ background: data.theme?.warnaButtonBackground, color: data.theme?.warnaButtonBorder, borderColor: data.theme?.warna3 }}>View on Google Maps</a>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-2" style={{color:data.theme?.contrasfont}}>
        {[{ label: "Days", value: countdown.days }, { label: "Hours", value: countdown.hours }, 
        { label: "Minutes", value: countdown.minutes }, 
        { label: "Seconds", value: countdown.seconds }].map((item) => 
        <div key={item.label} className="flex h-[62px] w-[62px] flex-col items-center justify-center rounded-2xl border " 
        style={{ borderColor: `${data.theme?.warna3}70`, background: `${data.theme?.warnaButtonBorder}` }}>
          <span className="text-lg" style={{ color: data.theme?.warna3 }}>{String(item.value).padStart(2, "0")}</span>
          <span className="text-[7px] uppercase tracking-wider ">{item.label}</span>
        </div>)}
      </div>

      <button onClick={addToCalendar} className="mt-7 mb-15 rounded-full px-7 py-3 text-[10px] uppercase tracking-[0.2em]" style={{ background: data.theme?.warnaButtonBackground, color: data.theme?.warnaButtonBorder }}>Add to Calendar</button>
    </div>
  </section>
  );
};

export default SaveTheDate;