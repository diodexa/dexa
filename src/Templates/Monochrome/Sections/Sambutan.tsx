import type { Invitation } from "../../../types/invitationType";
import "../Monochrome.css"

interface Props {
  data: Invitation;
}

const Sambutan = ({ data }: Props) => {
  return (
    <section className="px-6 py-24 FadeinScale"
    style={{backgroundColor: data.theme?.warna1, color:data.theme?.warna2}}>
      <div className="max-w-md mx-auto text-center">

        <p className="text-xs tracking-[0.4em] uppercase"
        style={{color:`color-mix(in srgb, ${data.theme?.warna2} 50%, transparent)`}}>
          Welcome
        </p>

        <h2 className="mt-4 text-3xl font-serif">
          {data.Salam}
        </h2>

        <div className="w-12 h-px  mx-auto my-8 " 
        style={{backgroundColor:data.theme?.warna2}} />


        <p className="mt-6 text-sm leading-8 "
        style={{color:`color-mix(in srgb, ${data.theme?.warna2} 70%, transparent)`}}>
          {data.Sambutan}
        </p>

        <p className="mt-6 text-sm leading-8  "
        style={{color:`color-mix(in srgb, ${data.theme?.warna2} 70%, transparent)`}}>
          Merupakan suatu kehormatan dan kebahagiaan
          bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir di hari bahagia kami.
        </p>



        <div className="mt-10">
          <p className="font-serif text-xl">
            {data.NamabridePanggilan} & {data.NamagroomPanggilan}
          </p>
        </div>

      </div>
    </section>
  );
};

export default Sambutan;