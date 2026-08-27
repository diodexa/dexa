import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../../types/invitationType";

import Gallery from "./Sections/Gallery";
import Video from "./Sections/video";
import Ucapan from "./Sections/UcapanDoa";
import { fetchComments, type Comment } from "../1.Components/ChatService";
import Gallery2 from "./Sections/Gallery2";
import WeddingGift from "./Sections/WeddingGift";
import Closing from "./Sections/Closing";
import FallingLeaves from "../1.Components/FallingLeaves";
import Sambutan from "./Sections/1.Sambutan";
import Ayat from "./Sections/2.Ayat";
import Bride from "./Sections/3.Bride";
import Groom from "./Sections/4.Groom";
import SaveTheDate from "./Sections/5.SaveTheDate";
import Story from "./Sections/6.Story";
import ModalGallery from "../1.Components/ModalGalery";
import BottomNav from "../1.Components/BottomNav";
import AudioController from "../1.Components/Audio";
import Hero from "./Sections/Hero";
import Opening from "./Sections/0.Opening";

interface Props {
  data: Invitation;
  guest: string;
}

const ScrollLeaf = ({ data, guest }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollY, setScrollY] = useState(0);
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // =========================
  // SCROLL
  // =========================

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        setScrollY(container.scrollTop);
        ticking = false;
      });
    };

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================
  // ACTIVE SECTION
  // =========================

  const SECTION_HEIGHT = 500;
  const TOTAL_SECTIONS = 8;

  const activeSection = Math.min(
    TOTAL_SECTIONS - 1,
    Math.max(0, Math.floor(scrollY / SECTION_HEIGHT))
  );

  const isSectionActive = (index: number) => {
    return Math.abs(index - activeSection) <= 1;
  };

  // =========================
  // COMMENTS
  // =========================

  const [comments, setComments] = useState<Comment[]>([]);

  const idUndangan =
    `${data.template} ${data.NamabridePanggilan}-${data.NamagroomPanggilan}`;

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
  // NAVIGATION
  // =========================

  const scrollTo = (position: number) => {
    scrollRef.current?.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={scrollRef}
      className="relative mx-auto h-screen w-[385px] max-w-full overflow-x-hidden overflow-y-auto scrollSnap"
      style={{
        background: `url(${data.Background?.CoverBack})`,
        color: data.theme?.warna1,
      }}
    >
      <Hero
        data={data}
        guest={guest}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <ModalGallery
        isOpen={openGallery}
        images={data.gallery ?? []}
        initialIndex={selectedIndex}
        onClose={() => setOpenGallery(false)}
      />

      <BottomNav
        data={data}
        onNavigate={scrollTo}
        scrollY={scrollY}
      />

      <AudioController
        data={data}
        isOpen={isOpen}
      />

      {/* FALLING LEAVES */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <div className="relative mx-auto h-screen w-[385px] max-w-full overflow-hidden">
          <FallingLeaves />
        </div>
      </div>

      {/* =========================
          MAIN SCROLL AREA
      ========================= */}

      <div className="relative h-[4500px]">
        <div className="sticky top-0 h-screen overflow-hidden snap-y snap-mandatory">

          {/* 0 - OPENING */}
          {isSectionActive(0) && (
            <Opening
              data={data}
              scrollY={scrollY}
              isOpen={isOpen}
            />
          )}

          {/* 1 - SAMBUTAN */}
          {isSectionActive(1) && (
            <Sambutan
              data={data}
              scrollY={scrollY}
            />
          )}

          {/* 2 - AYAT */}
          {isSectionActive(2) && (
            <Ayat
              data={data}
              scrollY={scrollY}
            />
          )}

          {/* 3 - BRIDE */}
          {isSectionActive(3) && (
            <Bride
              data={data}
              scrollY={scrollY}
            />
          )}

          {/* 4 - GROOM */}
          {isSectionActive(4) && (
            <Groom
              data={data}
              scrollY={scrollY}
            />
          )}

          {/* 5 - SAVE THE DATE */}
          {isSectionActive(5) && (
            <SaveTheDate
              data={data}
              scrollY={scrollY}
            />
          )}

          {/* 6 - STORY */}
          {isSectionActive(6) && (
            <Story
              data={data}
              scrollY={scrollY}
            />
          )}

          {/* 7 - GALLERY */}
          {isSectionActive(7) && (
            <Gallery
              data={data}
              scrollY={scrollY}
              openGallery={handleOpenGallery}
            />
          )}

        </div>
      </div>

      {/* =========================
          NORMAL SCROLL SECTIONS
      ========================= */}

      <Gallery2
        data={data}
        openGallery={handleOpenGallery}
      />

      <Video data={data} />

      <Ucapan
        data={data}
        loadComments={loadComments}
        comments={comments}
        guest={guest}
      />

      <WeddingGift data={data} />

      <Closing data={data} />
    </div>
  );
};

export default ScrollLeaf;
