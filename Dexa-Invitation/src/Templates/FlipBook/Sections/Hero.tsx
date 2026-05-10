import { useState } from "react";
import type { Invitation } from "../../../types/invitation";

interface Props {
  data: Invitation;
  guest: string;
}

const Hero = ({ data, guest }: Props) => {
  const [isOpen,SetisOpen] = useState(false);

  return (
    <section className={isOpen? "invisible" : "visible"}>
        <p>Wedding Invitation</p>
        <p><strong>{data.bride} & {data.groom} </strong> </p>
        <p>{data.date} </p>
        <p> dear : </p> 
        <p> {guest} </p>
        <button onClick={()=>SetisOpen(true)}> Buka Undangan</button>

    </section>
    // <section>
    //   <h1>
    //     {data.bride} & {data.groom}
    //   </h1>

    //   <p>{data.date}</p>

    //   <img
    //     src={data.coverImage}
    //     alt="cover"
    //     width={300}
    //   />
    // </section>
  );
};

export default Hero;