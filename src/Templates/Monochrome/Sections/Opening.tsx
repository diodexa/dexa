import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  isOpen: boolean;
}

const Opening = ({ data, isOpen }: Props) => {

  const brideInitial =
    data.NamabridePanggilan?.charAt(0).toUpperCase();

  const groomInitial =
    data.NamagroomPanggilan?.charAt(0).toUpperCase();

  return (
    <section className="w-full h-[120dvh]  flex items-center justify-center overflow-hidden"
    style={{color:data.theme?.warna2, background:data.theme?.warna1}}>

      <div className={` flex flex-col
          transition-all duration-[1500ms] ease-out
          ${ isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} >
            <div className="flex  items-center gap-5">

                <span className="text-7xl font-serif">
                {brideInitial}
                </span>

                <span className="text-4xl "
                style={{color:`color-mix(in srgb, ${data.theme?.warna2} 40%, transparent)`}}>
                &
                </span>

                <span className="text-7xl font-serif">
                {groomInitial}
                </span>
            </div>

            <div className="mt-5 flex flex-col gap-10 items-center justify-center">
                <p className="tracking-[1.2em] uppercase">Wedding</p>
                <div className={` flex flex-col items-center  animate-bounce transition-all duration-2200 delay-1000 ease-out ${isOpen? "scale-100 opacity-100": "scale-90 opacity-0"}`} >
                    <span className=" tracking-[0.3em] uppercase  "style={{color:`color-mix(in srgb, ${data.theme?.warna2} 30%, transparent)`}}>
                        Scroll Down
                    </span>

                    <span className="mt-2 text-2xl text-white/30">
                        ↓
                    </span>
                </div>
            </div>
        
      </div>

    </section>
  );
};

export default Opening;