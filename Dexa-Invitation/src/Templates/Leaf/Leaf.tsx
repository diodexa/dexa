import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../../types/invitationType";

// import Hero from "./Sections/Hero";
import Foto1 from "./Sections/Foto1";
import Foto2 from "./Sections/Foto2";
import Foto3 from "./Sections/Foto3";
import Foto4 from "./Sections/Foto4";
import Foto5 from "./Sections/Foto5";
import Foto6 from "./Sections/Foto6";
import Gallery from "./Sections/Gallery";
import Video from "./Sections/video";
import Ucapan from "./Sections/UcapanDoa";
import { fetchComments, type Comment } from "../Components/ChatService";
import Gallery2 from "./Sections/Gallery2";
import WeddingGift from "./Sections/WeddingGift";
import Closing from "./Sections/Closing";
import FallingLeaves from "../Components/FallingLeaves";

interface Props {
  data: Invitation;
  guest: string;
}

const Leaf = ({ data }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

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

  

  return (
    <div
      ref={scrollRef}
      className="relative mx-auto h-screen w-[385px] max-w-full overflow-x-hidden overflow-y-auto "
       style={{background: `url(${data.Background?.CoverBack})` ,color: data.theme?.warna1,}}>
        <FallingLeaves />

      <div className="relative h-[4500px]">
      

        <div className="sticky top-0 h-screen overflow-hidden snap-y snap-mandatory">
          <Foto1 data={data} scrollY={scrollY} />
          <Foto2 data={data} scrollY={scrollY} />
          <Foto3 data={data} scrollY={scrollY} />
          <Foto4 data={data} scrollY={scrollY} />
          <Foto5 data={data} scrollY={scrollY} />
          <Foto6 data={data} scrollY={scrollY} />
          
          <Gallery data={data} scrollY={scrollY}/>
        
        </div>
      </div>

      <Gallery2 data={data}/>
      <Video data={data} />
      <Ucapan data={data} loadComments={loadComments} comments={comments} />
      <WeddingGift data={data} />
      <Closing data={data} />
      
    </div>
  );
};

export default Leaf;