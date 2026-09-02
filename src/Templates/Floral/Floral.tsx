import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../../types/invitationType";
import { fetchComments, type Comment } from "../1.Components/ChatService";

import Opening from "./Sections/0.Opening";
import Sambutan from "./Sections/1.Sambutan";
import Ayat from "./Sections/2.Ayat";
import FloralCouple from "./Sections/3.Couple";
import SaveTheDate from "./Sections/5.SaveTheDate";
import Story from "./Sections/6.Story";

import Video from "../Leaf copy/Sections/video";
import Ucapan from "../Leaf copy/Sections/UcapanDoa";
import WeddingGift from "../Leaf copy/Sections/WeddingGift";
import Closing from "../Leaf copy/Sections/Closing";

import ModalGallery from "../1.Components/ModalGalery";
import BottomNav from "../1.Components/BottomNav";
import AudioController from "../1.Components/Audio";
import Gallery from "./Sections/7.Gallery";

interface Props {
  data: Invitation;
  guest: string;
}

const Floral = ({ data, guest }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const [comments, setComments] = useState<Comment[]>([]);

  const idUndangan =
    `${data.template} ${data.NamabridePanggilan}-${data.NamagroomPanggilan}`;

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
      className="relative mx-auto h-screen max-w-[385px] overflow-x-clip"
      style={{
        background: data.theme?.warna1,
        color: data.theme?.warna2,
      }}
    >

      {/* =========================
          NAVIGATION
      ========================= */}

      <BottomNav
        data={data}
        onNavigate={scrollTo}
        scrollY={scrollY}
      />

      <AudioController
        data={data}
        isOpen={isOpen}
      />

      {/* =========================
          OPENING
      ========================= */}
        <Opening data={data} guest={guest} isOpen={isOpen}setIsOpen={setIsOpen}/>


      {/* =========================
          SAMBUTAN
      ========================= */}

      <div className="relative h-screen">
        <Sambutan
          data={data}
          scrollY={scrollY}
        />
      </div>

      {/* =========================
          AYAT
      ========================= */}

      <div className="relative">
        <Ayat
          data={data}
          scrollY={scrollY}
        />
      </div>

      {/* =========================
          BRIDE + GROOM
      ========================= */}

    
        <FloralCouple
          data={data}
        />
      

      {/* =========================
          SAVE THE DATE
      ========================= */}

        <SaveTheDate data={data} />


      {/* =========================
          STORY
      ========================= */}


        <Story data={data}scrollY={scrollY}/>


      {/* =========================
          GALLERY
      ========================= */}

      <Gallery data={data} openGallery={handleOpenGallery}/>

      {/* =========================
          VIDEO
      ========================= */}

      <Video
        data={data}
      />

      {/* =========================
          UCAPAN
      ========================= */}

      <Ucapan
        data={data}
        loadComments={loadComments}
        comments={comments}
        guest={guest}
      />

      {/* =========================
          WEDDING GIFT
      ========================= */}

      <WeddingGift
        data={data}
      />

      {/* =========================
          CLOSING
      ========================= */}

      <Closing
        data={data}
      />

      {/* =========================
          MODAL GALLERY
      ========================= */}

      <ModalGallery
        isOpen={openGallery}
        images={data.gallery ?? []}
        initialIndex={selectedIndex}
        onClose={() => setOpenGallery(false)}
      />

    </div>
  );
};

export default Floral;