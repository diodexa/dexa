import { useState } from "react";
import type { Invitation } from "../../../types/invitationType";
import type { Comment } from "../../1.Components/ChatService";
import "../GroupChat.css";

interface Props {
  data: Invitation;
  guest: string;
  isOpen: boolean;
  comments: Comment[];
  onOpenImage: (image: string) => void;
  onOpenVideo: (video: string) => void;
  openGallery: (images: string[], index: number) => void;
}

const ChatArea = ({ data, comments, guest, isOpen, onOpenImage, onOpenVideo, openGallery }: Props) => {
  const COMMENTS_PER_LOAD = 5;
  const [visibleComments, setVisibleComments] = useState(COMMENTS_PER_LOAD);
  const sortedComments = [...comments].reverse();
  const currentComments = sortedComments.slice(-visibleComments);

  const isSticker = (text: string) => data.sticker?.includes(text) ?? false;

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
    return text.replace(/\n{3,}/g, "\n\n").trim();
  };

  const formatChat = (text: string) => {
    const parts = text.split(/(\[xl\][\s\S]*?\[\/xl\]|\[guest\]|\[map\])/g);

    return parts.map((part, index) => {
      if (part.startsWith("[xl]")) {
        return (
          <span key={index} className="block font-bold text-xl text-center my-1">
            {part.replace("[xl]", "").replace("[/xl]", "")}
          </span>
        );
      }

      if (part === "[guest]") {
        return (
          <span key={index} className="font-bold text-lg">
            {guest}
          </span>
        );
      }

      if (part === "[map]") {
        return (
          <div key={index} className="w-full h-40 mt-2 rounded-xl overflow-hidden">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(data.LokasiAkad ?? "")}&output=embed`}
              className="w-full h-full border-0 pointer-events-none"
              loading="lazy"
            />
          </div>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  const renderSystemChat = (Chat: any, index: number) => {
    const sticker = isSticker(Chat.isiChat ?? "");

    return (
      <div key={`${isOpen}-${index}`}
        className="flex items-start gap-2 w-full animate-[chatIn_0.2s_ease-out]"
        style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "both" }}
      >
        <img src={Chat.FotoProfil}
          alt=""
          className="w-10 h-10 shrink-0 object-cover rounded-full border-2 mt-1 cursor-pointer"
          style={{ borderColor: data.theme?.contrasfont }}
          onClick={() => {
            if (Chat.FotoProfil) onOpenImage(Chat.FotoProfil);
          }}
        />

        <div
          className="max-w-[72%] min-w-0 rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm text-left"
          style={sticker ? { background: "transparent" } : { background: data.theme?.contrasfont }}
        >
          <strong
            className="block text-sm font-semibold truncate mb-0.5 text-left"
            style={{ color: data.theme?.warna3 }}
          >
            {Chat.Nama}
          </strong>

          {Chat.gallery && Chat.gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-1 max-w-[240px] overflow-hidden rounded-xl mb-1">
              {Chat.gallery.slice(0, 4).map((image: string, imageIndex: number) => {
                const remaining = Chat.gallery!.length - 4;

                return (
                  <div
                    key={imageIndex}
                    className="relative aspect-square overflow-hidden cursor-pointer"
                    onClick={() => openGallery(Chat.gallery!, imageIndex)}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />

                    {imageIndex === 3 && remaining > 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">+{remaining}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {Chat.video && (
            <div
              className="relative mt-1 max-w-[240px] rounded-xl overflow-hidden cursor-pointer"
              onClick={() => onOpenVideo(Chat.video!)}
            >
              <video
                src={Chat.video}
                muted
                playsInline
                preload="metadata"
                className="w-full block pointer-events-none"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-11 h-11 rounded-full bg-black/60 flex items-center justify-center">
                  <i className="fa-solid fa-play text-white ml-0.5" />
                </div>
              </div>
            </div>
          )}

          <p className="my-1 whitespace-pre-line break-words text-sm leading-relaxed text-left">
            {formatChat(Chat.isiChat ?? "")}
          </p>

          <p className="text-right text-[10px] opacity-60 mt-1">
            {Chat.Waktu}
          </p>
        </div>
      </div>
    );
  };

  const renderUserComment = (comment: Comment, index: number) => {
    const sticker = isSticker(comment.ucapan ?? "");

    return (
      <div className="flex items-start gap-1.5 w-full" key={index}>
        <img src="/logo-dio.webp"
          alt=""
          className="w-9 h-9 shrink-0 object-contain rounded-full"
        />

        <div
          className="max-w-[72%] min-w-0 rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm text-left"
          style={{
            background: sticker ? "transparent" : data.theme?.contrasfont,
            border: sticker ? "none" : `1px solid ${data.theme?.warna3}`,
          }}
        >
          <strong
            className={`block text-sm truncate mb-0.5 text-left rounded ${sticker? "pl-2" : ""}`}
            style={{ color: data.theme?.warna3, background: data.theme?.contrasfont }}
          >
            {comment.nama}
          </strong>

          {sticker ? (
            <img
              src={comment.ucapan}
              alt="sticker"
              className="w-28 h-28 object-contain"
            />
          ) : (
            <p className="my-1 whitespace-pre-line break-words text-sm leading-relaxed text-left">
              {formatUcapan(comment.ucapan)}
            </p>
          )}

        <p className={`text-right text-[10px] mt-1 ${
            sticker ? "bg-white rounded-full px-2  w-fit ml-auto" : ""
          }`}
        >
          {formatDate(comment.date)}
        </p>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full px-2 py-3"
    style={{  backgroundImage: `url(${data.theme?.backgroundImage})`,
    backgroundSize: "cover",backgroundPosition: "center", backgroundAttachment: "fixed",      color: data.theme?.warna1,}}>
      <div className="flex flex-col gap-2">
        {data.Chat?.Interaksi?.map((Chat, index) => renderSystemChat(Chat, index))}
      </div>

      <div className="flex flex-col gap-2 mt-3">
        {comments.length === 0 ? (
          <div className="text-left py-5 text-sm opacity-60">
            Belum ada ucapan.
          </div>
        ) : (
          <>
            {visibleComments < comments.length && (
              <button
                type="button"
                className="self-center text-xs px-4 py-1.5 rounded-full transition active:scale-95"
                style={{
                  color: data.theme?.contrasfont,
                  background: data.theme?.warnaButtonBackground,
                }}
                onClick={() => setVisibleComments((prev) => prev + COMMENTS_PER_LOAD)}
              >
                Load more
              </button>
            )}

            {currentComments.map((comment, index) =>
              renderUserComment(comment, index)
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ChatArea;
