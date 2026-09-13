import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;

  isOpen : boolean
}

const Opening = ({ data, isOpen }: Props) => {


  return (
    <section className={`relative flex h-screen w-full items-center justify-center overflow-x-clip text-center ${isOpen? "MunculBawahBackground-2" : "opacity-0"}`}
    style={{ color: data.theme?.contrasfont }}>
      <div className="relative h-[70%] w-[300px] overflow-hidden pointer-events-none  ">
          {/* bingkai luar */}
          <div className="absolute inset-[-8px] rounded-[150px_150px_30px_30px] border-[3px] border-[#c6a66b]" />
          {/* bingkai dalam */}
          <div className="absolute inset-[5px] rounded-[145px_145px_25px_25px] border border-[#e0c98f]/70" />
          {/* overlay */}
          <div className="absolute inset-[12px] rounded-[140px_140px_20px_20px] bg-white/50" />

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5"
          style={{ color: data.theme?.contrasfont }}
          >
          <p className="text-2xl "> The Wedding of</p>

          <div className="mt-8 font-Tempting text-4xl"
              style={{ color: data.theme?.warna3 }}>
              {data.NamabridePanggilan}
              <span className="mx-2 italic">&</span>
              {data.NamagroomPanggilan}
          </div>
        </div>
        <div className={`absolute bottom-20 left-1/2 ${isOpen? "MunculBawahBackground-3" : "opacity-0"} `}>
          <i className="fa-solid fa-arrow-down text-xl animate-bounce" />
        </div>
      </div>
    </section>
        
  );
};

export default Opening;
