import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;

  isOpen : boolean
}

const Opening = ({ data, isOpen }: Props) => {


  return (
    <section className={`relative flex h-screen w-full items-start justify-center overflow-x-clip text-center ${isOpen? "MunculBawahBackground-2" : "opacity-0"}`}
    style={{ color: data.theme?.contrasfont }}>
      <div className=" flex z-2 mt-15 ml-10 flex-col max-w-1/2  gap-5">
            <p className="text-l uppercase tracking-[0.27em]">The Weeding Of </p>
            <h2 className={`font-BylinerScript  ${(data.NamagroomPanggilan.length)>=7 ? "text-5xl leading-15" : "text-6xl leading-20" }`}>{data.NamabridePanggilan} & {data.NamagroomPanggilan}</h2>
        </div>
    </section>
        
  );
};

export default Opening;
