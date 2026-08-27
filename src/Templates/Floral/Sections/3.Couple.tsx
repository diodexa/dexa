import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  scrollY: number;
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const progress = (scroll: number, start: number, end: number) =>
  clamp((scroll - start) / (end - start));

const FloralCouple = ({ data, scrollY }: Props) => {
  const p = progress(scrollY, 1000, 1500);

  const scale = 0.9 + p * 0.1;
  const opacity = p;

  return (
    <section
      className="absolute inset-0 w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity,  transform: `scale(${scale})`, background: data.theme?.warna1
      }}
    >
      {/* ================= BACKGROUND ORNAMENT ================= */}
      <div className="absolute inset-0 pointer-events-none">

        {/* bunga kiri atas */}
        <svg
          viewBox="0 0 200 300"
          className="absolute -left-10 -top-5 w-40 h-60"
          fill="none"
          stroke={data.theme?.warna3}
          strokeWidth="2"
        >
          <path d="M20 280 C40 200 60 120 150 30" />
          <path d="M60 180 C30 160 20 130 40 100 C70 120 75 150 60 180Z" />
          <path d="M85 130 C70 90 85 55 120 40 C130 80 115 110 85 130Z" />
          <circle cx="145" cy="35" r="18" />
          <circle cx="145" cy="35" r="7" />
        </svg>

        {/* bunga kanan bawah */}
        <svg
          viewBox="0 0 200 300"
          className="absolute -right-10 -bottom-5 w-40 h-60 rotate-180"
          fill="none"
          stroke={data.theme?.warna3}
          strokeWidth="2"
        >
          <path d="M20 280 C40 200 60 120 150 30" />
          <path d="M60 180 C30 160 20 130 40 100 C70 120 75 150 60 180Z" />
          <path d="M85 130 C70 90 85 55 120 40 C130 80 115 110 85 130Z" />
          <circle cx="145" cy="35" r="18" />
          <circle cx="145" cy="35" r="7" />
        </svg>
      </div>

      {/* ================= TITLE ================= */}
      <div className="absolute top-8 text-center z-20">

        <h2
          className="text-4xl font-Bromello mt-2"
          style={{ color: data.theme?.warna2 }}
        >
          Bride & Groom
        </h2>
      </div>

      {/* ================= DOOR FRAME ================= */}
      <div
        className="relative z-10 w-[90%] max-w-[360px] h-[90%] mt-10"
        style={{
          border: `2px solid ${data.theme?.warna3}`,
          borderRadius: "180px 180px 20px 20px",
          background: data.theme?.warna3,
          boxShadow: `0 10px 40px ${
            data.theme?.warna1
          }30`,
        }}
      >

        {/* inner frame */}
        <div
          className="absolute inset-3 overflow-hidden"
          style={{
            border: `1px solid ${data.theme?.warna3}`,
            borderRadius: "170px 170px 12px 12px",
          }}
        >

          {/* ================= COUPLE ================= */}
          <div className="relative w-[320px] h-[600px] mx-auto">

            {/* FRAME / PINTU */}
            <img src="/Ornament/floral-door.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
            />

            {/* ISI */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">

              {/* FOTO BRIDE */}
              <div className="w-[120px] h-[150px] overflow-hidden rounded-t-full">
                <img
                  src={data.FotoBride}
                  alt={data.Namabride}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-bold">
                {data.NamabridePanggilan}
              </p>

              <span className="text-xl">&</span>

              {/* FOTO GROOM */}
              <div className="w-[120px] h-[150px] overflow-hidden rounded-t-full">
                <img
                  src={data.FotoGroom}
                  alt={data.Namagroom}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-bold">
                {data.NamagroomPanggilan}
              </p>

            </div>
          </div>
        </div>

        {/* ================= FRAME ORNAMENT ================= */}

        <svg
          viewBox="0 0 400 700"
          className="absolute -inset-5 w-[calc(100%+40px)] h-[calc(100%+40px)] pointer-events-none"
          fill="none"
          stroke={data.theme?.warna3}
          strokeWidth="1.5"
        >
          {/* kiri */}
          <path d="M20 620 C0 500 30 400 80 320" />
          <path d="M35 500 C70 470 85 430 80 390" />
          <path d="M50 430 C20 410 15 380 30 350" />

          {/* kanan */}
          <path d="M380 620 C400 500 370 400 320 320" />
          <path d="M365 500 C330 470 315 430 320 390" />
          <path d="M350 430 C380 410 385 380 370 350" />

          {/* daun */}
          <path d="M80 320 C50 290 55 260 90 250 C105 280 100 305 80 320Z" />
          <path d="M320 320 C350 290 345 260 310 250 C295 280 300 305 320 320Z" />

          {/* bunga atas */}
          <circle cx="200" cy="30" r="22" />
          <circle cx="200" cy="30" r="8" />

          <path d="M200 8 C180 0 165 15 180 30" />
          <path d="M220 8 C240 0 235 20 220 30" />
        </svg>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="absolute bottom-5 text-center">
        <p
          className="text-xs tracking-[0.25em]"
          style={{ color: data.theme?.warna3 }}
        >
          TWO SOULS · ONE STORY
        </p>
      </div>
    </section>
  );
};

export default FloralCouple;