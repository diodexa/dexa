import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  scrollY: number;
  isOpen : boolean;
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const progress = (
  scroll: number,
  start: number,
  end: number
) => clamp((scroll - start) / (end - start));

const Opening = ({ data, scrollY, isOpen }: Props) => {

  const p = progress(scrollY, 0, 500);

  // 0 = posisi awal
  // 1 = sudah keluar ke atas

  const scale = 1 + 2 * p;
  const blur = 10 * p;
  const opacity = 1 - p;

  return (
    <div
      className={`absolute left-1/2 top-1/2 h-screen w-full flex flex-col items-center justify-center  pointer-events-none `}
      style={{
        transform: `translate(-50%, -50%) scale(${scale}) `,opacity, filter: `blur(${blur}px)`,}}>
          <div>

            <div className={`absolute inset-0 flex justify-center h-1/2 top-1/2 -translate-y-1/2 transition-all duration-2000 ease-out  ${isOpen? "scale-100 opacity-100": "scale-0 opacity-0"}`}>
              <img src="/Ornament/Ornament-3.png" alt="" className="h-full w-auto absolute" />
              <img src="/Ornament/Ornament-4.png" alt="" className="h-full w-auto absolute" />
            </div>

              {/* text di atas frame */}
              <div className={`relative w-full h-[100px]  transition-all duration-2000 ease-out  ${isOpen? "scale-100 opacity-100": "scale-0 opacity-0"}`}>
                <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center pt-10 px-2 text-xl `}
                  style={{ opacity: opacity, color: data.theme?.warna1}}>
                  <h1 className="text-8xl font-Bromello font-bold"
                    style={{color: data.theme?.warna1}}>
                    {data.NamabridePanggilan?.charAt(0)}
                    <span className="mx-2">&</span>
                    {data.NamagroomPanggilan?.charAt(0)}
                  </h1> 
                  
                </div>

              </div>
            {/* <h1 className="text-7xl font-BetterChill font-bold"
              style={{color: data.theme?.warna1}}>
              {data.NamabridePanggilan?.charAt(0)}
              <span className="mx-2">&</span>
              {data.NamagroomPanggilan?.charAt(0)}
            </h1> */}

            <div className={` absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce transition-all duration-2200 delay-1000 ease-out ${isOpen? "scale-100 opacity-100": "scale-90 opacity-0"}`} >
              <span className=" tracking-[0.3em] uppercase">
                Scroll Down
              </span>

              <span className="mt-2 text-2xl">
                ↓
              </span>
            </div>
          </div>

    </div>
  );
};

export default Opening;