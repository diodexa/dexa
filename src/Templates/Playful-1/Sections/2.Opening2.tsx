import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
}

const Opening2 = ({ data, animate }: Props) => {
  return (
    <section className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden px-8 text-center ${animate ? "Fadein-1" : "opacity-0"}`} style={{ color: data.theme?.contrasfont }}>
      <div className="pointer-events-none absolute left-5 top-[16%] rotate-[-12deg] text-5xl" style={{ color: data.theme?.warna3 }}>♡</div>
      <div className="pointer-events-none absolute right-7 top-[21%] rotate-[15deg] text-2xl" style={{ color: data.theme?.warna2 }}>✦</div>
      <div className="pointer-events-none absolute left-8 bottom-[19%] rotate-[12deg] text-2xl" style={{ color: data.theme?.warna2 }}>✦</div>
      <div className="pointer-events-none absolute right-5 bottom-[14%] rotate-[-15deg] text-5xl" style={{ color: data.theme?.warna3 }}>♡</div>

      <div className={`relative z-10 flex w-full max-w-[330px] flex-col items-center `}>

        <div className="relative mt-7 px-4">
  
          <p className="font-KH-Blackline text-4xl leading-tight" style={{ color: data.theme?.warna3 }}>
           " Kala itu, kami belum tahu…"
          </p>

        </div>

        <div className="my-8 flex items-center gap-3">
          <span className="h-px w-12 opacity-30" style={{ background: data.theme?.warna3 }} />
          <span className="text-xl" style={{ color: data.theme?.warna2 }}>♡</span>
          <span className="h-px w-12 opacity-30" style={{ background: data.theme?.warna3 }} />
        </div>

        <p className="max-w-[310px] text-[15px] leading-8">
          Pernah menjadi dua anak kecil dengan dunia dan cerita masing-masing. Tumbuh, belajar, dan menjalani perjalanan hidup yang berbeda hingga akhirnya dipertemukan dalam satu cerita.
        </p>

        <p className="mt-5 max-w-[310px] text-[15px] leading-8">
          Hari ini, dua anak kecil itu telah tumbuh dewasa dan memilih untuk berjalan bersama menuju sebuah perjalanan baru.
        </p>

        <div className="mt-8 rotate-[3deg]">
          <p className="font-KH-Blackline text-xl" style={{ color: data.theme?.warna2 }}>And here we are ✦</p>
        </div>
      </div>
      <div className={`absolute -bottom-0  h-[70px] `}>
        <img src="/Ornament/doodleHeart.webp"
            className=" h-full w-auto object-contain object-left-bottom"
            alt="" />
      </div>
    </section>
  );
};

export default Opening2;