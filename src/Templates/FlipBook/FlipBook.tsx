import { useEffect, useRef, useState } from "react";

import type { Invitation } from "../../types/invitationType";

import CoverFront from "./Sections/CoverFront";
import CoverBack from "./Sections/CoverBack";
import Paper from "../1.Components/Papper";
import "../FlipBook/FlipBook.css"
import Hero from "./Sections/Hero";
import { Loading } from "../../Components/UI/Loader";
import Halaman1 from "./Sections/Halaman1 Sambutan";
import Halaman2 from "./Sections/Halaman2 FotoBride";
import Halaman3 from "./Sections/Halaman3 ProfilBride";
import Halaman4 from "./Sections/Halaman4 ProfilGroom";
import Halaman5 from "./Sections/Halaman5 FotoGroom";
import Halaman6 from "./Sections/Halaman6 SaveTheDate";
import Halaman7 from "./Sections/Halaman7 SaveTheDate2";
import Halaman8 from "./Sections/Halaman8 Story";
import Halaman9 from "./Sections/Halaman9 Story2";
import Halaman10 from "./Sections/Halaman10 Galery";
import ModalGallery from "../1.Components/ModalGalery";
import Halaman11 from "./Sections/Halaman11 Galery2";
import Halaman12 from "./Sections/Halaman12 Ucapan";
import Halaman13 from "./Sections/Halaman13 UcapanDoa";
import { fetchComments, type Comment } from "../1.Components/ChatService";
import Halaman14 from "./Sections/Halaman14 WeddingGift";
import Halaman15 from "./Sections/Halaman15 Closing";
import Halaman16 from "./Sections/Halaman16 Footer";
import AudioController from "../1.Components/Audio";



interface Props {
  data: Invitation;
  guest: string;
  
}

const FlipBook = ({ data,guest  }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrollX, setScrollX] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const pageDistance = 700;

  const [comments, setComments] = useState<Comment[]>([]);
  
  const handleOpenGallery = (index: number) => {
    setSelectedIndex(index);
    setOpenGallery(true);
  };
// =========================
// post fetch ucapan
  // =========================
  
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

  
  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const handleScroll = () => {
      setScrollX(container.scrollLeft);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const container = scrollRef.current;

      if (!container) return;

      container.scrollLeft = 0;

      setLoading(false);
    });
  });
}, []);

// =========================
// ROTATE TIAP PAPER
  // =========================
  const getRotate = (index: number) => {
    // tiap paper mulai setelah scroll tertentu
    const start = index * pageDistance;
    

    return Math.min(
      Math.max((scrollX - start) / 4, 0),
      180
    );
  };

    const halaman23Active =(getRotate(1) >= 70) && (getRotate(2)< 123) ;
    const halaman34Active =(getRotate(2) >= 148) && (getRotate(3)< 93) ;
    const halaman67Active =(getRotate(3) >= 148) && (getRotate(4)< 93) ;
    const halaman1011Active =(getRotate(5) >= 148) && (getRotate(6)< 93) ;
    const halaman1213Active =(getRotate(6) >= 93) && (getRotate(7)< 93) ;
    const halaman1415Active =(getRotate(7) >= 93) && (getRotate(8)< 93) ;

    
    //scrollevent di book
  
    

    
    // =========================
  // LIST SEMUA PAPER
  // =========================
  const papers = [
    {
      front: <CoverFront data={data}/>,
      back: <CoverBack data={data} />,
    },
    // 1
    {
      front: <Halaman1 data={data}/>,
      back: <Halaman2 data={data}/>,
    },
    // 2
    {
      front: <Halaman3 data={data} isActive={halaman23Active} />,
      back: <Halaman4  data={data} isActive={halaman34Active}/>,
    },
    // 3
    {
      front: <Halaman5 data={data} />,
      back: <Halaman6  data={data} isActive={halaman67Active}/>,
    },
    // 4
    {
      front: <Halaman7 data={data} isActive={halaman67Active} />,
      back: <Halaman8  data={data}/>,
    },
    // 5
    {
      front: <Halaman9 data={data} />,
      back: <Halaman10  data={data} openGallery={handleOpenGallery} isActive={halaman1011Active}/>,
    },
    // 6
    {
      front: <Halaman11 data={data} openGallery={handleOpenGallery} isActive={halaman1011Active} />,
      back: <Halaman12  data={data} isActive={halaman1213Active} loadComments={loadComments} guest={guest}/>,
    },
    // 7
    {
      front: <Halaman13 data={data} isActive={halaman1213Active} comments={comments}  />,
      back: <Halaman14  data={data} isActive={halaman1415Active} />,
    },
    // 8
    {
      front: <Halaman15 data={data}/>,
      back: <Halaman16  data={data}  />,
    },
  ];


  const totalPages = papers.length;
  const totalWidth = 2 *totalPages *  pageDistance ;
  
 
  
  return ( 
    <div className="min-h-screen flex justify-center bg-gray-600">
      <div className="relative w-[385px] max-w-full  overflow-x-auto"
      style={{background:data.theme?.contrasfont}}>
        <div className="absolute top-15 left-1/2 -translate-x-1/2 w-full pointer-events-none" style={{color:data.theme?.warna3}}>
          <h2 className="font-SephoraHayden text-5xl">{data.NamabridePanggilan} & {data.NamagroomPanggilan} </h2>
          <h2>Wedding</h2>
        </div>
        <div className="absolute bottom-15 left-1/2 -translate-x-1/2 w-full flex flex-col items-center pointer-events-none"
        style={{ color: data.theme?.warna3 }}>
          <p className="text-sm">swipe left</p>

          <i className="fa-solid fa-arrow-right text-2xl animate-[slideRight_1.2s_ease-in-out_infinite]" />
        </div>
        <Loading isLoading={loading} />
        <ModalGallery isOpen={openGallery} images={data.gallery ?? []}
          initialIndex={selectedIndex}
          onClose={() => setOpenGallery(false)} 
        />
        <Hero data={data} guest={guest} setIsOpen={setIsOpen} isOpen={isOpen} />
        <AudioController data={data} isOpen ={isOpen}/>
        <div>

          {/* tinggi scroll otomatis */}
          <div
          ref={scrollRef}
            className="flipbook-scroll overflow-x-scroll overflow-y-hidden"
            style={{height: "100vh"}}>
            <div style={{width: `${totalWidth}px`,height: "1px",}}/>

            <div className={`buku transition-all duration-2000 ease-out ${isOpen? "scale-100 opacity-100": "scale-90 opacity-0"}`}>
              

              {papers.map((paper, index) => (
                <Paper
                key={index}
                index={index}
                  totalPages={totalPages}
                  rotate={getRotate(index)}
                  >
                  {paper.front}
                  {paper.back}
                </Paper>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipBook;