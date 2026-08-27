import type { Invitation } from "../../../types/invitationType";
import Countdown from "../../1.Components/Countdown";
import { FloralDivider } from "../utils/floralSvg";

interface Props {
  data: Invitation;
  scrollY: number;
}

const SaveTheDate = ({ data }: Props) => {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-7 text-center"
      style={{
        background: data.theme?.warna1,
        color: data.theme?.warna2,
      }}
    >
      <p className="text-[10px] uppercase tracking-[0.4em]">
        Save The Date
      </p>

      <FloralDivider
        color={data.theme?.warna3}
        width={200}
      />

      <div className="mt-8 w-full space-y-8 text-left">
        <div>
          <p className="font-serif text-2xl">
            Akad
          </p>
          <p className="mt-2 text-sm">
            {data.TanggalAkad}
          </p>
          <p className="text-sm">
            {data.JamAkad}
          </p>
          <p className="mt-2 text-sm">
            {data.LokasiAkad}
          </p>
        </div>

        <div className="text-right">
          <p className="font-serif text-2xl">
            Resepsi
          </p>
          <p className="mt-2 text-sm">
            {data.TanggalResepsi}
          </p>
          <p className="text-sm">
            {data.JamResepsi}
          </p>
          <p className="mt-2 text-sm">
            {data.LokasiResepsi}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Countdown
          date={`${data.TanggalAkadISO}T${data.JamAkad}:00`}
        />
      </div>
    </section>
  );
};

export default SaveTheDate;
