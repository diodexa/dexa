import { useRef, useState } from "react";
import type { Invitation } from "../../../types/invitationType";
import { postComment, type Comment } from "../../1.Components/ChatService";

interface Props {
  data: Invitation;
  guest: string;
  loadComments: () => Promise<void>;
  comments: Comment[];
  animate : boolean
}

const UcapanDoa = ({ data, guest, loadComments, comments, animate }: Props) => {
  const idUndangan = `${data.template} ${data.NamabridePanggilan}-${data.NamagroomPanggilan}`;
  const [nama, setNama] = useState(guest || "");
  const [ucapan, setUcapan] = useState("");
  const [kehadiran, setKehadiran] = useState("Hadir");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const submittingRef = useRef(false);

  const COMMENTS_PER_PAGE = 4;
  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const currentComments = comments.slice(startIndex, startIndex + COMMENTS_PER_PAGE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submittingRef.current) return;

    if (!nama.trim() || !ucapan.trim()) {
      alert("Isi nama atau ucapannya dulu ya :)");
      return;
    }

    submittingRef.current = true;
    setLoading(true);

    const formData = new FormData();
    formData.append("id", idUndangan);
    formData.append("Nama", nama.trim());
    formData.append("Kehadiran", kehadiran);
    formData.append("Ucapan", ucapan.trim());

    try {
      await postComment(formData);
      await loadComments();

      setNama("");
      setUcapan("");
      setKehadiran("Hadir");
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      alert("Coba refresh ya :)");
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatUcapan = (text: string) => {
    return text.replace(/\n{3,}/g, "\n\n").trim();
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden px-5 py-20"
      style={{ background: data.theme?.warna1, color: data.theme?.contrasfont }} >


      {/* Ornament */}
      <div className="pointer-events-none absolute left-0 top-0 h-[75px] w-full overflow-hidden">
        <div  className="h-full w-full bg-contain bg-repeat-x"
          style={{ backgroundImage: "url('/Ornament/lace.webp')" }}  />
      </div>

      {/* Header */}
      <div className={`relative z-10 mb-8 pt-5 text-center ${animate? "Fadein-1" : "opacity-0"}`}>
        <p
          className="mb-2 text-[10px] uppercase tracking-[0.4em]"
          style={{ color: data.theme?.warna2 }}
        >
          From Your Loved Ones
        </p>
        <h2 className="text-5xl"
          style={{ color: data.theme?.warna3}} >
          Whises
        </h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 opacity-30" style={{ background: data.theme?.warna3 }} />
          <span style={{ color: data.theme?.warna3 }}>♡</span>
          <span className="h-px w-10 opacity-30" style={{ background: data.theme?.warna3 }} />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[500px] flex-1 flex-col">
        {/* Wishes Wall */}
        <div>{comments.length === 0 ? (
            <div className="flex h-[350px] flex-col items-center justify-center text-center">
              <div
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border"
                style={{borderColor: `${data.theme?.warna3}50`,
                  color: data.theme?.warna3 }} >
                <span className="text-2xl">♡</span>
              </div>
              <p className="text-sm opacity-60">No wishes yet</p>
              <p className="mt-1 text-xs opacity-40">
                Be the first to send your wishes
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {currentComments.map((comment, index) => {
                  return (
                <div key={index}
                  className="relative min-w-0 overflow-hidden rounded-2xl p-3 text-left shadow-sm transition duration-300 hover:-translate-y-0.5"
                  style={{ background: `${data.theme?.warna2}35`, border: `1px solid ${data.theme?.contrasfont}15`, backdropFilter: "blur(8px)" }}>

                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full"
                      style={{ background: `${data.theme?.warna3}20` }}>
                      <img src="/logo-dio.webp" alt="" className="h-full w-full object-cover" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold " style={{ color: data.theme?.warna3 }}>
                        {comment.nama}
                      </p>
                      <p className="text-[9px] opacity-50">
                        {comment.kehadiran}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 max-h-[90px] overflow-y-auto pr-1 scrollbar-thin">
                    <p className="whitespace-pre-line break-words text-xs leading-5 opacity-75">
                      {formatUcapan(comment.ucapan)}
                    </p>
                  </div>

                  <p className="mt-2 text-right text-[8px] opacity-40">
                    {formatDate(comment.date)}
                  </p>
                </div>
              );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-4">
                  <button type="button"
                    onClick={() =>  setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex h-8 w-8 items-center justify-center rounded-full border text-sm transition hover:scale-110 disabled:opacity-30"
                    style={{  borderColor: `${data.theme?.contrasfont}25`, color: data.theme?.warna3,}} >
                    ‹
                  </button>

                  <span className="text-[10px] opacity-50">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="flex h-8 w-8 items-center justify-center rounded-full border text-sm transition hover:scale-110 disabled:opacity-30"
                    style={{
                      borderColor: `${data.theme?.contrasfont}25`,
                      color: data.theme?.warna3,
                    }}
                  >
                    ›
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Divider */}
        <div className="my-9 flex items-center gap-3">
          <div
            className="h-px flex-1 opacity-20"
            style={{ background: data.theme?.contrasfont }}
          />
          <span className="text-sm" style={{ color: data.theme?.warna3 }}>
            ❦
          </span>
          <div
            className="h-px flex-1 opacity-20"
            style={{ background: data.theme?.contrasfont }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="shrink-0">
          <div className="mb-5 text-center">
            <p className="text-2xl"
              style={{color: data.theme?.warna3}}>
              Leave a Wish
            </p>
            <p className="mt-1 text-[10px] opacity-50">
              Send your best wishes and prayers
            </p>
          </div>

          <input required type="text" placeholder="Nama kamu"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mb-2 w-full rounded-xl border px-4 py-3 text-sm outline-none placeholder:opacity-50"
            style={{  background: `${data.theme?.warna2}30`,  borderColor: `${data.theme?.contrasfont}25`,color: data.theme?.ContrasBackgroundColor,
            }} />

          <textarea required placeholder="Tulis ucapan dan doa..."
            value={ucapan}
            onChange={(e) => setUcapan(e.target.value)}
            className="h-[85px] w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none placeholder:opacity-50"
            style={{  background: `${data.theme?.warna2}30`, borderColor: `${data.theme?.contrasfont}25`, color: data.theme?.ContrasBackgroundColor }}  />

          <div className="mt-3 flex items-center justify-end gap-5">
            <label className="flex cursor-pointer items-center gap-2 text-xs disabled:cursor-not-allowed disabled:opacity-50">
              <input type="checkbox" disabled={loading} checked={kehadiran === "Hadir"}
                style={{ accentColor: data.theme?.warna3 }}
                onChange={(e) =>  setKehadiran(e.target.checked ? "Hadir" : "Tidak Hadir") }  />
              Attending
            </label>

            <button type="submit"  disabled={loading}
              className="rounded-xl border px-5 py-2.5 text-xs transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              style={{  background: data.theme?.warnaButtonBackground,  color: data.theme?.warnaButtonBorder  }} >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UcapanDoa;