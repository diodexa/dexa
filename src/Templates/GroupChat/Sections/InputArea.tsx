import { useState } from "react";
import type { Invitation } from "../../../types/invitationType";
import { postComment } from "../../1.Components/ChatService";

interface Props {
  data: Invitation;
  guest: string;
  loadComments: () => Promise<void>;
}

const InputArea = ({ data, loadComments, guest }: Props) => {
  const idUndangan = `${data.template} ${data.NamabridePanggilan}-${data.NamagroomPanggilan}`;
  const [nama, setNama] = useState(guest || "");
  const [ucapan, setUcapan] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState("");
  const [showStickers, setShowStickers] = useState(false);
  const stickers = data.sticker ?? [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      alert("Isi nama dulu ya :)");
      return;
    }
    if (!ucapan.trim() && !selectedSticker) {
      alert("Isi pesan atau pilih sticker dulu ya :)");
      return;
    }

    const formData = new FormData();
    formData.append("id", idUndangan);
    formData.append("Nama", nama.trim());
    formData.append("Ucapan", selectedSticker || ucapan.trim());
    setLoading(true);

    try {
      await postComment(formData);
      await loadComments();
      setNama("");
      setUcapan("");
      setSelectedSticker("");
      setShowStickers(false);
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim. Coba ulangi ya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full pb-[env(safe-area-inset-bottom)]" style={{ background: data.theme?.warna1 }}>
      {showStickers && (
        <div className="absolute bottom-[68px] left-2 right-2 z-50 rounded-2xl p-3 shadow-xl border"
          style={{ background: data.theme?.contrasfont, borderColor: data.theme?.warna3 }}>
          <div className="grid grid-cols-5 gap-2">
            {stickers.map((sticker, index) => (
              <button key={index} type="button"
                onClick={() => {
                  setSelectedSticker(sticker);
                  setUcapan("");
                  setShowStickers(false);
                }}
                className="aspect-square rounded-xl flex items-center justify-center transition hover:scale-110 active:scale-95">
                <img src={sticker} alt={`Sticker ${index + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 min-h-[64px]">
        <input required type="text" placeholder="Nama" value={nama} disabled={loading}
          onChange={(e) => setNama(e.target.value)}
          className="h-[46px] w-[27%] min-w-0 rounded-xl border px-2 text-center text-sm outline-none focus:ring-2 transition"
          style={{ background: data.theme?.contrasfont, borderColor: data.theme?.warna3 }}
        />

        <div className="relative flex-1 h-[46px]">
          <textarea placeholder={selectedSticker ? "Sticker dipilih" : "Tulis ucapan..."}
            disabled={loading || !!selectedSticker} value={ucapan}
            onChange={(e) => setUcapan(e.target.value)}
            className="w-full h-full resize-none rounded-xl border px-3 py-3 text-sm outline-none transition disabled:opacity-70"
            style={{ background: data.theme?.contrasfont, borderColor: data.theme?.warna3 }}
          />

          {selectedSticker && (
            <div className="absolute inset-0 rounded-xl flex items-center justify-center"
              style={{ background: data.theme?.contrasfont }}>
              <img src={selectedSticker} alt="Sticker" className="h-10 w-10 object-contain" />
              <button type="button" onClick={() => setSelectedSticker("")}
                className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                style={{ background: data.theme?.warna2 }}>
                ×
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button type="button" disabled={loading} onClick={() => setShowStickers((prev) => !prev)}
            className="h-[46px] w-[42px] rounded-xl flex items-center justify-center transition active:scale-90"
            style={{ color: data.theme?.contrasfont }}>
            <i className="fa-regular fa-face-smile text-xl" />
          </button>

          <button type="submit" disabled={loading}
            className="h-[46px] px-4 rounded-xl flex items-center justify-center font-medium transition active:scale-95 disabled:opacity-50"
            style={{ background: data.theme?.warnaButtonBackground, color: data.theme?.contrasfont }}>
            {loading ? <i className="fa-solid fa-spinner animate-spin" /> : <i className="fa-solid fa-paper-plane" />}
          </button>
        </div>
      </form>
    </section>
  );
};

export default InputArea;