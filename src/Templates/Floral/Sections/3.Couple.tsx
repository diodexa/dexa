import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;

}

const FloralCouple = ({ data }: Props) => {



  return (
    <section
  className="relative w-full h-screen flex items-center justify-center"
  style={{ background: data.theme?.warna1 }}>
  {/* ORNAMENT */}
  <div className="absolute left-0 top-0 w-[90px] h-full bg-repeat-y bg-left-top bg-contain
  [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_70%,transparent_100%)]
  [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_70%,transparent_100%)]"
  style={{backgroundImage: "url('/Ornament/sun2.png')", }}/>
  <div className="opacity-50">
    <img src="/Ornament/awan1.png" alt=""className="absolute left-20 top-0 w-auto h-[40%] object-contain MunculKiri "/>

  </div>

  {/* CONTENT */}
  <div className="relative z-10 w-full max-w-[500px] h-full flex flex-col items-center justify-center pl-[70px] pr-5 font-LoveFlorida">
    <h2 className="text-4xl mb-8  uppercase font-Perandory ">Bride & Groom</h2>

    <div className="w-full flex flex-col gap-8 text-xl">
      {/* BRIDE */}
      <div className="flex items-center gap-4 ">
        <div className="bg-white p-2 pb-1 shadow-lg rotate-[-3deg] ">
          <img src={data.FotoBride} alt={data.Namabride}
            className="w-[100px] h-[120px] object-cover"/>
          <p className="font-Signature text-4xl" style={{color:data.theme?.warna1}}>Bride</p>
        </div>
        <div className="text-left">
          <p className="text-3xl">{data.Namabride}</p>
          <p>putri dari</p>
          <p >
            {data.BapakpengantinWanita} & {data.IbupengantinWanita}
          </p>
        </div>
      </div>

      {/* GROOM */}
      <div className="flex items-center gap-4">
         <div className="bg-white p-2 pb-1 shadow-lg rotate-[3deg]">
          <img
            src={data.FotoGroom}
            alt=""
            className="w-[100px] h-[120px] object-cover"/>
          <p className="font-Signature text-4xl" style={{color:data.theme?.warna1}}>Groom</p>
        </div>
        <div className="text-left">
          <p className="text-3xl">{data.Namagroom}</p>
          <p >putra dari</p>
          <p>
            {data.BapakpengantinPria} & {data.IbupengantinPria}
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* BOTTOM */}
  <div className="absolute bottom-5 left-0 w-full text-center z-10">
    <p
      className="text-xs tracking-[0.25em]"
      style={{ color: data.theme?.warna3 }}
    >
      TWO SOULS · ONE STORY
    </p>
  </div>
</section>
  );
};

export default FloralCouple;