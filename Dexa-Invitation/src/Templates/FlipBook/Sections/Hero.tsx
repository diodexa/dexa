import { useState } from "react";
import type { Invitation } from "../../../types/invitation";
import "../FlipBook.css"

interface Props {
  data: Invitation;
  guest: string;
}

const Hero = ({ data, guest }: Props) => {
  const [isOpen,SetisOpen] = useState(false);

  return (
    <section 
    id="hero-slider"
    className={`absolute w-full h-screen overflow-hidden flex justify-center p-2 ${isOpen ? "invisible" : "visible"}`}
    style={{ "--warna": data.theme?.backgroundColor} as React.CSSProperties}
    >
      <img src={data.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover"/>
      <div 
      className="z-50 flex flex-col mb-14 font-medium " 
      style={{color:data.theme?.bodyFont}}>
        <p>Wedding Invitation</p>
        <h1 style={{color:data.theme?.headingFont}} className="text-glow "><strong>{data.bride} & {data.groom} </strong> </h1>
        <div className="grow-1 flex flex-col justify-end">
          <p>{data.date} </p>
          <p> dear : </p> 
          <p className="text-lg p-4 font-semibold">{guest} </p>
        </div>
        <button onClick={()=>SetisOpen(true)} className="border p-2 rounded cursor-pointer" style={{background:data.theme?.headingFont, color:data.theme?.bodyFont}}> Buka Undangan</button>
      </div>

    </section>
  );
};

export default Hero;