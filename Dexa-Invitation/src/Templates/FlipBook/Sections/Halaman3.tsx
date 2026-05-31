import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const Halaman3  = ({data}:Props) =>  {
  return (
    <div className="Kertas__half Kertas__half--front  flex w-full h-full"
    style={{background: data.theme?.PrimaryColor, color: data.theme?.bodyFont}}>
        <div className="relative w-15 h-full bg-white ">
            <div className=" absolute left-1 top-1/2 -translate-y-1/2 w-fit py-2  " style={{color:data.theme?.headingFont}}>
                <h2 className="text-3xl font-Colvetica" style={{writingMode: "sideways-lr", textOrientation: "mixed"}}>{data.Namabride}</h2>
            </div>
        </div>
        <div className=" w-full p-2 font-ColveticaCond leading-none text-right flex flex-col items-start justify-center mb-5">
            <div className="flex-1 mt-15">
                <p>Putri dari </p>
                <p>{data.BapakpengantinWanita} </p>
                <p>dan </p>
                <p>{data.IbupengantinWanita} </p>
            </div>
            <div className="text-left">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        className="w-6 h-6 hover:scale-110 transition"
                        fill="currentColor">
                            <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.25 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                    </svg>  
                    <p>@Lorem.</p> 
                </div>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 hover:scale-110 transition"
                    fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.35V2h-3.01v13.3a2.9 2.9 0 11-2-2.76V9.48a5.93 5.93 0 104.99 5.87V8.56a7.84 7.84 0 004.59 1.47V6.69z"/>
                    </svg>
                    <p>@Lorem.</p> 
                </div>
            </div>
        </div>
      
      
    </div>
  );
};

export default Halaman3;