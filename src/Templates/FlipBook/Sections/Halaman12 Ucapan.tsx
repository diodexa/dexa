
import { useState } from "react";
import type { Invitation } from "../../../types/invitationType";
import { postComment } from "../../1.Components/ChatService";

interface Props {
  data: Invitation;
  isActive: boolean;
  guest: string;
  loadComments: () => Promise<void>;
}

const Halaman12 = ({ data, isActive, guest, loadComments }: Props) => {
  const idUndangan = `${data.template} ${data.NamabridePanggilan}-${data.NamagroomPanggilan}`;

  const [nama, setNama] = useState(guest || "");
  const [ucapan, setUcapan] = useState("");
  const [kehadiran, setKehadiran] = useState("Hadir");
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
    formData.append("Ucapan", ucapan.trim());

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Kertas__half Kertas__half--back flex w-full h-full lg:text-[0.6rem]"
      style={{
        background: data.theme?.warna1,
        color: data.theme?.warna2,
      }}
    >
      {data.Background?.Background12 ? (
        <img
          src={data.Background.Background12}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="flex flex-col justify-center items-center w-full h-full px-3"
          style={{
            pointerEvents: isActive ? "auto" : "none",
          }}
        >
          {/* JUDUL */}

          <div className="text-center mb-4">
            <p
              className="text-[0.5rem] tracking-[0.35em] uppercase opacity-60 mb-1"
              style={{ color: data.theme?.warna3 }}
            >
              Wedding Wishes
            </p>

            <h2
              className="font-Colvetica text-2xl"
              style={{ color: data.theme?.warna3 }}
            >
              Ucapan & Doa
            </h2>
          </div>

          {/* FORM */}

          <form
            className="w-full max-w-[300px] flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            {/* NAMA */}

            <input
              required
              type="text"
              placeholder="Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full rounded-md border border-white/30 bg-white/10 px-3 py-2 text-center outline-none placeholder:opacity-50 focus:border-white/60"
            />

            {/* UCAPAN */}

            <textarea
              required
              placeholder="Tulis ucapan dan doa..."
              value={ucapan}
              onChange={(e) => setUcapan(e.target.value)}
              className="w-full h-[95px] resize-none rounded-md border border-white/30 bg-white/10 px-3 py-2 outline-none placeholder:opacity-50 focus:border-white/60"
            />

            {/* KEHADIRAN */}

            <div className="flex items-center justify-between px-1 mt-1">
              <label className="flex items-center gap-2 text-[0.65rem] cursor-pointer">
                <input
                  type="checkbox"
                  checked={kehadiran === "Hadir"}
                  style={{
                    accentColor: data.theme?.warna2,
                  }}
                  onChange={(e) =>
                    setKehadiran(
                      e.target.checked ? "Hadir" : "Tidak Hadir"
                    )
                  }
                />

                <span>Hadir </span>
              </label>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className={`rounded-md px-2 py-1 text-[0.65rem] transition-all ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105 active:scale-95"
                }`}
                style={{
                  background: data.theme?.warnaButtonBackground,
                  color: data.theme?.contrasfont,
                }}
              >
                {loading ? "Mengirim..." : "Kirim"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Halaman12;
