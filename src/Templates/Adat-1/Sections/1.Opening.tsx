import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;

  isOpen : boolean
}

const Opening = ({ data, isOpen }: Props) => {


  return (
    <section className={`relative flex h-screen w-full items-start justify-center overflow-x-clip text-center ${isOpen? "MunculBawahBackground-2" : "opacity-0"}`}
    style={{ color: data.theme?.contrasfont }}>
      <div className=" flex z-2 items-center justify-center flex-col h-screen p-10  gap-5 ">
        {/* <div className="absolute bg-white blur-xl opacity-70  p-6 z-1">
            <p className="text-l uppercase tracking-[0.27em]">The Weeding Of </p>
            <h2 className={`font-LTPerfume lg:text-4xl lg:leading-15  ${(data.NamagroomPanggilan.length || data.NamabridePanggilan.length)>=7 ? "text-5xl leading-15 " : "text-6xl leading-20" }`}>{data.NamabridePanggilan} & {data.NamagroomPanggilan}</h2>
        </div> */}
        <div className="relative z-2  w-full ">
          <div className="absolute inset-0 -z-1 rounded-xl bg-white/70 blur-xl rounded-full"/>
          <p className="text-l uppercase tracking-[0.27em]">The Weeding Of </p>
          <h2 className={`font-LTPerfume lg:text-4xl lg:leading-15  ${(data.NamagroomPanggilan.length || data.NamabridePanggilan.length)>=7 ? "text-5xl leading-15 " : "text-6xl leading-20" }`}>{data.NamabridePanggilan} & {data.NamagroomPanggilan}</h2>
        </div>
      </div>
    </section>
        
  );
};

export default Opening;
