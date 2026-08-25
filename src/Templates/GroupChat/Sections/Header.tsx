import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  isOpen: boolean;
  onOpenGroupInfo: () => void;
}
const Header  = ({data, isOpen, onOpenGroupInfo} : Props) => {


    const audioRef = useRef<HTMLAudioElement>(null);
      const [isPlaying, setIsPlaying] = useState(false);

      useEffect(() => {
        const audio = audioRef.current;

        if (!audio || !data.music || !isOpen) return;

        const playAudio = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
          } catch (error) {
            console.error("Audio gagal diputar:", error);
            setIsPlaying(false);
          }
        };

        playAudio();
      }, [isOpen, data.music]);
    
      useEffect(() => {
      const handleVisibilityChange = () => {
        const audio = audioRef.current;
    
        if (!audio) return;
    
        if (document.hidden) {
          audio.pause();
          setIsPlaying(false);
        }
      };
    
      document.addEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }, []);
    
      const toggle = async () => {
        const audio = audioRef.current;
    
        if (!audio) return;
    
        if (audio.paused) {
          try {
            await audio.play();
            setIsPlaying(true);
          } catch (error) {
            console.error("Audio gagal diputar:", error);
          }
        } else {
          audio.pause();
          setIsPlaying(false);
        }
      };
    
      if (!data.music) return null;
    return (
        <div className="w-full h-23 flex items-center font-LoveFlorida" 
        style={{background: `${data.theme?.warna1}` ,color: data.theme?.warna2,}}>
          <div className="flex-1 animate-[bounce_3s_linear_infinite]">
              <a href="https://dexa-invitation.com" target="blank">
                <img src="/logo-dio.webp" className="max-h-25 w-auto object-contain"  />

              </a>

          </div>
          <div className="flex-3 flex flex-col h-full  mt-1 tracking-wider "
          onClick={onOpenGroupInfo}>
          
            <h1 className="text-3xl leading-none">{data.NamabridePanggilan} & {data.NamagroomPanggilan} <br/> Wedding</h1>
            <p className="text-lg animate-pulse"> klik untuk detail </p>
    
            
          </div>
          <div className="flex-1 flex h-full items-center justify-center ">
            <audio ref={audioRef} src={data.music} loop/>

            {isOpen && (
                <button type="button"
                onClick={toggle}
                className="items-center justify-center rounded-full pointer-events-auto">

                <i className={`fa-regular ${isPlaying ? "fa-circle-pause" : "fa-circle-play"} text-5xl animate-[spin_4s_linear_infinite]`}
                />
                </button>
              )}
          </div>
        </div>
    )
}


export default Header