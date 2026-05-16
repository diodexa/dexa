import { useEffect, useState } from "react";

import type { Invitation } from "../../types/invitation";

import CoverFront from "./Components/CoverFront";
import CoverBack from "./Components/CoverBack";
import Paper from "./Components/Papper";
import Halaman1 from "./Sections/Halaman1";
import Halaman2 from "./Sections/Halaman2";
import "../FlipBook/FlipBook.css"



interface Props {
  data: Invitation;
  guest: string;
}

const FlipBook = ({ data, guest }: Props) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================
  // LIST SEMUA PAPER
  // =========================
  const papers = [
    {
      front: (
        <CoverFront
          data={data}
          guest={guest}
        />
      ),
      back: <CoverBack />,
    },

    {
      front: <Halaman1 />,
      back: <Halaman2 />,
    },
    {
      front: <Halaman1 />,
      back: <Halaman2 />,
    },
  ];

  const totalPages = papers.length;

  // =========================
  // ROTATE TIAP PAPER
  // =========================
  const getRotate = (index: number) => {
    // tiap paper mulai setelah scroll tertentu
    const start = index * 800;

    return Math.min(
      Math.max((scrollY - start) / 4, 0),
      180
    );
  };

  return (
    <div className="flipbook-wrapper">

      {/* tinggi scroll otomatis */}
      <div
        className="flipbook-scroll"
        style={{
          height: `${totalPages * 200}vh`,
        }}
      >

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
  );
};

export default FlipBook;