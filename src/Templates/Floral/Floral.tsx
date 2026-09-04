import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../../types/invitationType";
import { fetchComments, type Comment } from "../1.Components/ChatService";


import Sambutan from "./Sections/1.Sambutan";
import Ayat from "./Sections/2.Ayat";
import FloralCouple from "./Sections/3.Couple";
import SaveTheDate from "./Sections/4.SaveTheDate";
import Story from "./Sections/5.Story";

import ModalGallery from "../1.Components/ModalGalery";
import BottomNav from "../1.Components/BottomNav";
import AudioController from "../1.Components/Audio";
import Gallery from "./Sections/6.Gallery";
import Ucapan from "./Sections/7.UcapanDoa";
import WeddingGift from "./Sections/8.WeddingGift";
import Closing from "./Sections/9.Closing";
import Hero from "./Sections/Hero";

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

  const [animations, setAnimations] = useState({
  ayat: false,
  couple: false,
  saveDate: false,
  story: false,
  gallery: false,
});

  const idUndangan =`${data.template} ${data.NamabridePanggilan}-${data.NamagroomPanggilan}`;

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
  // Hero
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
  // NAVIGATION
  // =========================
  
  const scrollTo = (position: number) => {
    scrollRef.current?.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };
  
  // =========================
  // Animasi
  // =========================

  useEffect(() => {
    setAnimations(prev => ({
      ...prev,
      ayat: scrollY >= 64,
      couple: scrollY >= 332,
      saveDate: scrollY >= 1231,
    }));
  }, [scrollY]);
  


console.log(scrollY)

  return (
    <div ref={scrollRef}
      className="relative mx-auto h-screen max-w-[385px] overflow-x-clip overflow-y-auto"
      style={{
        background: data.theme?.warna1,
        color: data.theme?.warna2,
      }} >

      {/* =========================
          NAVIGATION
      ========================= */}
      
      <BottomNav data={data} onNavigate={scrollTo} scrollY={scrollY} />

      <AudioController data={data} isOpen={isOpen}/>

      <Hero data={data} guest={guest} isOpen={isOpen}setIsOpen={setIsOpen}/>

      <Sambutan data={data} scrollY={scrollY} isOpen={isOpen}/>


      <Ayat data={data} scrollY={scrollY} animate={animations.ayat}/>

      <FloralCouple data={data} scrollY={scrollY} animate={animations.couple}/>

      <SaveTheDate data={data} scrollY={scrollY} animate={animations.saveDate}/>


      <Story data={data}scrollY={scrollY}/>


      <Gallery data={data} openGallery={handleOpenGallery} scrollY={scrollY}/>

      <Ucapan data={data} loadComments={loadComments} comments={comments} guest={guest} scrollY={scrollY}/>

      <WeddingGift data={data} scrollY={scrollY}/>

      {/* =========================
          CLOSING
      ========================= */}

      <Closing data={data} scrollY={scrollY}/>

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