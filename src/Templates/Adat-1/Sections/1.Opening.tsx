import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;

  isOpen : boolean
}

const Opening = ({ data, isOpen }: Props) => {


  return (
    <section className={`relative flex h-screen w-full items-start justify-center overflow-x-clip text-center ${isOpen? "MunculBawahBackground-2" : "opacity-0"}`}
    style={{ color: data.theme?.contrasfont }}>
      <div className=" flex z-2 items-center justify-center flex-col h-screen   gap-5">
            <p className="text-l uppercase tracking-[0.27em]">The Weeding Of </p>
            <h2 className={`font-BylinerScript lg:text-4xl lg:leading-15  ${(data.NamagroomPanggilan.length || data.NamabridePanggilan.length)>=7 ? "text-5xl leading-15 " : "text-6xl leading-20" }`}>{data.NamabridePanggilan} & {data.NamagroomPanggilan}</h2>
        </div>
    </section>
        
  );
};

export default Opening;
