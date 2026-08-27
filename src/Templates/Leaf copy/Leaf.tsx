import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../../types/invitationType";

// import Hero from "./Sections/Hero";

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

const ScrollCream = ({ data,guest }: Props) => {
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

  //comment 
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
    useEffect(() => {loadComments();}, [idUndangan]);
    
    //Galery
    const handleOpenGallery = (index: number) => {
      setSelectedIndex(index);
      setOpenGallery(true);
    };

    //NAV ITEM

    const scrollTo = (position: number) => {
      scrollRef.current?.scrollTo({
        top: position,
        behavior: "smooth",
      });
    };

// Scroll

  // useEffect(() => {
  //   const container = scrollRef.current;

  //   if (!container) return;
    

  //   let timeout: ReturnType<typeof setTimeout>;

  //   const snapPoints = [
  //     0,
  //     500,
  //     1000,
  //     1500,
  //     2000,
  //     2500,
  //     3000,
  //     3500,
  //     4000,
  //   ];

  //   const handleScrollEnd = () => {
  //     const currentScroll = container.scrollTop;
  //      if (currentScroll > 4000) {return }

  //     const nearest = snapPoints.reduce((prev, curr) => {
  //       return Math.abs(curr - currentScroll) <
  //         Math.abs(prev - currentScroll)
  //         ? curr
  //         : prev;
  //     });

  //     container.scrollTo({
  //       top: nearest,
  //       behavior: "smooth",
  //     });
  //   };

  //   const handleScroll = () => {
  //     clearTimeout(timeout);

  //     timeout = setTimeout(() => {
  //       handleScrollEnd();
  //     }, 150);
  //   };

  //   container.addEventListener("scroll", handleScroll);

  //   return () => {
  //     container.removeEventListener("scroll", handleScroll);
  //     clearTimeout(timeout);
  //   };
  // }, []);
    return (
      <div ref={scrollRef}
      className={`relative mx-auto h-screen w-[385px] max-w-full overflow-x-hidden overflow-y-auto  `}
      style={{background: `${data.Background?.CoverBack}` ,color: data.theme?.warna1,}}>
      <Hero data={data} guest={guest} isOpen={isOpen} setIsOpen={setIsOpen}/>
      
      <ModalGallery isOpen={openGallery} images={data.gallery ?? []}
              initialIndex={selectedIndex}
              onClose={() => setOpenGallery(false)} 
            />

      <BottomNav data={data} onNavigate={scrollTo} scrollY={scrollY}/>
      <AudioController data={data} isOpen ={isOpen}/>
      {/* <div className="fixed inset-0 pointer-events-none z-[9999]">
        <div className={`relative mx-auto h-screen w-[385px] max-w-full overflow-hidden `}>
          <FallingLeaves />
        </div>
      </div> */}

      <div className="relative h-[4500px]  ">
        
      

        <div className="sticky top-0 h-screen ">
          <Opening data={data} scrollY={scrollY} isOpen={isOpen}/>
          <Sambutan data={data} scrollY={scrollY} />
          <Ayat data={data} scrollY={scrollY} />
          <Bride data={data} scrollY={scrollY} />
          <Groom data={data} scrollY={scrollY} />
          <SaveTheDate data={data} scrollY={scrollY} />
          <Story data={data} scrollY={scrollY} />
          
          <Gallery data={data} scrollY={scrollY} openGallery={handleOpenGallery}/>
        
        </div>
      </div>

      <Gallery2 data={data} openGallery={handleOpenGallery}/>
      <Video data={data} />
      <Ucapan data={data} loadComments={loadComments} comments={comments} guest={guest} />
      <WeddingGift data={data} />
      <Closing data={data} />
    </div>
  );
};

export default ScrollCream;