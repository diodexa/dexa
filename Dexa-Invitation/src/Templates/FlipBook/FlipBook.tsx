import { useEffect, useRef, useState } from "react";

import type { Invitation } from "../../types/invitationFlipBook";

import CoverFront from "./Sections/CoverFront";
import CoverBack from "./Sections/CoverBack";
import Paper from "./Components/Papper";
import "../FlipBook/FlipBook.css"
import Hero from "./Sections/Hero";
import { Loading } from "../../Components/UI/Loader";
import Halaman1 from "./Sections/Halaman1";
import Halaman2 from "./Sections/Halaman2";
import Halaman3 from "./Sections/Halaman3";
import Halaman4 from "./Sections/Halaman4";
import Halaman5 from "./Sections/Halaman5";



interface Props {
  data: Invitation;
  guest: string;
}

const FlipBook = ({ data,guest }: Props) => {
  const [loading, setLoading] = useState(true);
  const [scrollX, setScrollX] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageDistance = 700;

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
      back: <Halaman4  data={data}/>,
    },
  ];

  const totalPages = papers.length;

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

  const totalWidth = 2 *totalPages *  pageDistance ;
  
  return ( 
    <div className="min-h-screen flex justify-center bg-gray-600">
      <div className="relative w-[385px] max-w-full bg-white overflow-x-auto">
      <Loading isLoading={loading} />
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