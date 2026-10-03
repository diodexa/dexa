import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
}

const Sambutan = ({ data, animate }: Props) => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 text-center"
      style={{ color: data.theme?.warna2 }} >
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: data.theme?.warna1 }} />

      {/* Ornamen bunga kiri bawah */}
      <div className="absolute -bottom-4 -left-8 z-2 w-[180px]">
        <img src="/Ornament/BungaMerah1.webp"  alt=""
          className="w-full object-contain" />
      </div>

      {/* Ornamen bunga kanan bawah */}
      <div className="absolute -bottom-4 -right-8 z-2 w-[180px]">
        <img  src="/Ornament/BungaMerah1.webp" alt=""
          className="w-full object-contain"  />
      </div>

      {/* Ornamen bunga kecil atas */}
      <div className="absolute -top-6 -left-8 z-2 w-[110px] rotate-[-15deg] opacity-80">
        <img  src="/Ornament/BungaMerah4.webp"
          alt=""
          className="w-full object-contain" />
      </div>

      <div className="absolute -top-6 -right-8 z-2 w-[110px] rotate-[15deg] opacity-80">
        <img src="/Ornament/BungaMerah4.webp"  alt=""
          className="w-full object-contain"/>
      </div>

      {/* Frame utama */}
      <div className="relative z-3 w-[92%] max-w-md">
        {/* panel transparan */}
        <div className="absolute inset-[3%] rounded-[35px]"
          style={{
            background: `${data.theme?.warna1}cc`, }}  />

        {/* garis frame */}
        <div className="absolute inset-0 rounded-[35px] border"
          style={{  borderColor: `${data.theme?.warna3}90`,  }} />

       

        {/* Isi */}
        <div className="relative z-5 flex min-h-[620px] flex-col items-center justify-center px-10 py-20">
          <p className={`text-sm uppercase tracking-[0.18em] ${
              animate ? "MunculBawah-1" : "opacity-0"
            }`} >
            {data.Salam}
          </p>

          <div className={`my-7 flex items-center justify-center gap-3 ${
              animate ? "MunculAtas-1" : "opacity-0"
            }`}  >
            <span  className="h-px w-12"
              style={{ backgroundColor: data.theme?.warna3 }} />

            <span className="text-lg"
              style={{ color: data.theme?.warna3 }}  >
              ◆
            </span>

            <span className="h-px w-12"
              style={{ backgroundColor: data.theme?.warna3 }}  />
          </div>

          <p  className={`text-sm leading-7 ${
              animate ? "MunculAtas-1" : "opacity-0"
            }`}  >
            {data.Sambutan}
          </p>

          <div className={`mt-10 text-4xl ${
              animate ? "MunculBawah-1" : "opacity-0"
            }`}
            style={{ color: data.theme?.warna3 }} >
            <span className="font-Tempting">
              {data.NamabridePanggilan.charAt(0)}
            </span>

            <span className="mx-2 text-xl">&</span>

            <span className="font-Tempting">
              {data.NamagroomPanggilan.charAt(0)}
            </span>
          </div>

          {/* garis kecil bawah */}
          <div className={`mt-7 h-px w-20 ${
              animate ? "MunculBawah-1" : "opacity-0"
            }`}
            style={{ backgroundColor: data.theme?.warna3 }}  />
        </div>
      </div>
    </section>
  );
};

export default Sambutan;