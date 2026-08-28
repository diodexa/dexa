import { useEffect, useState } from "react";
import type { Invitation } from "../../types/invitationType";
import { fetchComments, type Comment } from "../1.Components/ChatService";
import Closing from "./Sections/Closing";
import Couple from "./Sections/Couple";
import Cover from "./Sections/Cover";
import Event from "./Sections/Event";
import Gallery from "./Sections/Gallery";
import Story from "./Sections/Story";
import Ayat from "./Sections/Ayat";
import Sambutan from "./Sections/Sambutan";
import UcapanDoa from "./Sections/UcapanDoa";
import Opening from "./Sections/Opening";
import AudioController from "../1.Components/Audio";
import "./Monochrome.css";
import WeddingGift from "./Sections/WeddingGift";
import ModalGallery from "../1.Components/ModalGalery";



interface Props {
  data: Invitation;
  guest: string;
}

const Monochrome = ({ data, guest }: Props) => {
  const [isOpen,setIsOpen] = useState (false)
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  //comment 
  const [comments, setComments] = useState<Comment[]>([]);
  const idUndangan = `${data.template} ${data.NamabridePanggilan}-${data.NamagroomPanggilan}`;

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


  const loadComments = async () => {
      try {
        const result = await fetchComments(idUndangan);
        setComments(result);
      } catch (err) {
        console.error(err);
      }
    };
    useEffect(() => {loadComments();}, [idUndangan]);

    //Gallery 
    const handleOpenGallery = (index: number) => {
      setSelectedIndex(index);
      setOpenGallery(true);
    };

      
  return (
    <main className="w-full   bg-black text-white "
      style={{
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <Cover data={data} guest={guest} isOpen={isOpen} setIsOpen={setIsOpen} />
      <AudioController data={data} isOpen={isOpen}/>
      <ModalGallery isOpen={openGallery} images={data.gallery ?? []}
        initialIndex={selectedIndex}
        onClose={() => setOpenGallery(false)} 
      />


      <Opening data={data} isOpen={isOpen} />

      <Ayat data={data} />

      <Sambutan data={data} />

      <Couple data={data} />

      <Event data={data} />

      <Story data={data} />

      <Gallery data={data} openGallery={handleOpenGallery}/>

       <UcapanDoa
        data={data}
        guest={guest}
        comments={comments}
        loadComments={loadComments}
      />

      <WeddingGift data={data}/>

      <Closing data={data} />
  
    </main>
  );
};

export default Monochrome;