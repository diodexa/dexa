import { useState } from "react";
import type { Invitation } from "../../../types/invitationType";
import { postComment, type Comment } from "../../1.Components/ChatService";

interface Props {
  data: Invitation;
  guest: string;
  loadComments: () => Promise<void>;
  comments: Comment[];
}

const UcapanDoa = ({
  data,
  guest,
  loadComments,
  comments,
}: Props) => {
  const idUndangan = `${data.template} ${data.NamabridePanggilan}-${data.NamagroomPanggilan}`;

  const [nama, setNama] = useState(guest || "");
  const [ucapan, setUcapan] = useState("");
  const [kehadiran, setKehadiran] = useState("Hadir");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const COMMENTS_PER_PAGE = 4;

  const totalPages = Math.ceil(
    comments.length / COMMENTS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * COMMENTS_PER_PAGE;

  const currentComments = comments.slice(
    startIndex,
    startIndex + COMMENTS_PER_PAGE
  );

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
    formData.append("Ucapan", ucapan.trim());

    setLoading(true);

    try {
      await postComment(formData);

      await loadComments();

      setUcapan("");
      setKehadiran("Hadir");

      // Kembali ke halaman pertama supaya
      // ucapan terbaru langsung terlihat
      setCurrentPage(1);

    } catch (err) {
      console.error(err);
      alert("Gagal mengirim. Coba ulangi ya");
    } finally {
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
    return text
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  };

  return (
    <section className="px-6 py-24"
    style={{background:data.theme?.warna2, color:data.theme?.warna1}}>

      <div className="max-w-md mx-auto ">

        {/* TITLE */}
        <div className="text-center">

          <p className="text-xs tracking-[0.4em] uppercase FadeinScale"
          style={{color:`color-mix(in srgb, ${data.theme?.warna1} 50%, transparent)`}}>
            Wishes
          </p>

          <h2 className="mt-4 text-4xl font-serif FadeinScale">
            Ucapan & Doa
          </h2>

          <div className="w-12 h-px bg-black mx-auto my-8 FadeinScale" />

          <p className="text-sm leading-7 FadeinScale"
          style={{color:`color-mix(in srgb, ${data.theme?.warna1} 60%, transparent)`}}>
            Kirimkan ucapan dan doa terbaik untuk
            {` ${data.NamabridePanggilan} & ${data.NamagroomPanggilan}`}
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-4"
        >

          <div>
            <label className="text-xs tracking-wider uppercase">
              Nama
            </label>

            <input
              required
              type="text"
              placeholder="Isi nama"
              value={nama}
              onChange={(e) =>
                setNama(e.target.value)
              }
              className="mt-2 w-full  px-4 py-3 outline-none focus:border-black"
              style={{border:`1px solid color-mix(in srgb, ${data.theme?.warna1} 20%, transparent)`}}
            />
          </div>

          <div>
            <label className="text-xs tracking-wider uppercase">
              Ucapan & Doa
            </label>

            <textarea
              required
              rows={5}
              placeholder="Tuliskan ucapan dan doa..."
              value={ucapan}
              onChange={(e) =>
                setUcapan(e.target.value)
              }
              className="mt-2 w-full  px-4 py-3 outline-none resize-none focus:border-black"
              style={{border:`1px solid color-mix(in srgb, ${data.theme?.warna1} 20%, transparent)`}}
            />
          </div>

          {/* KEHADIRAN + BUTTON */}
          <div className="flex items-center justify-between gap-4">

            <label className="flex items-center gap-2 text-sm cursor-pointer">

              <input
                type="checkbox"
                checked={kehadiran === "Hadir"}
                onChange={(e) =>
                  setKehadiran(
                    e.target.checked
                      ? "Hadir"
                      : "Tidak Hadir"
                  )
                }
                className="accent-black"
              />

              Hadir

            </label>

            <button
              type="submit"
              disabled={loading}
              className={`text-white px-6 py-3 text-xs tracking-[0.2em] uppercase transition ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-black/80"
              }`}
              style={{backgroundColor:data.theme?.warnaButtonBackground, color:data.theme?.warna2}}
            >
              {loading
                ? "Mengirim..."
                : "Kirim Ucapan"}
            </button>

          </div>

        </form>

        {/* COMMENTS */}
        <div className="mt-12 h-[400px] overflow-y-auto overflow-x-hidden">

          {comments.length === 0 ? (

            <div className="p-8 text-center"
            style={{border:`1px solid color-mix(in srgb, ${data.theme?.warna1} 10%, transparent)`}}>
              <p className="text-sm "
              style={{color:`color-mix(in srgb, ${data.theme?.warna1} 50%, transparent)`}}>
                Belum ada ucapan nih
              </p>
            </div>

          ) : (

            <div className="space-y-3">

              {currentComments.map(
                (comment, index) => (

                  <div
                    key={index}
                    className="border p-4 text-left"
                    style={{border:`1px solid color-mix(in srgb, ${data.theme?.warna1} 10%, transparent)`}}
                  >

                    <div className="flex items-center  pb-2"
                    style={{borderBottom:`1px solid color-mix(in srgb, ${data.theme?.warna1} 10%, transparent)`}}>

                      <strong className="flex-1 truncate font-serif">
                        {comment.nama}
                      </strong>

                      <span className="text-xs text-black/50"
                      style={{color:`color-mix(in srgb, ${data.theme?.warna1} 50%, transparent)`}}>
                        {comment.kehadiran}
                      </span>

                    </div>

                    <p className="mt-3 text-sm leading-6 whitespace-pre-line break-all">
                      {formatUcapan(comment.ucapan)}
                    </p>

                    <p className="mt-3 text-right text-[10px] text-black/40"
                    style={{color:`color-mix(in srgb, ${data.theme?.warna1} 40%, transparent)`}}>
                      {formatDate(comment.date)}
                    </p>

                  </div>

                )
              )}

            </div>

          )}

        </div>

        {/* PAGINATION */}
        {comments.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-8">

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.max(1, p - 1)
                )
              }
              disabled={currentPage === 1}
              className="w-8 h-8 disabled:opacity-30"
              style={{border:`1px solid color-mix(in srgb, ${data.theme?.warna1} 20%, transparent)`}}
            >
              &lt;
            </button>

            <span className="text-sm">
              {currentPage} / {totalPages || 1}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(totalPages, p + 1)
                )
              }
              disabled={
                currentPage === totalPages
              }
              className="w-8 h-8  disabled:opacity-30"
              style={{border:`1px solid color-mix(in srgb, ${data.theme?.warna1} 20%, transparent)`}}
            >
              &gt;
            </button>

          </div>
        )}

      </div>

    </section>
  );
};

export default UcapanDoa;