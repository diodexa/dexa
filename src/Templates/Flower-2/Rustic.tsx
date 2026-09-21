import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../../types/invitationType";
import { fetchComments, type Comment } from "../1.Components/ChatService";

import ModalGallery from "../1.Components/ModalGalery";
import AudioController from "../1.Components/Audio";

import Opening from "./Sections/1.Opening";
import Background from "./Sections/0.Background";
import Ayat from "./Sections/2.Ayat";
import Sambutan from "./Sections/3.Sambutan";
import Couple from "./Sections/4.Couple";
import SaveTheDate from "./Sections/5.SaveTheDate";
import Gallery from "./Sections/6.Gallery";
import UcapanDoa from "./Sections/7.UcapanDoa";
import WeddingGift from "./Sections/8.WedingGift";
import Closing from "./Sections/9.Closing";
import Hero from "./Sections/Hero";

interface Props {
  data: Invitation;
  guest: string;
}

const Rustic = ({ data, guest }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [audioReady, setAudioReady] = useState(false);

  const [animations, setAnimations] = useState<Record<string, boolean>>({});

  const idUndangan = `${data.template} ${data.NamabridePanggilan}-${data.NamagroomPanggilan}`;

  // =========================
  // SCROLL
  // =========================

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollY(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================
  // COMMENT
  // =========================

  const loadComments = async () => {
    try {
      const result = await fetchComments(idUndangan);
      setComments(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadComments();
  }, [idUndangan]);

  // =========================
  // GALLERY
  // =========================

  const handleOpenGallery = (index: number) => {
    setSelectedIndex(index);
    setOpenGallery(true);
  };

  // =========================
  // HERO
  // =========================

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // =========================
  // ANIMATION
  // =========================

  useEffect(() => {
    const newAnimations: Record<string, boolean> = {};

    data.sections?.forEach((section) => {
      newAnimations[section.id] = scrollY >= section.scrollY;
    });

    setAnimations(newAnimations);
  }, [scrollY, data.sections]);

  // =========================
  // AUDIO DELAY
  // =========================

  useEffect(() => {
    if (!isOpen) {
      setAudioReady(false);
      return;
    }

    const timer = setTimeout(() => {
      setAudioReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // =========================
  // SECTION RENDERER
  // =========================

  const renderSection = (id: string, animate: boolean) => {
    switch (id) {
      case "ayat":
        return <Ayat data={data} animate={animate} />;

      case "sambutan":
        return <Sambutan data={data} animate={animate} />;

      case "couple":
        return <Couple data={data} animate={animate} />;

      case "saveDate":
        return <SaveTheDate data={data} animate={animate} />;

      case "gallery":
        return (
          <Gallery
            data={data}
            openGallery={handleOpenGallery}
            animate={animate}
          />
        );

      case "gift":
        return <WeddingGift data={data} animate={animate} />;

      case "ucapan":
        return (
          <UcapanDoa
            data={data}
            loadComments={loadComments}
            comments={comments}
            guest={guest}
            animate={animate}
          />
        );

      case "closing":
        return <Closing data={data} />;

      default:
        return null;
    }
  };

  return (
    <div
      ref={scrollRef}
      className="relative mx-auto h-screen max-w-[385px] overflow-x-clip overflow-y-auto font-BethanyElingston"
      style={{
        background: data.theme?.warna1,
        color: data.theme?.warna2,
      }}
    >
      {/* HERO */}

      <Hero data={data} isOpen={isOpen} setIsOpen={setIsOpen}  guest={guest}/>

      {/* AUDIO */}

      <AudioController data={data} isOpen={audioReady} />

      {/* MODAL GALLERY */}

      <ModalGallery  isOpen={openGallery}  images={data.gallery ?? []} initialIndex={selectedIndex} onClose={() => setOpenGallery(false)}  />

      {/* BACKGROUND */}

      <div className="pointer-events-none sticky top-0 z-0 h-0">
        <Background data={data} isOpen={isOpen} />
      </div>

      {/* BACKGROUND ORNAMENT */}

      <div className="pointer-events-none sticky top-0 z-[2] h-0">
        <div
          className={`absolute -top-20 -right-60 h-[250px] ${
            isOpen ? "MunculKananBackground-1" : ""
          }`}
        >
          <img src="/Ornament/Pohon1.webp"
            alt=""
            className="sway-flower2 h-full w-auto object-contain object-right-bottom scale-x-[-1]"/>
        </div>

        <div  className={`absolute -top-20 -left-50 h-[250px] ${  isOpen ? "MunculKiriBackground-1" : ""  }`} >
          <img src="/Ornament/Pohon2.webp"  alt=""
            className="sway-flower2 h-full w-auto object-contain object-right-bottom scale-x-[-1]" />
        </div>
      </div>

      {/* OPENING */}

      <div className="relative z-[1]">
        <Opening data={data} isOpen={isOpen} />
      </div>

      {/* DYNAMIC SECTIONS */}

      <div className="absolute z-[4]">
        {data.sections?.map((section) => (
          <div key={section.id}>
            {renderSection(
              section.id,
              animations[section.id] ?? false
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rustic;