import { useEffect, useRef, useState } from "react";

import type { Invitation } from "../../types/invitationFlipBook";

import CoverFront from "./Sections/CoverFront";
import CoverBack from "./Sections/CoverBack";
import Paper from "./Components/Papper";
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
import ModalGallery from "./Components/ModalGalery";
import Halaman11 from "./Sections/Halaman11 Galery2";
import Halaman12 from "./Sections/Halaman12 Ucapan";



interface Props {
  data: Invitation;
  guest: string;
  isActive: boolean;
}

const FlipBook = ({ data,guest }: Props) => {
  const [loading, setLoading] = useState(true);
  const [scrollX, setScrollX] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const pageDistance = 700;
  
  const handleOpenGallery = (index: number) => {
    setSelectedIndex(index);
    setOpenGallery(true);
  };
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

  const halaman67Active =(getRotate(3) >= 148) && (getRotate(4)< 123) ;
  const halaman1011Active =(getRotate(5) >= 148) && (getRotate(6)< 123) ;
    
    //scrollevent di book
    

    
    // =========================
  // LIST SEMUA PAPER
  // =========================
  const papers = [
    {
      front: <CoverFront data={data}/>,
      back: <CoverBack data={data} />,
    },

    {
      front: <Halaman1 data={data}/>,
      back: <Halaman2 data={data}/>,
    },
    {
      front: <Halaman3 data={data} />,
      back: <Halaman4  data={data}/>,
    },
    {
      front: <Halaman5 data={data} />,
      back: <Halaman6  data={data} isActive={halaman67Active}/>,
    },
    {
      front: <Halaman7 data={data} isActive={halaman67Active} />,
      back: <Halaman8  data={data}/>,
    },
    {
      front: <Halaman9 data={data} />,
      back: <Halaman10  data={data} openGallery={handleOpenGallery} isActive={halaman1011Active}/>,
    },
    {
      front: <Halaman11 data={data} openGallery={handleOpenGallery} isActive={halaman1011Active} />,
      back: <Halaman12  data={data} isActive={halaman67Active}/>,
    },
  ];


  const totalPages = papers.length;
  const totalWidth = 2 *totalPages *  pageDistance ;
  
 
  
  return ( 
    <div className="min-h-screen flex justify-center bg-gray-600">
      <div className="relative w-[385px] max-w-full bg-white overflow-x-auto">
      <Loading isLoading={loading} />
      <ModalGallery isOpen={openGallery} images={data.gallery}
        initialIndex={selectedIndex}
        onClose={() => setOpenGallery(false)}
      />
        {/* <Hero data={data} guest={guest}/> */}
        <div className="flipbook-wrapper">

          {/* tinggi scroll otomatis */}
          <div
          ref={scrollRef}
            className="flipbook-scroll overflow-x-scroll overflow-y-hidden"
            style={{
              height: "100vh",
            }}
          >
            <div
              style={{
                width: `${totalWidth}px`,
                height: "1px",
              }}
            />

            <div className="buku">
              

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