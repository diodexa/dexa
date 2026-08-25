import {  useState } from "react";
import type { Invitation } from "../../../types/invitationType";
import {  type Comment } from "../../1.Components/ChatService";
import "../GroupChat.css"


interface Props {
  data: Invitation;
  guest: string;
  isOpen: boolean;
  comments : Comment[];
  onOpenImage: (image: string) => void;
  onOpenVideo: (video: string) => void;
  openGallery: (images: string[], index: number) => void;
}

const ChatArea = ({data, comments,guest,isOpen,onOpenImage,onOpenVideo,openGallery}:Props) =>  {
  const COMMENTS_PER_LOAD = 5;

  const [visibleComments, setVisibleComments] = useState(
    COMMENTS_PER_LOAD
  );

  const sortedComments = [...comments].reverse();

  const currentComments = sortedComments.slice(-visibleComments);
  
  const isSticker = (text: string) => {return data.sticker?.includes(text) ?? false;};

  // =====================
  // tanggal 
  // ============
  const formatDate = (date: string) => {
  const chatDate = new Date(date);
  const now = new Date();

  const isToday =
    chatDate.getDate() === now.getDate() &&
    chatDate.getMonth() === now.getMonth() &&
    chatDate.getFullYear() === now.getFullYear();

  if (isToday) {
    return chatDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return chatDate.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

  const formatUcapan = (text: string) => {
    return text
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  };

  const formatChat = (text: string) => {
  const parts = text.split(/(\[xl\][\s\S]*?\[\/xl\]|\[guest\]|\[map\])/g);

  return parts.map((part, index) => {
    if (part.startsWith("[xl]")) {
      return (
        <span key={index} className="inline-block  font-bold text-xl text-center">
          {part.replace("[xl]", "").replace("[/xl]", "")}
        </span>
      );
    }
    if (part === ("[guest]")) {
      return (
        <span key={index} className="inline-block  font-bold text-xl text-center">
         {guest}
        </span>
      );
    }

    if (part === "[map]") {
      return (
        <div
          key={index}
          className="w-full h-40 mt-2 rounded-lg overflow-hidden"
        >
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              data.LokasiAkad ?? ""
            )}&output=embed`}
            className="w-full h-full border-0 pointer-events-none"
            loading="lazy"
          />
        </div>
      );
    }

    return <span key={index}>{part}</span>;
  });
};

  return (
    <section className=" w-full" >
      {data.theme?.backgroundImage ? (
        <div className="mt-5" style={{background:`src${data.theme?.backgroundImage}`}}>
          <img src={data.theme?.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover -z-1 pointer-events-none " />
          <div className="absolute inset-0 bg-black/20 -z-1 "/>
        </div>
      ): 
        
        <div className="w-full h-full overflow-hidden flex flex-col gap-1 mt-5" style={{background:data.theme?.warna2}} />
        }

        {data.Chat?.Interaksi?.map((Chat, index)=>(
          
          <div className="flex gap-2 animate-[chatIn_0.1s_ease-out]" key={`${isOpen}-${index}`} style={{animationDelay: `${index * 0.8}s`,animationFillMode: "both",}}>

            <img src={Chat.FotoProfil} className="h-13 w-13 object-cover rounded-full border-3 mt-2 "  style={{border: `1px solid ${data.theme?.contrasfont}`}}
            onClick={() => {if (Chat.FotoProfil) {onOpenImage(Chat.FotoProfil)}}}/>
            
            <div className={`border text-left lg:text-[0.6rem] px-2 py-1 mt-2 max-w-[50%] rounded-lg `}
            style={isSticker(Chat.isiChat ?? "")? undefined: {background: data.theme?.contrasfont,}}>

              
              <div className="flex items-center px-px ">
                <strong  className="flex-1 truncate ">{Chat.Nama}</strong>
              </div>
              {Chat.gallery && Chat.gallery.length > 0 && (
                <div className="grid grid-cols-2 gap-1 max-w-[240px]">
                  {Chat.gallery.slice(0, 4).map((image, imageIndex) => {
                    const remaining = Chat.gallery!.length - 4;

                    return (
                      <div key={imageIndex}
                        className="relative overflow-hidden rounded cursor-pointer"
                        onClick={() => openGallery(Chat.gallery!, imageIndex)}>
                        <img src={image} alt="" className="w-full h-full object-cover"/>

                        {imageIndex === 3 && remaining > 0 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-xl font-bold">+{remaining}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            {Chat.video && (
               <div className="relative mt-1 max-w-[240px] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => onOpenVideo(Chat.video!)}>
                  {/* Preview Video */}
                  <video
                    src={Chat.video}
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full rounded-lg pointer-events-none"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-full h-full  bg-black/60 flex items-center justify-center">
                      <i className="fa-solid fa-play text-white text-xl ml-1" />
                    </div>
                  </div>
                </div>
            )}
            
            <p className="my-1 whitespace-pre-line break line-clamp-4">
            {formatChat(Chat.isiChat ?? "")}
            </p>
            <p className="text-right text-xs lg:text-[0.4rem] ">{Chat.Waktu}</p>
          </div>
        </div>
        ))}
        
  

        {comments.length === 0 ? (
          <p>Belum ada ucapan.</p>
        ) : (
          <>
          {visibleComments < comments.length && (
            <button className="mt-5" style={{color:data.theme?.warnaButtonBorder,}}
              onClick={() =>setVisibleComments((prev) => prev + COMMENTS_PER_LOAD)}>
              ---------- <span className="rounded px-2 " style={{background:data.theme?.warnaButtonBackground}}> Load More</span>----------
            </button>
          )}
          {currentComments.map((comment, index) => (
            <div className="flex" key={index}>
              <img src="/logo-dio.webp"
                className="max-h-15 w-auto object-contain"/>

              <div className=" text-left lg:text-[0.6rem] px-2 py-1 mt-2 max-w-[40%] rounded-lg"
               style={{ background: isSticker(comment.ucapan ?? "")? "transparent": data.theme?.contrasfont,
                border: `1px solid ${isSticker(comment.ucapan ?? "")? "transparent": data.theme?.warna3}`
               }}>
                <div className="flex items-center px-px ">
                  <strong style={{ color: data.theme?.warna3,background:isSticker(comment.ucapan ?? "")? "white": data.theme?.contrasfont, padding:isSticker(comment.ucapan ?? "")? "0 0 0 6px": "",   }}
                    className="flex-1 truncate rounded">{comment.nama}</strong>
                </div>
                {isSticker(comment.ucapan) ? (
                  <img src={comment.ucapan} alt="sticker"
                    className="w-28 h-28 object-contain"/>
                  ) : (
                  <p className="my-1 whitespace-pre-line line-clamp-4">
                    {formatUcapan(comment.ucapan)}
                  </p>
                )}
                <p className="text-right text-xs lg:text-[0.4rem]">{formatDate(comment.date)}</p>
              </div>
            </div>
          ))}

          </>
        )}
          
    </section>
  )
};

export default ChatArea;