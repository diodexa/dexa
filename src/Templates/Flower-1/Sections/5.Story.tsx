import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  scrollY: number;
  animate: boolean
}

const Story = ({ data,animate }: Props) => {
  return (
    <section className="relative min-h-screen  px-6 py-16 overflow-x-clip"
      style={{
        background: data.theme?.warna1,
        color: data.theme?.warna2,}}>
        <div className="inline-block bg-white p-1 pb-5 shadow-lg rotate-[-15deg] absolute -top-10 left-0 ">
          <img src={data.gallery?.[4]} alt={data.Namabride}
            className="w-[60px] h-[75px] object-cover"/>
        </div>
        <div className="inline-block bg-white p-1 pb-5 shadow-lg rotate-[15deg] absolute -top-10 left-12 ">
          <img src={data.gallery?.[3]} alt={data.Namabride}
            className="w-[60px] h-[75px] object-cover"/>
        </div>

      <div className="opacity-50">
        <img src="/Ornament/awan1.png" alt=""className="absolute left-1/2 top-1/2 w-auto h-[40%] object-contain  MunculKanan "/>
      </div>
      <div className="opacity-50">
        <img src="/Ornament/awan1.png" alt=""className="absolute right-1/2 bottom-1/2 w-auto h-[40%] object-contain  MunculKiri "/>
      </div>
      
      <div className="absolute bottom-0 -right-32 w-full h-[200px] -rotate-45">
        <div className="sway-flower w-full h-full opacity-50"
        style={{ backgroundImage: "url('/Ornament/sun5.png')" }}/>
      </div>


      <div className="relative z-10">
        <p className={`text-center text-[10px] uppercase tracking-[0.4em]  ${animate ? "MunculAtas-1 " : "opacity-0"}`}>
          Our Journey
        </p>

        <h2 className={`mt-3 text-center  text-4xl font-Cenova uppercase   ${animate ? "MunculBawah-1 " : "opacity-0"}`}>
          Story of Love
        </h2>

        <div className="mt-12 space-y-6">
          {data.Story?.map((story, index) => (
            <div key={index}
              className={`border-b pb-5  ${animate ? (index % 2 ? "text-right MunculKanan-2 ": "MunculKiri-2 text-left") : "opacity-0"} `}
              style={{
                borderColor: data.theme?.warna3,
              }}
            >
              <p className=" text-xl">
                {story.Head}
              </p>

              <p className="mt-2 leading-6 ">
                {story.Story}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Story;
