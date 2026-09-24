import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
}

const Ayat = ({ data, animate }: Props) => {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-8 py-20 text-center" style={{ color: data.theme?.contrasfont }}>
      

 
      <div className={`relative z-[2] flex w-full max-w-[330px] flex-col items-center ${animate ? "Fadein-1 " : "opacity-0"}`}>
        <div className="absolute inset-0 -z-1 rounded-xl bg-white/70 blur-xl rounded-full"/>
        <div className="p-6">
          <p className="text-[24px] leading-[2.2]">
              {data.Ayat}
          </p>

          <p className="mt-8 text-[13px] leading-7 ">
            {data.Ayat2}
          </p>

          <div className="mt-7 text-[11px] uppercase tracking-[0.3em] "
            style={{ color: data.theme?.warna3 }}>
            {data.NamaSurat}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ayat;