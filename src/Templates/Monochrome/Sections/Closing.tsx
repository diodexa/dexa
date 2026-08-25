import type { Invitation } from "../../../types/invitationType";
import VideoBackground from "./Videobackground";


interface Props {
  data: Invitation;
}

const Closing = ({ data }: Props) => {
  return (
    <section className="relative h-screen overflow-hidden "
    style={{background:data.theme?.warna1, color:data.theme?.warna2}}>

      <VideoBackground
        src={data.video}
        overlay
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

        <p className="text-xs tracking-[0.4em] uppercase "
        style={{color:`color-mix(in srgb, ${data.theme?.warna2} 60%, transparent)`}}>
          Thank You
        </p>

        <h2 className="mt-8 text-5xl font-serif">
          {data.NamabridePanggilan}
        </h2>

        <p className="text-3xl font-serif italic my-3">
          &
        </p>

        <h2 className="text-5xl font-serif">
          {data.NamagroomPanggilan}
        </h2>

        <div className="w-12 h-px  my-8"
        style={{backgroundColor:`color-mix(in srgb, ${data.theme?.warna2} 60%, transparent)`}} />

        <p className="text-sm tracking-[0.25em] uppercase "
        style={{color:`color-mix(in srgb, ${data.theme?.warna2} 60%, transparent)`}}>
          Forever Begins Here
        </p>

      </div>

    </section>
  );
};

export default Closing;