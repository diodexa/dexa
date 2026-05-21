import type { Invitation } from "../../../types/invitation";

interface Props {
  data: Invitation
}

const CoverFront = ({data}: Props) => {
  return (
    <div className="Kertas__half Kertas__half--front">
      <img src={data.coverImage} alt="cover"/>
 
      <div className="absolute inset-2 flex flex-col" style={{color:data.theme?.bodyFont}}>
        <p>The Wedding Of</p>
        <h2 className="Judul flex-1">{data.bride} & {data.groom}</h2>
        <p className="flex-none">{data.date}</p>
        
      </div>

   
    </div>
  );
};

export default CoverFront;