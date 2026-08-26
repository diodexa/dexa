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
  const [kehadiran, setKehadiran] = useState("Hadir");

  const [loading, setLoading] = useState(false);

  const [selectedSticker, setSelectedSticker] = useState("");
  const [showStickers, setShowStickers] = useState(false);

  // Sticker dari data Invitation
  const stickers = data.sticker ?? [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kalau bukan sticker, ucapan wajib diisi
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
    formData.append("Kehadiran", kehadiran);

    // HANYA kirim salah satu
    if (selectedSticker) {
      formData.append("Ucapan", selectedSticker);
    } else {
      formData.append("Ucapan", ucapan.trim());
    }

    setLoading(true);

    try {
      await postComment(formData);
      await loadComments();

      // Reset
      setNama("");
      setUcapan("");
      setKehadiran("Hadir");
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
    <section className="relative w-full pb-[env(safe-area-inset-bottom)]" style={{
        background: data.theme?.warna1}}>

      {/* ================= STICKER PICKER ================= */}

      {showStickers && (
        <div className="absolute bottom-[60px] left-2 z-50 bg-white rounded-xl shadow-lg p-3" >
          <div className="grid grid-cols-4 gap-2">
            {stickers.map((sticker, index) => (
              <button key={index} type="button"
                onClick={() => { setSelectedSticker(sticker);setShowStickers(false);
                  // Kalau pilih sticker, kosongkan text
                  setUcapan("");}}
                className=" rounded-lg hover:bg-gray-100 hover:scale-110 transition">
                <img src={sticker} alt={`Sticker ${index + 1}`} className="w-full h-full object-contain"/>
              </button>
            ))}

          </div>
        </div>
      )}

      {/* ================= FORM ================= */}

      <form className="flex gap-2 p-2 h-[60px]"onSubmit={handleSubmit}>

        {/* NAMA */}
        <input required type="text" placeholder="Isi Nama"value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="border text-center w-1/4 break-words bg-white rounded-lg"/>

        {/* INPUT PESAN */}
        <div className="relative w-1/2">

          <textarea placeholder={selectedSticker? "Sticker dipilih": "Isi pesan kamu"}  disabled={loading || !!selectedSticker}
            className={`border w-full h-full pt-2 px-1 bg-white rounded-lg resize-none disabled:bg-gray-100 ${loading ? "pointer-events-none" : "pointer-events-auto"}`}
            value={ucapan}
            
            onChange={(e) => setUcapan(e.target.value)}/>

          {/* PREVIEW STICKER */}
          {selectedSticker && (
            <div className="absolute inset-0 bg-white rounded-lg flex items-center justify-center">
              <img src={selectedSticker} alt="Sticker"
                className="h-12 w-12 object-contain"/>

              {/* Hapus sticker */}
              <button type="button" onClick={() => setSelectedSticker("")}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white text-xs">
                ×
              </button>

            </div>
          )}

        </div>

        {/* BUTTON STICKER + SEND */}
        <div className="flex w-1/4 gap-1">

          {/* STICKER */}
          <button type="button" onClick={() => setShowStickers((prev) => !prev)}
            className=" rounded-lg px-1 flex items-center justify-center"
            style={{ color: data.theme?.contrasfont, }}>
            <i className="fa-regular fa-face-smile text-2xl" />
          </button>

          {/* SEND */}
          <button className={`border rounded-lg flex-1
              ${loading ? "opacity-50 cursor-not-allowed": ""}`}
            style={{ background: data.theme?.warnaButtonBackground,color: data.theme?.contrasfont,}}
            type="submit" disabled={loading}>
            {loading ? "..." : "Send"}
          </button>

        </div>

      </form>
    </section>
  );
};

export default InputArea;