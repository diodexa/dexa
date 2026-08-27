import type { Invitation } from "../../../types/invitationType";
import { FloralCorner } from "../utils/floralSvg";

interface Props {
  data: Invitation;
  scrollY: number;
}

const Groom = ({ data }: Props) => {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      style={{
        background: data.theme?.warna2,
        color: data.theme?.warna1,
      }}
    >
      <div className="absolute bottom-0 right-0 rotate-180">
        <FloralCorner
          color={data.theme?.warna3}
          size={160}
        />
      </div>

      <div className="relative z-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em]">
          The Groom
        </p>

        <div className="mx-auto my-6 h-56 w-44 overflow-hidden rounded-t-full border">
          <img
            src={data.FotoGroom}
            alt={data.Namagroom}
            className="h-full w-full object-cover"
          />
        </div>

        <h2 className="font-serif text-4xl">
          {data.Namagroom}
        </h2>

        <p className="mt-4 text-sm">
          Putra dari
        </p>

        <p className="mt-2 text-sm leading-6">
          {data.BapakpengantinPria}
          <br />
          &
          <br />
          {data.IbupengantinPria}
        </p>
      </div>
    </section>
  );
};

export default Groom;
