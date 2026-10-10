import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  isOpen: boolean;
}

const Opening = ({ data, isOpen }: Props) => {
  return (
    <section className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden px-7 text-center transition-all duration-700 ${isOpen ? "opacity-100" : "opacity-0"}`} style={{  color: data.theme?.warna3 }}>
      <div className={`relative flex h-full min-h-screen w-full flex-col items-center ${isOpen ? "MunculBawah-1" : "opacity-0"}`}>




        {/* JUDUL */}
        <div className={`relative z-20 mt-[13%] ${isOpen ? "MunculBawah-1" : "opacity-0"}`}>
  
          <h2 className="mt-2  text-3xl leading-none" style={{ color: data.theme?.warna3 }}>
            Akhirnya kami menikah...
          </h2>
        </div>

        {/* NAMA */}
        <div className={`flex items-center justify-center gap-3 font-KH-Blackline leading-none text-6xl z-20 mt-5 ${isOpen ? "MunculBawah-1" : "opacity-0"}`}>

            <p className="max-w-[40%] ">{data.NamabridePanggilan}</p>
            <p className="shrink-0 " style={{ color: data.theme?.warna2 }}>&</p>
            <p className="max-w-[40%] ">{data.NamagroomPanggilan}</p>
        </div>
        
        {/* FOTO */}
        <div className={`relative z-10 flex h-[430px]  w-full items-center justify-center ${isOpen ? "MunculBawah-1" : "opacity-0"}`}>
          <img src={data.coverImage} alt="" className="h-full  w-full object-contain object-center" style={{ filter: `drop-shadow(2px 0 0 ${data.theme?.warna3}) drop-shadow(-2px 0 0 ${data.theme?.warna3}) drop-shadow(0 2px 0 ${data.theme?.warna3}) drop-shadow(0 -2px 0 ${data.theme?.warna3}) drop-shadow(0 6px 8px rgba(0,0,0,0.12))` }} />
          <div className="absolute left-[1%] top-[6%] w-[125px] rotate-[-7deg] text-left">
            <p className="font-KH-Blackline text-[15px] leading-5" >
              “Kamu nanti mau jadi apa kalau udah besar?"
            </p>
          </div>

          <div className="absolute right-[-1%] top-[10%]  rotate-[16deg] text-left">
            <p className="font-KH-Blackline text-[15px] leading-5" style={{color:data.theme?.warna2}}>
              “Jadi pasangan kamu dong.”
            </p>
          </div>
          <div className="absolute left-[8%] top-[20%] rotate-[-20deg] text-3xl" style={{ color: data.theme?.warna2, }}> ♡</div>
          <div className="absolute left-[16%] top-[43%] rotate-[15deg] text-3xl" style={{ color: data.theme?.warna3, }}> ✦</div>
          <div className="absolute right-[8%] top-[24%] rotate-[20deg] text-3xl" style={{ color: data.theme?.warna3, }}> ♡</div>
          <div className="absolute right-[15%] top-[47%] rotate-[-10deg] text-3xl" style={{ color: data.theme?.warna2, }}> ✦</div>
          


          {/* TANGGAL MENIMPA FOTO */}
          {/* <div className="absolute bottom-[5%] left-1/2 z-20 -translate-x-1/2">
            <div className="relative px-6 py-2">
            <div className="absolute inset-0 -rotate-[2deg] bg-white opacity-95" style={{ clipPath: "polygon(8% 25%, 14% 12%, 28% 13%, 36% 5%, 50% 10%, 63% 5%, 74% 14%, 88% 13%, 94% 27%, 91% 42%, 98% 55%, 91% 68%, 94% 82%, 78% 87%, 65% 96%, 51% 89%, 37% 96%, 25% 87%, 10% 89%, 8% 74%, 2% 62%, 9% 48%, 3% 36%)" }} />
            <p className="relative z-10 py-1 -rotate-5 text-[13px]" style={{ color: data.theme?.warna3, textShadow: "0.5px 0 0 currentColor, -0.5px 0 0 currentColor, 0 0.5px 0 currentColor, 0 -0.5px 0 currentColor" }}>{data.TanggalAkad}</p>
            </div>
            </div> */}
        </div>
        <div className={`absolute bottom-0 left-1/2 z-30 flex flex-col items-center  -translate-x-1/2 ${isOpen ? "MunculBawahBackground-1" : "opacity-0"}`}>
          <span className="text-[9px] uppercase tracking-[.25em]" style={{ color: data.theme?.warna3 }}>Swipe Down</span>
          <div className="flex h-10 w-7 animate-bounce flex-col items-center justify-center">
            <span className="h-3 w-3 rotate-45 border-b-2 border-r-2 opacity-30" style={{ borderColor: data.theme?.warna3 }} />
            <span className="-mt-1 h-3 w-3 rotate-45 border-b-2 border-r-2 opacity-60" style={{ borderColor: data.theme?.warna3 }} />
            <span className="-mt-1 h-3 w-3 rotate-45 border-b-2 border-r-2" style={{ borderColor: data.theme?.warna3 }} />
          </div>
        </div>


       

        {/* ORNAMEN BAWAH */}
        <div className="pointer-events-none absolute bottom-[12%] left-0 rotate-[-15deg] text-3xl"  style={{ color: data.theme?.warna2}}>✦</div>
        <div className="pointer-events-none absolute bottom-[14%] right-0 rotate-[15deg] text-3xl"  style={{ color: data.theme?.warna3}}>♡</div>


      </div>
    </section>
  );
};

export default Opening;