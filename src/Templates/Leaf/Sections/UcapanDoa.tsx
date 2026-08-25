import { useState } from "react";
import type { Invitation } from "../../../types/invitationType";
import { postComment } from "../../1.Components/ChatService";
import {  type Comment } from "../../1.Components/ChatService";

interface Props {
  data: Invitation
  guest: string
  loadComments: () => Promise<void>;
  comments : Comment[]
}

const Ucapan = ({data, guest, loadComments, comments}:Props) =>  {
  const idUndangan = `${data.template} ${data.NamabridePanggilan}-${data.NamagroomPanggilan}`
  const [nama,setNama] = useState (guest || "");
  const [ucapan,setUcapan] = useState ("");
  const [kehadiran,setKehadiran] = useState ("Hadir");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim() || !ucapan.trim()) {
      alert("Isi nama atau ucapannya dulu ya :)");
      return;
    }

    const formData = new FormData();
    formData.append("id", idUndangan);
    formData.append("Nama", nama.trim());
    formData.append("Kehadiran", kehadiran);
    formData.append("Ucapan", ucapan. trim());

    setLoading(true);
    try {
      await postComment(formData);
      await loadComments();

      setNama("");
      setUcapan("");
      setKehadiran("Hadir");
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim. Coba ulangi ya");
    }
    finally {setLoading(false)}
  };


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
    <div className="flex flex-col w-full h-full text-lg">

        <div className="flex flex-col justify-center  w-full  " >
          <div className="h-[90px] relative  w-full  ">
            <img src="/Ornament/bunga4.png"  alt="" className=" w-auto absolute"/>
          </div>
          <h2 className="font-Bromello text-5xl mb-5">Ucapan & Doa</h2>
          <form className="mx-2 " onSubmit={handleSubmit}>
            <input required
            type="text" 
            placeholder="Isi Nama"
            value={nama} 
            onChange={(e) => setNama(e.target.value)} className="border text-center w-full mb-2 break-words"/>
            <textarea  required
            placeholder="isi pesan kamu" 
            className="border  w-full px-1" 
            value={ucapan}
            onChange={(e) => setUcapan(e.target.value)}/>
            <div className="flex w-full justify-end gap-5">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={kehadiran === "Hadir"}
                  style={{accentColor: data.theme?.warnaButtonBackground}}
                  onChange={(e) =>
                    setKehadiran(e.target.checked ? "Hadir" : "Tidak Hadir")
                  }
                />
                Hadir
              </label>

              <button className={`border p-2 lg:p-1  rounded-lg ${loading? "opacity-50 cursor-not-allowed" : ""}`}
              style={{background:data.theme?.warnaButtonBackground, color:data.theme?.contrasfont}}
              type="submit" 
              disabled={loading}> {loading ? "Mengirim..." : "Kirim Pesan"}</button>
            </div>
          </form>
          
        </div>

        {/* boxchat */}
        <div className="flex-1 min-h-0 w-full overflow-hidden p-1  flex flex-col gap-1 border my-2">

          {comments.length === 0 ? (
            <div className="flex h-full justify-center items-center">
                <p>Belum ada ucapan nih</p>
            </div>) : (
            currentComments.map((comment, index) => (
            <div className=" border  text-left  p-px "
            style={{background: index%2 ===0? `${data.theme?.warna1}20` : `${data.theme?.contrasfont}80`}}
            key={index}>
              
              <div className="flex items-center border-b px-px ">
                <strong style={{color:data.theme?.warna1}} className="flex-1 truncate py-1">{comment.nama}</strong>
                <p className="shrink-0 whitespace-nowrap ml-1">{comment.kehadiran}</p>
              </div>
              <p className="my-1 px-px whitespace-pre-line break-all line-clamp-4">{formatUcapan(comment.ucapan)}</p>
              <p className="text-right text-[0.5rem] lg:text-[0.4rem] ">{formatDate(comment.date)}</p>
            </div>
            ))
          )}

        </div>
        <div className="flex justify-center text-2xl items-center gap-2 mb-4 shrink-0">
          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))
            }
            disabled={currentPage === 1}
            className="px-2 border rounded hover:scale-110"
            style={{background: data.theme?.warnaButtonBackground, color:data.theme?.contrasfont}}
          >
            &lt;
          </button>

          <span>
            {currentPage} / {totalPages || 1}
          </span>

          <button
            onClick={() => setCurrentPage((p) =>
                Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2 border rounded hover:scale-110"
            style={{background: data.theme?.warnaButtonBackground, color:data.theme?.contrasfont}}>
            &gt;
          </button>

        </div>
    </div>
  )
};

export default Ucapan;