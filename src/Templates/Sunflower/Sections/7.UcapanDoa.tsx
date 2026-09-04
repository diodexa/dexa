import { useState } from "react";
import type { Invitation } from "../../../types/invitationType";
import { postComment } from "../../1.Components/ChatService";
import {  type Comment } from "../../1.Components/ChatService";

interface Props {
  data: Invitation
  guest : string;
  loadComments: () => Promise<void>;
  comments : Comment[]
  scrollY: number;

}

const Ucapan = ({data, guest, loadComments, comments, }:Props) =>  {
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
   <section className="relative flex min-h-screen w-full flex-col overflow-hidden text-lg" 
   style={{ background: data.theme?.warna1, color: data.theme?.contrasfont }}>
    <div className="absolute top-0  w-full h-[75px] rotate-180 bg-center-bottom bg-contain overflow-hidden">
        <div className=" w-full h-full  bg-repeat"
        style={{ backgroundImage: "url('/Ornament/sun1.png')" }}/>
    </div>
    <div className={`relative flex h-[110px] mt-10 w-full shrink-0 items-center justify-center `}>

        <h2 className=" font-Cenova uppercase  text-4xl">Ucapan & Doa</h2>
    </div>

    <div className="mx-auto flex w-full max-w-[600px] flex-1 min-h-0 flex-col px-4">
        <div className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border p-2 shadow-sm`} style={{ background: data.theme?.warna2, color: data.theme?.ContrasBackgroundColor }}>
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
            {comments.length === 0 ? (
            <div className="flex h-full items-center justify-center">
                <p className="text-sm opacity-60">Belum ada ucapan nih</p>
            </div>
            ) : (
            currentComments.map((comment, index) => (
                <div key={index} className="rounded-lg border p-2" style={{ background: index % 2 === 0 ? `${data.theme?.warna1}20` : `${data.theme?.contrasfont}10` }}>
                <div className="flex items-center gap-2 border-b pb-1 text-left">
                    <strong className="flex-1 truncate text-sm" style={{ color: data.theme?.warna1 }}>{comment.nama}</strong>
                    <p className=" text-xs">{comment.kehadiran}</p>
                </div>
                <p className="my-2 whitespace-pre-line break-words text-sm line-clamp-4 text-left">{formatUcapan(comment.ucapan)}</p>
                <p className="text-right text-[0.5rem] opacity-60">{formatDate(comment.date)}</p>
                </div>
            ))
            )}
        </div>

        <div className="flex shrink-0 items-center justify-center gap-3 py-3 text-sm">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="rounded-full border px-3 py-1 transition hover:scale-110 disabled:opacity-30" style={{ background: data.theme?.warnaButtonBackground, color: data.theme?.contrasfont }}>
            ‹
            </button>
            <span className="text-xs opacity-70">{currentPage} / {totalPages || 1}</span>
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="rounded-full border px-3 py-1 transition hover:scale-110 disabled:opacity-30" style={{ background: data.theme?.warnaButtonBackground, color: data.theme?.contrasfont }}>
            ›
            </button>
        </div>
        </div>

        <form className={`shrink-0 px-1 pb-5 pt-4 `} onSubmit={handleSubmit}>
        <input required type="text" placeholder="Nama kamu" value={nama} onChange={(e) => setNama(e.target.value)} className="mb-2 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none" style={{ background: data.theme?.warna2, color: data.theme?.ContrasBackgroundColor }} />
        <textarea required placeholder="Tulis ucapan dan doa..." value={ucapan} onChange={(e) => setUcapan(e.target.value)} className="h-[80px] w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none" style={{ background: data.theme?.warna2, color: data.theme?.ContrasBackgroundColor }} />
        <div className="mt-2 flex items-center justify-end gap-7">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={kehadiran === "Hadir"} style={{ accentColor: data.theme?.warnaButtonBackground }} onChange={(e) => setKehadiran(e.target.checked ? "Hadir" : "Tidak Hadir")} />
            Hadir
            </label>
            <button type="submit" disabled={loading} className={`rounded-lg border px-4 py-2 text-sm transition hover:scale-105 ${loading ? "cursor-not-allowed opacity-50" : ""}`} style={{ background: data.theme?.warnaButtonBackground, color: data.theme?.contrasfont }}>
            {loading ? "Mengirim..." : "Kirim Pesan"}
            </button>
        </div>
        </form>
    </div>
    </section>
  )
};

export default Ucapan;