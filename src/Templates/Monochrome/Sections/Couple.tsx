import type { Invitation } from "../../../types/invitationType";
import "../Monochrome.css";

interface Props {
  data: Invitation;
}

const Couple = ({ data }: Props) => {
  return (
    <section className="relativepx-6 py-24"
    style={{background:data.theme?.warna2, color:data.theme?.warna1}}>

      <div className="max-w-md mx-auto text-center">

        <p className="text-xs tracking-[0.4em] uppercase "
        style={{color:`color-mix(in srgb, ${data.theme?.warna1} 50%, transparent)`}}>
          The Couple
        </p>

        <h2 className="mt-4 text-4xl font-serif">
          Bride & Groom
        </h2>

        <div className="w-12 h-px  mx-auto my-8" 
        style={{background:data.theme?.warna1}}/>

        <div className="space-y-12">

          <div className="MunculKiri">
            <div className="mx-auto w-40 h-40 rounded-full">
              <img src={data.FotoBride}
                alt={data.Namabride}
                className="w-full h-full object-cover"/>
            </div>

            <h3 className="mt-5 text-3xl font-serif">
              {data.Namabride}
            </h3>

            <div className="flex mt-2 gap-2 items-center justify-center text-xs">         
              {data.AkunIGWanita && (
              <div>
                  <a href={`https://instagram.com/${data.AkunIGWanita}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          className="w-6 h-6 hover:scale-110 transition"
                          fill="currentColor">
                              <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.25 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                      </svg>  
                      
                      <p>@{data.AkunIGWanita}</p> 
                  </a>
                </div>
                )}
                {data.AkunTikTokWanita && (
                <div className="flex items-center justify-center">
                    <a href={`https://tiktok.com/@${data.AkunTikTokWanita}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 hover:scale-110 transition"
                        fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.35V2h-3.01v13.3a2.9 2.9 0 11-2-2.76V9.48a5.93 5.93 0 104.99 5.87V8.56a7.84 7.84 0 004.59 1.47V6.69z"/>
                        </svg>
                        <p>@{data.AkunIGWanita}</p> 
                    </a>
                </div>
                )}
            </div>

            <p className="mt-2 text-sm "
            style={{color:`color-mix(in srgb, ${data.theme?.warna1} 50%, transparent)`}}>
              The Bride
            </p>
          </div>

          <p className="text-4xl font-serif italic">
            &
          </p>

          <div className="MunculKanan">
            <div className="mx-auto w-40 h-40 rounded-full overflow-hidden ">
              <img src={data.FotoGroom} alt={data.Namagroom}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className={`mt-5 font-serif text-3xl`}>
              {data.Namagroom}
            </h3>

            <div className="flex mt-2 gap-2 items-center justify-center text-xs">         
              {data.AkunIGPria && (
              <div>
                  <a href={`https://instagram.com/${data.AkunIGPria}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          className="w-6 h-6 hover:scale-110 transition"
                          fill="currentColor">
                              <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.25 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                      </svg>  
                      
                      <p>@{data.AkunIGPria}</p> 
                  </a>
                </div>
                )}
                {data.AkunTikTokPria && (
                <div className="flex items-center justify-center">
                    <a href={`https://tiktok.com/@${data.AkunTikTokPria}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 hover:scale-110 transition"
                        fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.35V2h-3.01v13.3a2.9 2.9 0 11-2-2.76V9.48a5.93 5.93 0 104.99 5.87V8.56a7.84 7.84 0 004.59 1.47V6.69z"/>
                        </svg>
                        <p>@{data.AkunTikTokPria}</p> 
                    </a>
                </div>
                )}
            </div>

            <p className="mt-2 text-sm "
            style={{color:`color-mix(in srgb, ${data.theme?.warna1} 50%, transparent)`}}>
              The Groom
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Couple;