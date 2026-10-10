import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;

}

const Ayat = ({ data, animate }: Props) => {
  return (
    <section className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-8 py-20 text-center ${animate ? "MunculBawah-1" : "opacity-0"} `} style={{ color: data.theme?.contrasfont }}>
      <div className="absolute -right-8 top-16 z-[1] h-[150px] ">
        <img src="/Ornament/doodleLampuGantung.webp"  alt=""
          className=" h-full w-auto scale-x-[-1] object-contain object-center"
        />
      </div>
      <div className="absolute -left-8 top-16 z-[1] h-[150px] ">
        <img  src="/Ornament/doodleLampuGantungHijau.webp"  alt=""
          className=" h-full w-auto scale-x-[-1] object-contain object-center"
        />
      </div>

      {/* <div className="absolute -right-8 top-16 z-[1] h-[150px] rotate-[-12deg]">
        <img
          src="/Ornament/LilyPink3.webp"
          alt=""
          className="sway-flower2 h-full w-auto scale-x-[-1] object-contain object-center"
        />
      </div>

      <div className="absolute -bottom-8 -left-8 z-[1] h-[140px] rotate-[18deg]">
        <img
          src="/Ornament/LilyPink3.webp"
          alt=""
          className="sway-flower2 h-full w-auto object-contain object-center"
        />
      </div> */}

      <div className={`relative z-[2] flex w-full max-w-[330px] flex-col items-center `}>
        <div className="mb-5 flex items-center gap-3  uppercase tracking-[0.05em]" style={{ color: data.theme?.warna3 }}>
          <span>♡</span>
          <span>{data.Salam}</span>
          <span>♡</span>
        </div>

        <div className="relative w-full rotate-[-1deg] rounded-[28px]  px-7 py-9 shadow-[0_10px_30px_rgba(184,92,120,0.12)]"
        style={{background:data.theme?.warnaButtonBorder}}>
          


          <p className="text-[23px] leading-[2.1]">
            {data.Ayat}
          </p>

          <div className="mx-auto mt-7 h-px w-12" style={{ background: data.theme?.warna1 }} />

          <p className="mt-6 text-[12px] leading-7 opacity-80">
            {data.Ayat2}
          </p>

          <div
            className="mt-6 text-[10px] uppercase tracking-[0.3em]"
            style={{ color: data.theme?.warna3 }}
          >
            — {data.NamaSurat} —
          </div>
        </div>

        {/* <div className="mt-6 rotate-[3deg] rounded-full px-4 py-1 text-[9px] uppercase tracking-[0.25em]" style={{ background: data.theme?.warna1, color: data.theme?.warna3 }}>
          A little blessing ♡
        </div> */}
      </div>
    </section>
  );
};

export default Ayat;