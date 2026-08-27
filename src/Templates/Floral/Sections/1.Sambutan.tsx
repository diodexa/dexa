import type { Invitation } from "../../../types/invitationType";
import { FloralCorner, FloralDivider } from "../utils/floralSvg";

interface Props {
  data: Invitation;
  scrollY: number;
}

const Sambutan = ({ data }: Props) => {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-8 text-center"
      style={{
        background: data.theme?.warna1,
        color: data.theme?.warna2,
      }}
    >
      <div className="absolute left-0 top-0">
        <FloralCorner
          color={data.theme?.warna3}
          size={150}
        />
      </div>

      <div className="absolute bottom-0 right-0 rotate-180">
        <FloralCorner
          color={data.theme?.warna3}
          size={150}
        />
      </div>

      <div className="relative z-10">
        <p className="mb-3 text-[10px] uppercase tracking-[0.4em]">
          Assalamu'alaikum
        </p>

        <FloralDivider color={data.theme?.warna3} />

        <p className="mt-5 text-sm leading-7">
          Dengan memohon rahmat dan ridho Allah SWT,
          kami bermaksud mengundang Bapak/Ibu/Saudara/i
          untuk hadir dalam acara pernikahan kami.
        </p>

        <div className="mt-8 font-serif text-xl">
          {data.NamabridePanggilan}
          <span className="mx-2 italic">&</span>
          {data.NamagroomPanggilan}
        </div>
      </div>
    </section>
  );
};

export default Sambutan;
