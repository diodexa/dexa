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


interface Props {
  data: Invitation;
  guest: string;
}

const Monochrome = ({ data, guest }: Props) => {
  const [isOpen,setIsOpen] = useState (false)

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
    <main className="w-full min-h-screen  bg-black text-white"
      style={{
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <Cover data={data} guest={guest} isOpen={isOpen} setIsOpen={setIsOpen} />
      <AudioController data={data} isOpen={isOpen}/>
    
      <Opening data={data} isOpen={isOpen} />

      <Ayat data={data} />

      <Sambutan data={data} />

      <Couple data={data} />

      <Event data={data} />

      <Story data={data} />

      <Gallery data={data} />

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