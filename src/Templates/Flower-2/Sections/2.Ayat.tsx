import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
}

const Ayat = ({ data, animate }: Props) => {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden px-8 py-20 text-center"
      style={{color: data.theme?.contrasfont, background:data.theme?.warna1}}>
        <div className="absolute -bottom-15 -right-15 z-[1] h-[250px] rotate-30">
          <img src="/Ornament/DaunDahlia.webp"alt=""
            className="sway-flower1  h-full w-auto object-contain object-right-bottom scale-x-[-1]"/>
        </div>
        <div className="absolute -top-15 -left-15 z-[1] h-[250px] rotate-210">
          <img src="/Ornament/DaunDahlia.webp"alt=""
            className="sway-flower1  h-full w-auto object-contain object-right-bottom scale-x-[-1]"/>
        </div>

 
      <div className={`relative z-[2] flex w-full max-w-[330px] flex-col items-center ${animate ? "Fadein-1 " : "opacity-0"}`}>

        <p className="text-[24px] leading-[2.2]"
          style={{ color: data.theme?.contrasfont }}>
            {data.Ayat}
        </p>

        <p className="mt-8 text-[13px] leading-7 "
          style={{ color: data.theme?.contrasfont }}>
          {data.Ayat2}
        </p>

        <div className="mt-7 text-[11px] uppercase tracking-[0.3em] "
          style={{ color: data.theme?.warna3 }}>
          {data.NamaSurat}
        </div>
      </div>
    </section>
  );
};

export default Ayat;