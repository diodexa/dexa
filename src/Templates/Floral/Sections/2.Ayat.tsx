import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  scrollY: number;
}

const Ayat = ({ data }: Props) => {
  return (
    <section className="relative flex h-[40%] w-full py-10 items-center justify-center overflow-hidden px-8 text-top-center bg-center bg-no-repeat bg-cover bg-[length:130%_auto]"
      style={{ background: data.theme?.warna2,color: data.theme?.warna1,}}>
        <div className="absolute bg-blue-500/40 w-screen h-full"/>
      {/* <div className="absolute left-0 bottom-0 w-auto h-[100%] object-contain">
       <img src="/Ornament/awan1.png" alt="" />
      </div> */}

      <div className="relative z-10">

        <p className="text-sm italic leading-7">
          {data.Ayat}
        </p>

        <p className="mt-5 text-xs tracking-widest">
        {data.NamaSurat}
        </p>
      </div>
    </section>
  );
};

export default Ayat;
