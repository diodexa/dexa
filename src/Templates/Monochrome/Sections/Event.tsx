import { useEffect, useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
}

const Event = ({ data }: Props) => {

  // =========================
  // PARSE TANGGAL AKAD
  // =========================
  const getTargetDate = () => {
    const bulan: Record<string, number> = {
      Januari: 0,
      Februari: 1,
      Maret: 2,
      April: 3,
      Mei: 4,
      Juni: 5,
      Juli: 6,
      Agustus: 7,
      September: 8,
      Oktober: 9,
      November: 10,
      Desember: 11,
    };

    const tanggal = data.TanggalAkad?.split(" ");

    if (!tanggal || tanggal.length < 3) {
      return new Date();
    }

    const hari = Number(tanggal[0]);
    const bulanIndex = bulan[tanggal[1]];
    const tahun = Number(tanggal[2]);

    // Ambil jam akad
    const jamText = data.JamAkad?.match(/\d{1,2}[:.]\d{2}/);

    let jam = 0;
    let menit = 0;

    if (jamText) {
      const waktu = jamText[0]
        .replace(".", ":")
        .split(":");

      jam = Number(waktu[0]);
      menit = Number(waktu[1]);
    }

    return new Date(
      tahun,
      bulanIndex,
      hari,
      jam,
      menit,
      0
    );
  };


  // =========================
  // COUNTDOWN
  // =========================
  const calculateCountdown = () => {

    const target = getTargetDate().getTime();
    const now = new Date().getTime();

    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(
        difference / (1000 * 60 * 60 * 24)
      ),

      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),

      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),

      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    };
  };


  const [countdown, setCountdown] = useState(
    calculateCountdown()
  );


  useEffect(() => {

    const timer = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(timer);

  }, []);


  return (
    <section className="px-6 py-24"
    style={{color:data.theme?.warna2, backgroundColor:data.theme?.warna1}}>

      <div className="max-w-md mx-auto text-center">

        {/* =========================
            SAVE THE DATE
        ========================= */}

        <p className="text-xs tracking-[0.4em] uppercase MunculAtas"
        style={{color:`color-mix(in srgb, ${data.theme?.warna2} 50%, transparent)`}}>
          Save The Date
        </p>

        <h2 className="mt-4 text-4xl font-serif MunculAtas">
          Our Wedding
        </h2>

        <div className="w-12 h-pxmx-auto my-8" 
        style={{backgroundColor:data.theme?.warna2}}/>


        {/* =========================
            TANGGAL AKAD
        ========================= */}

        <p className="text-2xl font-serif MunculAtas">
          {data.TanggalAkad}
        </p>


        {/* =========================
            COUNTDOWN AKAD
        ========================= */}

        <div className="grid grid-cols-4 gap-2 mt-10">

          <div className="py-4 "
          style={{border:`1px solid color-mix(in srgb, ${data.theme?.warna2} 20%, transparent)`, backgroundColor: data.theme?.warna2, color:data.theme?.warna1}}>
            <p className="text-3xl font-serif">
              {String(countdown.days).padStart(2, "0")}
            </p>

            <p className="mt-2 text-[9px] tracking-[0.2em] ">
              DAYS
            </p>
          </div>


          <div className="py-4"
          style={{border:`1px solid color-mix(in srgb, ${data.theme?.warna2} 20%, transparent)`, backgroundColor: data.theme?.warna2, color:data.theme?.warna1}}>
            <p className="text-3xl font-serif">
              {String(countdown.hours).padStart(2, "0")}
            </p>

            <p className="mt-2 text-[9px] tracking-[0.2em] ">
              HOURS
            </p>
          </div>


          <div className="py-4"
          style={{border:`1px solid color-mix(in srgb, ${data.theme?.warna2} 20%, transparent)`, backgroundColor: data.theme?.warna2, color:data.theme?.warna1}}>
            <p className="text-3xl font-serif">
              {String(countdown.minutes).padStart(2, "0")}
            </p>

            <p className="mt-2 text-[9px] tracking-[0.2em] ">
              MINUTES
            </p>
          </div>


          <div className="py-4"
          style={{border:`1px solid color-mix(in srgb, ${data.theme?.warna2} 20%, transparent)`, backgroundColor: data.theme?.warna2, color:data.theme?.warna1}}>
            <p className="text-3xl font-serif">
              {String(countdown.seconds).padStart(2, "0")}
            </p>

            <p className="mt-2 text-[9px] tracking-[0.2em] ">
              SECONDS
            </p>
          </div>

        </div>


        {/* =========================
            AKAD
        ========================= */}

        <div className="mt-12  p-6 MunculBawah"
        style={{border:`1px solid color-mix(in srgb, ${data.theme?.warna1} 20%, transparent)`, backgroundColor: data.theme?.warna2, color:data.theme?.warna1}}>

          <p className="text-xs tracking-[0.3em] uppercase "
          style={{color:`color-mix(in srgb, ${data.theme?.warna1} 50%, transparent)`}}>
            Akad Nikah
          </p>

          <h3 className="mt-4 text-2xl font-serif">
            {data.TanggalAkad}
          </h3>

          <p className="mt-3 text-sm "
          style={{color:`color-mix(in srgb, ${data.theme?.warna1} 60%, transparent)`}}>
            {data.JamAkad}
          </p>

          <p className="mt-6 text-sm leading-relaxed "
          style={{color:`color-mix(in srgb, ${data.theme?.warna1} 70%, transparent)`}}>
            {data.LokasiAkad}
          </p>

        </div>


        {/* =========================
            RESEPSI
        ========================= */}

        <div className="mt-4 p-6 MunculBawah "
        style={{border:`1px solid color-mix(in srgb, ${data.theme?.warna1} 20%, transparent)`, backgroundColor: data.theme?.warna2, color:data.theme?.warna1}}>

          <p className="text-xs tracking-[0.3em] uppercase"
          style={{color:`color-mix(in srgb, ${data.theme?.warna1} 50%, transparent)`}}>
            Resepsi
          </p>

          <h3 className="mt-4 text-2xl font-serif ">
            {data.TanggalResepsi}
          </h3>

          <p className="mt-3 text-sm "
          style={{color:`color-mix(in srgb, ${data.theme?.warna1} 60%, transparent)`}}>
            {data.JamResepsi}
          </p>

          <p className="mt-6 text-sm leading-relaxed "
          style={{color:`color-mix(in srgb, ${data.theme?.warna1} 70%, transparent)`}}>
            {data.LokasiResepsi}
          </p>

        </div>


        {/* =========================
            LOCATION BUTTON
        ========================= */}
        <div className="w-full flex justify-center items-center">
          <a href={data.LinkGoogleMapsResepsi} target="blank" >
            <button className="mt-8 border px-6 py-3 text-xs tracking-[0.2em] uppercase flex"
            style={{border:`1px solid ${data.theme?.warnaButtonBorder}`, background:data.theme?.warnaButtonBackground}}>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 hover:scale-110 transition"
              fill="currentColor"
              >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/>
              </svg>  Google map 
            </button>
          </a>
        </div>


      </div>

    </section>
  );
};

export default Event;