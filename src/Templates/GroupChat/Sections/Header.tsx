import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  isOpen: boolean;
  onOpenGroupInfo: () => void;
}

const Header = ({ data, isOpen, onOpenGroupInfo }: Props) => {
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
    <header
      className="w-full h-[68px] shrink-0 flex items-center px-2"
      style={{
        background: data.theme?.warna1,
        color: data.theme?.warna2,
      }}
    >

      {/* ================= LOGO ================= */}
      <div className="w-14 h-full shrink-0 flex items-center justify-center">
        <a
          href="https://dexa-invitation.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <img
            src="/logo-dio.webp"
            alt="Dexa Invitation"
            className="w-11 h-11 object-contain"
          />
        </a>
      </div>


      {/* ================= TITLE ================= */}
      <button
        type="button"
        onClick={onOpenGroupInfo}
        className="flex-1 min-w-0 h-full flex flex-col items-center justify-center text-center px-1"
      >
        <h1 className=" font-FloridaIsland  text-3xl leading-tight truncate max-w-full" >
          {data.NamabridePanggilan} & {data.NamagroomPanggilan}
        </h1>

        <p className="text-xs opacity-70 mt-0.5  tracking-[0.1em]">
          klik untuk detail
        </p>
      </button>


      {/* ================= AUDIO ================= */}
      <div className="w-14 h-full shrink-0 flex items-center justify-center">
        <audio
          ref={audioRef}
          src={data.music}
          loop
        />

        {isOpen && (
          <button
            type="button"
            onClick={toggle}
            aria-label={
              isPlaying
                ? "Pause musik"
                : "Play musik"
            }
            className="
              w-11
              h-11
              flex
              items-center
              justify-center
              rounded-full
              transition-transform
              active:scale-90
            "
          >
            <i
              className={`
                fa-regular
                ${
                  isPlaying
                    ? "fa-circle-pause"
                    : "fa-circle-play"
                }
                text-3xl
              `}
            />
          </button>
        )}
      </div>

    </header>
  );
};

export default Header;
