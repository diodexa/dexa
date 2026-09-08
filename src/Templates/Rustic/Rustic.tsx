import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../../types/invitationType";
import { fetchComments, type Comment } from "../1.Components/ChatService";



import ModalGallery from "../1.Components/ModalGalery";
// import BottomNav from "../1.Components/BottomNav";
import AudioController from "../1.Components/Audio";
import Opening from "./Sections/1.Opening";

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
      couple: scrollY >= 675,
      saveDate: scrollY >= 1231,
      story: scrollY >= 2036,
      gallery: scrollY>=2728,
      
    }));
  }, [scrollY]);
  


console.log(scrollY)

  return (
    <div ref={scrollRef}
      className="relative mx-auto h-screen max-w-[385px] overflow-x-clip overflow-y-auto font-Sunflower"
      style={{ background: data.theme?.warna1,color: data.theme?.warna2,}} >

        <AudioController data={data} isOpen={isOpen}/>
        <ModalGallery  isOpen={openGallery} images={data.gallery ?? []} initialIndex={selectedIndex} onClose={() => setOpenGallery(false)}/>

        <Opening data={data} isOpen={isOpen} /> 

    </div>
  );
};

export default Rustic;