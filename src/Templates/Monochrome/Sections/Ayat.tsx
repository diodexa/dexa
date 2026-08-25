import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
}

const Ayat = ({ data }: Props) => {
  return (
    <section className="px-6 py-24"
    style={{backgroundColor:data.theme?.warna2, color:data.theme?.warna1}}>
      <div className="max-w-md mx-auto text-center">

        <p className="text-xs tracking-[0.4em] uppercase "
        style={{color:`color-mix(in srgb, ${data.theme?.warna1} 50%, transparent)`}}>
          A Blessed Beginning
        </p>

        <div className="w-12 h-px  mx-auto my-8"
        style={{backgroundColor:data.theme?.warna1,}} />

        <p className="mt-8 text-sm leading-7  italic"
        style={{color:`color-mix(in srgb, ${data.theme?.warna1} 60%, transparent)`}}>
          {data.Ayat}
        </p>

        <p className="mt-6 text-xs tracking-[0.2em] uppercase">
          {data.NamaSurat}
        </p>

      </div>
    </section>
  );
};

export default Ayat;