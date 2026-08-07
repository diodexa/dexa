import {  useState } from "react";
import type { Invitation } from "../../../types/invitationFlipBook";
import {  type Comment } from "../Components/ChatService";


interface Props {
  data: Invitation;
  isActive: boolean;
  comments : Comment[];
}

const Halaman13 = ({data,isActive, comments}:Props) =>  {
  const [currentPage, setCurrentPage] = useState(1);

  const COMMENTS_PER_PAGE = 5;
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

  return (
    <div className="Kertas__half Kertas__half--front  flex w-full h-full"
    style={{background: data.theme?.warna1, color: data.theme?.warna2}}>
      {data.Papper?.Halaman13 ? (
        <img src={data.Papper.Halaman13} alt="" className="absolute inset-0 w-full h-full object-cover" />): 
      <>
      <div className="flex flex-col items-center justify-between w-full h-full " style={{pointerEvents: isActive ? "auto" : "none"}}>
        <div className="flex flex-col h-full w-full p-1"
          style={{ pointerEvents: isActive ? "auto" : "none" }}>


          {comments.length === 0 ? (
            <p>Belum ada ucapan.</p>) : (
            currentComments.map((comment, index) => (
            <div className=" flex flex-col border text-left text-xs gap-1 p-px "
            style={{background: index%2 ===0? `${data.theme?.warna1}20` : `${data.theme?.contrasfont}80`}}
            key={index}>
              <div className="flex justify-between border-b ">
                <strong>{comment.nama.length > 15 ? 
                comment.nama.slice (0,15) + "....." : comment.nama}</strong>
                <p >{comment.kehadiran}</p>
              </div>
              <p className="mt-1 text-wrap break-all ">{comment.ucapan}</p>
              <p className="text-right text-[0.5rem]">{formatDate(comment.date)}</p>
            </div>
            ))
          )}

        </div>
        <div className="flex justify-center items-center gap-2 mb-1 ">
          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))
            }
            disabled={currentPage === 1}
            className="px-2 border rounded"
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
            className="px-2 border rounded"
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