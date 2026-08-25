import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../../types/invitationType";

interface Props {
  data: Invitation;
  isOpen: boolean;
}

const AudioController = ({ data, isOpen }: Props) => {
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
    <>
      <audio ref={audioRef} src={data.music} loop/>

      {isOpen && (
        <button type="button"
          onClick={toggle}
          className="fixed right-5 bottom-20 z-[999] flex h-10 w-10 items-center justify-center rounded-full pointer-events-auto"
          style={{background: data.theme?.warnaButtonBackground, color: data.theme?.warnaButtonBorder}}
        >
          <i className={`fas ${isPlaying? "fa-circle-pause ": "fa-circle-play"} text-3xl animate-[spin_4s_linear_infinite]`}/>
        </button>
      )}
    </>
  );
};

export default AudioController;