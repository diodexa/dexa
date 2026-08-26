import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../../types/invitationType";
import { fetchComments, type Comment } from "../1.Components/ChatService";
import Header from "./Sections/Header";
import Hero from "./Sections/Hero";
import ChatArea from "./Sections/ChatArea";
import InputArea from "./Sections/InputArea";
import ModalLook from "../1.Components/ModalLook";
import ModalGallery from "../1.Components/ModalGalery";
import ModalGroupInfo from "../1.Components/ModalDetailGrup";



interface Props {
  data: Invitation;
  guest: string;
}


const GroupChat = ({ data , guest }: Props) => {

  const scrollRef = useRef<HTMLDivElement>(null);
  const [openGallery, setOpenGallery] = useState(false);
  const [chatImages, setChatImages] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsGroupInfoOpen, setIsGroupInfoOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

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
    const handleOpenChatGallery = (images: string[], index: number) => {
      setChatImages(images);
      setSelectedIndex(index);
      setOpenGallery(true);
    };;

    //Look
    const handleOpenImage = (image: string) => {
      setSelectedImage(image);
      setIsModalOpen(true);
    };

    const handleOpenVideo = (video: string) => {
      setSelectedVideo(video);
      setIsVideoModalOpen(true);
    };
  

  return (
    <div ref={scrollRef}
    className={` mx-auto h-screen w-[385px] max-w-full overflow-x-hidden overflow-y-auto `}
    style={{color: data.theme?.warna1,}}>
      <Hero  data={data} guest={guest} isOpen={isOpen} setIsOpen={setIsOpen}/>
      <ModalLook isOpen={isModalOpen}
        images={selectedImage}
        onClose={() => setIsModalOpen(false)}/>
      <ModalLook isOpen={isVideoModalOpen}
        images={selectedVideo}
        type="video"
        onClose={() => setIsVideoModalOpen(false)}/>
      <ModalGallery isOpen={openGallery} images={chatImages}
          initialIndex={selectedIndex}
          onClose={() => setOpenGallery(false)}  />
      <ModalGroupInfo data={data}
        isOpen={IsGroupInfoOpen}
        onClose={() => setIsGroupInfoOpen(false)}
        onOpenGallery={handleOpenChatGallery}
      />
    <div className="flex flex-col h-full relative">
      <div className="flex-none shrink-0">
        <Header data={data} isOpen={isOpen} onOpenGroupInfo={() => setIsGroupInfoOpen(true)}/>
      </div>
      <div className="flex-1 overflow-y-auto shrink-0 ">
        <ChatArea data={data} comments={comments} isOpen={isOpen} onOpenImage={handleOpenImage} openGallery={handleOpenChatGallery} onOpenVideo={handleOpenVideo} guest={guest}/>
      </div>
      <div className="flex-none  shrink-0">
        <InputArea data={data} loadComments={loadComments} guest={guest}/>
      </div>
    </div>
  </div>
  );
};

export default GroupChat;