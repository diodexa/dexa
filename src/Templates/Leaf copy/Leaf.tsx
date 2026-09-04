import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../../types/invitationType";

import Gallery from "./Sections/Gallery";
import Video from "./Sections/video";
import Ucapan from "./Sections/UcapanDoa";
import { fetchComments, type Comment } from "../1.Components/ChatService";
import Gallery2 from "./Sections/Gallery2";
import WeddingGift from "./Sections/WeddingGift";
import Closing from "./Sections/Closing";
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

const ScrollCream = ({ data, guest }: Props) => {
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
  // COMMENT
  // =========================

  const [comments, setComments] = useState<Comment[]>([]);

  const idUndangan = `${data.template} ${data.NamabridePanggilan}-${data.NamagroomPanggilan}`;

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

  // =========================
  // ACTIVE SECTION
  // =========================

  const SECTION_HEIGHT = 500;

  const activeSection = Math.min(
    Math.floor(scrollY / SECTION_HEIGHT),
    8
  );

  const shouldRender = (index: number) => {
    return (
      index >= activeSection - 1 &&
      index <= activeSection + 1
    );
  };

  return (
    <div ref={scrollRef}
      className="relative mx-auto h-screen w-[385px] max-w-full overflow-x-hidden overflow-y-auto"
      style={{
        background: data.Background?.CoverBack,
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

      <div className="relative h-[4500px]">
        <div className="sticky top-0 h-screen overflow-hidden snap-y snap-mandatory">

          {/* OPENING */}
          {shouldRender(0) && (
            <Opening
              data={data}
              scrollY={scrollY}
              isOpen={isOpen}
            />
          )}

          {/* SAMBUTAN */}
          {shouldRender(1) && (
            <Sambutan
              data={data}
              scrollY={scrollY}
            />
          )}

          {/* AYAT */}
          {shouldRender(2) && (
            <Ayat
              data={data}
              scrollY={scrollY}
            />
          )}

          {/* BRIDE */}
          {shouldRender(3) && (
            <Bride
              data={data}
              scrollY={scrollY}
            />
          )}

          {/* GROOM */}
          {shouldRender(4) && (
            <Groom
              data={data}
              scrollY={scrollY}
            />
          )}

          {/* SAVE THE DATE */}
          {shouldRender(5) && (
            <SaveTheDate
              data={data}
              scrollY={scrollY}
            />
          )}

          {/* STORY */}
          {shouldRender(6) && (
            <Story
              data={data}
              scrollY={scrollY}
            />
          )}

          {/* GALLERY */}
          {shouldRender(7) && (
            <Gallery
              data={data}
              scrollY={scrollY}
              openGallery={handleOpenGallery}
            />
          )}

        </div>
      </div>

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

export default ScrollCream;