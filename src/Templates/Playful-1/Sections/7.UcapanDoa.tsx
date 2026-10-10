
import { useRef, useState } from "react";
import type { Invitation } from "../../../types/invitationType";
import { postComment, type Comment } from "../../1.Components/ChatService";

interface Props {
  data: Invitation;
  guest: string;
  loadComments: () => Promise<void>;
  comments: Comment[];
  animate: boolean;
}

const UcapanDoa = ({ data, guest, loadComments, comments, animate }: Props) => {
  const idUndangan = `${data.template} ${data.NamabridePanggilan}-${data.NamagroomPanggilan}`;
  const [nama, setNama] = useState(guest || "");
  const [ucapan, setUcapan] = useState("");
  const [kehadiran, setKehadiran] = useState("Hadir");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSticker, setSelectedSticker] = useState("");
  const [showStickers, setShowStickers] = useState(false);
  const submittingRef = useRef(false);

  const stickers = data.sticker ?? [];
  const hasStickers = stickers.length > 0;
  const COMMENTS_PER_PAGE = 4;
  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const currentComments = comments.slice(startIndex, startIndex + COMMENTS_PER_PAGE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    if (!nama.trim()) {
      alert("Isi nama dulu ya :)");
      return;
    }

    if (!ucapan.trim() && !selectedSticker) {
      alert("Tulis ucapan atau pilih stiker dulu ya :)");
      return;
    }

    submittingRef.current = true;
    setLoading(true);

    const formData = new FormData();
    formData.append("id", idUndangan);
    formData.append("Nama", nama.trim());
    formData.append("Kehadiran", kehadiran);

    // Teks dan stiker dikirim bersama dalam field Ucapan.
    formData.append("Ucapan", [ucapan.trim(), selectedSticker].filter(Boolean).join("\n"));

    try {
      await postComment(formData);
      await loadComments();
      setNama(guest || "");
      setUcapan("");
      setKehadiran("Hadir");
      setSelectedSticker("");
      setShowStickers(false);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim. Coba refresh ya :)");
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  // const isSticker = (text: string) => hasStickers && stickers.includes(text);

  const parseComment = (text: string) => {
    const sticker = stickers.find((item) => text.includes(item));
    const message = sticker ? text.replace(sticker, "").trim() : text;
    return { sticker, message };
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden px-5 py-20" style={{ color: data.theme?.warna3 }}>
      <img src="/Ornament/doodleMerpati.webp" alt="" className={`pointer-events-none absolute bottom-0 -left-7 z-0 w-[120px] rotate-[5deg] object-contain ${animate ? "MunculKiri-1" : "opacity-0"}`} />
      <img src="/Ornament/doodleVasBunga.webp" alt="" className={`pointer-events-none absolute bottom-0 -right-7 z-0 w-[120px] rotate-[5deg] object-contain ${animate ? "MunculKiri-1" : "opacity-0"}`} />
      <img src="/Ornament/doodleLampuGantungHijau.webp" alt="" className={`pointer-events-none absolute top-0 -right-7 z-0 w-[120px] rotate-[5deg] object-contain ${animate ? "MunculKiri-1" : "opacity-0"}`} />

      <div className={`relative z-10 mb-8 pt-1 text-center ${animate ? "Fadein-1" : "opacity-0"}`}>
        <p className="mb-2 text-[10px] uppercase tracking-[0.4em]" style={{ color: data.theme?.warna2 }}>From Your Loved Ones</p>
        <h2 className="text-5xl" style={{ color: data.theme?.warna3 }}>Wishes</h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 opacity-30" style={{ background: data.theme?.warna3 }} />
          <span>♡</span>
          <span className="h-px w-10 opacity-30" style={{ background: data.theme?.warna3 }} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className={`relative z-20 shrink-0 ${animate ? "Fadein-1" : "opacity-0"}`}>
        <div className="mb-5 text-center">
          <p className="text-2xl">Leave a Wish</p>
        </div>

        <input type="text" required placeholder="Nama kamu" value={nama} disabled={loading} onChange={(e) => setNama(e.target.value)} className="mb-2 w-full rounded-xl border px-4 py-3 text-sm font-sans outline-none placeholder:opacity-50" style={{ background: `${data.theme?.warna2}30`, borderColor: `${data.theme?.contrasfont}25`, color: data.theme?.ContrasBackgroundColor }} />

        

        <div className="overflow-hidden rounded-xl border" style={{ background: `${data.theme?.warna2}30`, borderColor: `${data.theme?.contrasfont}25` }}>
          <textarea
            placeholder="Tulis ucapan dan doa..."
            disabled={loading}
            value={ucapan}
            onChange={(e) => setUcapan(e.target.value)}
            rows={3}
            className="max-h-[180px] min-h-[90px] w-full resize-none overflow-y-auto bg-transparent px-4 pt-3 text-sm font-sans outline-none placeholder:opacity-50"
            style={{ color: data.theme?.ContrasBackgroundColor }}
          />

          {(selectedSticker || hasStickers) && (
            <div className="flex items-end justify-between gap-2 px-3 pb-3">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                {selectedSticker && (
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-lg p-1" >
                    <img src={selectedSticker} alt="Stiker pilihan" className="h-full w-full object-contain" />
                    <button type="button" disabled={loading} onClick={() => setSelectedSticker("")} aria-label="Hapus stiker" className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-start justify-center rounded-full  text-white font-sans leading-none inline-flex" style={{background:data.theme?.warna3}}>×</button>
                  </div>
                )}
              </div>

              {hasStickers && (
                <button type="button" disabled={loading} onClick={() => setShowStickers((prev) => !prev)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition active:scale-90" style={{ background: `${data.theme?.warna3}20`, color: data.theme?.warna3 }}>
                  <i className="fa-regular fa-face-smile text-xl" />
                </button>
              )}
            </div>
          )}
        </div>

        {hasStickers && showStickers && (
          <div className="mt-2 rounded-xl border p-3" style={{ background: data.theme?.warnaButtonBorder, borderColor: `${data.theme?.warna3}40` }}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs" style={{ color: data.theme?.ContrasBackgroundColor }}>Pilih stiker</p>
              <button type="button" onClick={() => setShowStickers(false)} className="flex h-6 w-6 items-center justify-center rounded-full font-sans" style={{ color: data.theme?.warna3}}>×</button>
            </div>
            <div className="grid max-h-[180px] grid-cols-4 gap-2 overflow-y-auto">
              {stickers.map((sticker, index) => (
                <button key={index} type="button" disabled={loading} onClick={() => { setSelectedSticker(sticker); setShowStickers(false); }} className="flex aspect-square items-center justify-center rounded-lg  transition hover:scale-105" style={{ background: selectedSticker === sticker ? `${data.theme?.warna3}25` : `${data.theme?.warna2}20`, outline: selectedSticker === sticker ? `1px solid ${data.theme?.warna3}` : "none" }}>
                  <img src={sticker} alt={`Stiker ${index + 1}`} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-end gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-xs">
            <input type="checkbox" checked={kehadiran === "Hadir"} disabled={loading} style={{ accentColor: data.theme?.warna3 }} onChange={(e) => setKehadiran(e.target.checked ? "Hadir" : "Tidak Hadir")} />
            Attending
          </label>
          <button type="submit" disabled={loading} className="rounded-xl border px-5 py-2.5 text-xs transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50" style={{ background: data.theme?.warnaButtonBackground, color: data.theme?.warnaButtonBorder }}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>

      <div className="relative z-10 mx-auto flex w-full max-w-[500px] flex-1 flex-col">
        {comments.length === 0 ? (
          <div className="flex h-[350px] flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border" style={{ borderColor: `${data.theme?.warna3}50`, color: data.theme?.warna3 }}>
              <span className="text-2xl">♡</span>
            </div>
            <p className="text-sm opacity-60">No wishes yet</p>
            <p className="mt-1 text-xs opacity-40">Be the first to send your wishes</p>
          </div>
        ) : (
          <>
            <div className="mt-10 min-h-[500px] space-y-4">
              {currentComments.map((comment, index) => {
                const { sticker, message } = parseComment(comment.ucapan);

                return (
                  <div key={`${comment.nama}-${comment.date}-${index}`} className="relative min-w-0 overflow-hidden rounded-2xl p-3 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 font-sans" style={{ background: `${data.theme?.warna2}35`, border: `1px solid ${data.theme?.contrasfont}15`, backdropFilter: "blur(10px)", color: data.theme?.warna3 }}>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full" style={{ background: `${data.theme?.warna3}20` }}>
                        <img src="/logo-dio.webp" alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate">{comment.nama}</p>
                        <p className="text-[9px]">{comment.kehadiran}</p>
                      </div>
                    </div>

                    <div className="mt-3 max-h-[150px] overflow-y-auto pr-1">
                      {message && <p className="whitespace-pre-line break-words text-sm leading-5">{message}</p>}
                      {sticker && <img src={sticker} alt="Stiker ucapan" className={` h-30 w-30 object-contain ${!message ? "mt-0" : ""}`} />}
                    </div>

                    <p className="mt-1 text-right text-[8px]">{formatDate(comment.date)}</p>
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4 font-sans">
                <button type="button" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex h-8 w-8 items-center justify-center rounded-full text-sm transition hover:scale-110 disabled:opacity-30" style={{ color: data.theme?.warnaButtonBorder, background: data.theme?.warnaButtonBackground }}>‹</button>
                <strong className="text-[10px] opacity-50" style={{ color: data.theme?.warna3 }}>{currentPage} / {totalPages}</strong>
                <button type="button" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex h-8 w-8 items-center justify-center rounded-full text-sm transition hover:scale-110 disabled:opacity-30" style={{ color: data.theme?.warnaButtonBorder, background: data.theme?.warnaButtonBackground }}>›</button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default UcapanDoa;
