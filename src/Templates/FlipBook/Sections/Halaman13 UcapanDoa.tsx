import {  useState } from "react";
import type { Invitation } from "../../../types/invitationType";
import {  type Comment } from "../../1.Components/ChatService";


interface Props {
  data: Invitation;
  isActive: boolean;
  comments : Comment[];
}

const Halaman13 = ({data,isActive, comments}:Props) =>  {
  const [currentPage, setCurrentPage] = useState(1);

  const COMMENTS_PER_PAGE = 4;
  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);

  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;

  const currentComments = comments.slice(startIndex,startIndex + COMMENTS_PER_PAGE);

  // =====================
  // tanggal 
  // ============
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("id-ID", {
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

  return (
    <div className="Kertas__half Kertas__half--front  flex w-full h-full lg:text-[0.6rem]"
    style={{background: data.theme?.warna1, color: data.theme?.warna2}}>
      {data.Background?.Background13 ? (
        <img src={data.Background.Background13} alt="" className="absolute inset-0 w-full h-full object-cover" />): 
      <>
      <div className="flex flex-col items-center w-full h-full"
        style={{ pointerEvents: isActive ? "auto" : "none" }}>
        {/* AREA KOMENTAR */}
        <div
          className="flex-1 min-h-0 w-full overflow-hidden p-1 flex flex-col gap-1"
          style={{ pointerEvents: isActive ? "auto" : "none" }}>
          {comments.length === 0 ? (
            <p>Belum ada ucapan.</p>
          ) : (
            currentComments.map((comment, index) => (
              <div
                className="border text-left text-xs lg:text-[0.6rem] p-px"
                style={{
                  background:
                    index % 2 === 0
                      ? `${data.theme?.warna1}20`
                      : `${data.theme?.contrasfont}80`,
                }}
                key={index}
              >
                <div className="flex items-center border-b px-px">
                  <strong
                    style={{ color: data.theme?.warna3 }}
                    className="flex-1 truncate py-1"
                  >
                    {comment.nama}
                  </strong>

                  <p className="shrink-0 whitespace-nowrap ml-1">
                    {comment.kehadiran}
                  </p>
                </div>

                <p className="my-1 px-px whitespace-pre-line break-all line-clamp-4">
                  {formatUcapan(comment.ucapan)}
                </p>

                <p className="text-right text-[0.5rem] lg:text-[0.4rem]">
                  {formatDate(comment.date)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        <div className="h-[30px] shrink-0 flex justify-center items-center gap-2">
          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))
            }
            disabled={currentPage === 1}
            className="px-2 border rounded hover:scale-110"
            style={{
              background: data.theme?.warnaButtonBackground,
              color: data.theme?.contrasfont,
            }}
          >
            &lt;
          </button>

          <span>
            {currentPage} / {totalPages || 1}
          </span>

          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(totalPages, p + 1)
              )
            }
            disabled={currentPage === totalPages}
            className="px-2 border rounded hover:scale-110"
            style={{
              background: data.theme?.warnaButtonBackground,
              color: data.theme?.contrasfont,
            }}
          >
            &gt;
          </button>
        </div>
      </div>
        
      </>}
    </div>
  )
};

export default Halaman13;