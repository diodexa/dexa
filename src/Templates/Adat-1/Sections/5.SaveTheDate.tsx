import { useEffect, useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
}

const SaveTheDate = ({ data, animate }: Props) => {
  const tanggal = data.TanggalAkadISO
    ? new Date(`${data.TanggalAkadISO}T${data.JamAkad}:00`)
    : null;

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const tahun = tanggal?.getFullYear() ?? new Date().getFullYear();

  useEffect(() => {
    if (!tanggal) return;

    const updateCountdown = () => {
      const sekarang = new Date().getTime();
      const target = tanggal.getTime();
      const selisih = target - sekarang;

      if (selisih <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
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

  const month = tanggal?.toLocaleDateString("en-US", {
    month: "long",
  });

  const weekday = tanggal?.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-20"
      style={{  background: data.theme?.warna2,  color: data.theme?.contrasfont, }}  >
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: ` radial-gradient( circle at 50% 30%, ${data.theme?.warnaButtonBorder}55 0%,  transparent 45%  ) `, }} />

      {/* Top Ornament */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-[1] w-full -translate-x-1/2">
        <img src="/Ornament/lace.webp"  alt=""
          className="w-full object-cover" />
      </div>
      <div className={`absolute top-[30%] -left-10 ${
          animate ? "MunculKiri-1" : "opacity-0" }`}>
          <img  src="/Ornament/Janur.webp" alt=""
          className="sway-flower h-full w-auto object-contain object-left-bottom "/>
      </div>
      <div className={`absolute top-[30%] -right-10 ${
          animate ? "MunculKanan-1" : "opacity-0" }`}>
          <img  src="/Ornament/Janur.webp" alt=""
          className="sway-flower h-full w-auto object-contain object-left-bottom scale-x-[-1] "/>
      </div>
      <div className={`absolute -bottom-10 -right-15 grayscale ${
          animate ? "MunculKanan-1" : "opacity-0" }`}>
          <img  src="/Ornament/WayangLaki.webp" alt=""
          className=" h-full w-auto object-contain object-left-bottom "/>
      </div>
      <div className={`absolute -bottom-10 -left-15 grayscale ${
          animate ? "MunculKiri-1" : "opacity-0" }`}>
          <img  src="/Ornament/WayangPerempuan.webp" alt=""
          className=" h-full w-auto object-contain object-left-bottom "/>
      </div>


      {/* Main */}
      <div className={`relative z-10 flex w-full max-w-md flex-col items-center text-center ${
          animate ? "Fadein-1" : "opacity-0" }`}  >
        {/* Heading */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.5em]"
            style={{ color: data.theme?.warna3 }} >
            The Wedding Day
          </p>

          <h2 className="mt-3 text-4xl"
            style={{ color: data.theme?.warna3 }} >
            Save The Date
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <div className="h-px w-12 opacity-40"
              style={{ background: data.theme?.warna3 }}  />

            <span className="text-xs"
              style={{ color: data.theme?.warna3 }} >
              ✦
            </span>

            <div  className="h-px w-12 opacity-40"
              style={{ background: data.theme?.warna3 }} />
          </div>
        </div>

        {/* DATE */}
        <div className="relative mt-7">
          {/* Decorative circle */}
          <div className="absolute left-1/2 top-1/2 h-[245px] w-[245px] -translate-x-1/2 -translate-y-1/2 rounded-full "
            style={{ borderColor: `${data.theme?.warna3}25`, }} />

        

          <div className="relative flex flex-col items-center">
            <p  className="text-[10px] mt-5 uppercase tracking-[0.4em]"
              style={{ color: data.theme?.warna3 }}  >
              {month}
            </p>

            <p className="mt-4 font-Tempting text-[110px] leading-[0.9]"
              style={{ color: data.theme?.warna3 }}  >
              {tanggal?.getDate()}
            </p>

            <p className="mt-2 text-[10px] uppercase tracking-[0.35em]">
              {weekday}
            </p>

            <div className="my-4 h-px w-10 opacity-30"
              style={{ background: data.theme?.contrasfont }} />

            <p className="text-xs tracking-[0.35em]"
              style={{ color: data.theme?.warna3 }} >
              {tahun}
            </p>
          </div>
        </div>

        {/* EVENT TIME */}
        <div className="mt-10 w-full border-y py-5 relative"
          style={{  borderColor: `${data.theme?.warna3}35`, }} >
          <div className="grid grid-cols-2">
            {/* Akad */}
            <div className="border-r"
              style={{ borderColor: `${data.theme?.warna3}25`,  }}  >
              <p className="text-[8px] uppercase tracking-[0.3em] opacity-60"  >
                Akad
              </p>

              <p  className="mt-2 text-lg"
                style={{ color: data.theme?.warna3 }}  >
                {data.JamAkad}
              </p>

              <p className="mt-1 text-[8px] opacity-50">
                {data.FormatWaktu}
              </p>
            </div>

            {/* Resepsi */}
            <div>
              <p className="text-[8px] uppercase tracking-[0.3em] opacity-60" >
                Resepsi
              </p>

              <p className="mt-2 text-lg"
                style={{ color: data.theme?.warna3 }}  >
                {data.JamResepsi}
              </p>

              <p className="mt-1 text-[8px] opacity-50">
                {data.FormatWaktu}
              </p>
            </div>
          </div>
        </div>

        {/* VENUE */}
        <div className="mt-10 max-w-sm px-5">
          <p className="text-[8px] uppercase tracking-[0.4em]"
            style={{ color: data.theme?.warna3 }} >
            Wedding Venue
          </p>

          <p className="mt-3 text-sm leading-6">
            {data.LokasiAkad}
          </p>

          {data.LinkGoogleMapsAkad && (
            <a  href={data.LinkGoogleMapsAkad}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-full border px-5 py-2 text-[8px] uppercase tracking-[0.2em] transition hover:scale-105"
              style={{ color: data.theme?.warnaButtonBorder,  background: `${data.theme?.warnaButtonBackground}` }}  >
              View Location
            </a>
          )}
        </div>

        {/* COUNTDOWN */}
        <div className="mt-12 w-full">
          <p className="mb-5 text-[8px] uppercase tracking-[0.4em] opacity-50" >
            Counting The Days
          </p>

          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Days",
                value: countdown.days,
              },
              { label: "Hours",
                value: countdown.hours,
              },
              { label: "Minutes",
                value: countdown.minutes,
              },
              { label: "Seconds",
                value: countdown.seconds,
              },
            ].map((item) => (
              <div key={item.label}
                className="flex flex-col items-center justify-center py-3" 
                style={{background:data.theme?.warna1, color: data.theme?.warna2}} >
                <span className="text-xl"
                  style={{ color: data.theme?.warna3 }} >
                  {String(item.value).padStart(2, "0")}
                </span>

                <span className="mt-1 text-[7px] uppercase tracking-[0.15em] ">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CALENDAR BUTTON */}
        <button onClick={addToCalendar}  className="mt-10 mb-10 rounded-full px-7 py-3 text-[9px] uppercase tracking-[0.25em] transition hover:scale-105"
          style={{  background: data.theme?.warnaButtonBackground, color: data.theme?.warnaButtonBorder,  }} >
          Add To Calendar
        </button>
      </div>
    </section>
  );
};

export default SaveTheDate;