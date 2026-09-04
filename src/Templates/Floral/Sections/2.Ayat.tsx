import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  scrollY: number;
  animate: boolean;
}

const Ayat = ({ data,animate }: Props) => {
  return (
    <section className="relative flex min-h-[45vh] w-full items-center justify-center overflow-hidden px-8 py-16 text-center"
      style={{
        background: data.theme?.warna1,
        color: data.theme?.warna2,
      }}>
      <div
        className={`absolute inset-x-6 inset-y-10 rounded-3xl border backdrop-blur-md ${animate ? "Fadein-1 " : ""}` }
        style={{
          background: "rgba(255,255,255,0.12)",
          borderColor: "rgba(255,255,255,0.25)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
        }}
      />

      <div className={`relative z-10 flex max-w-[650px] flex-col items-center ${animate ? "Fadein-1 " : ""}`}>

        <p className="text-base italic leading-8 md:text-lg md:leading-9">
          “{data.Ayat}”
        </p>

        <div
          className="my-7 h-px w-12 opacity-40"
          style={{ background: data.theme?.warna2 }}
        />

        <p className="text-xs uppercase tracking-[0.3em] opacity-70">
          {data.NamaSurat}
        </p>
      </div>
    </section>
  );
};

export default Ayat;