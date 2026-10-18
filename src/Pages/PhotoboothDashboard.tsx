
import { useEffect, useMemo, useState } from "react";
import { getPhotoboothData } from "../Components/Services/PhotoboothService";

type Memory = {
  idUndangan: string;
  nama: string;
  ucapan: string;
  fotoFileId: string;
  audioFileId: string;
  date: string;
  fotoUrl?: string;
  audioUrl?: string;
};

function driveUrl(id: string) {
  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1200`;
}
function driveAudioUrl(id: string) {
  return `https://lh3.googleusercontent.com/d/${encodeURIComponent(id)}`;
}

export default function PhotoboothDashboard() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("key") || "";

  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Memory | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!key) {
      setError("Link galeri tidak valid atau tidak memiliki kunci akses.");
      setLoading(false);
      return;
    }

    let active = true;

    async function loadGallery() {
      try {
        const rows = await getPhotoboothData(key);

        if (active) {
          setMemories(rows.map((row: Memory) => ({
          ...row,
          fotoUrl: row.fotoFileId ? driveUrl(row.fotoFileId) : "",
          audioUrl: row.audioFileId
            ? driveAudioUrl(row.audioFileId)
            : "",
        })));
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadGallery();
    return () => { active = false; };
  }, [key]);

  const filtered = useMemo(() => memories.filter(item =>
    `${item.nama} ${item.ucapan}`.toLowerCase().includes(search.toLowerCase())
  ), [memories, search]);

  const dateLabel = (value: string) => {
    if (!value) return "Tanggal tidak tersedia";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <main className="min-h-screen bg-[#F5F2EB] text-[#38382F]">
      <header className="border-b border-[#E8E2D7] bg-white/80 px-5 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[#858B76]">DEXA INVITATION</p>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl">Our Wedding Memories</h1>
          </div>
          <div className="rounded-full bg-[#E7EBDD] px-3 py-2 text-xs font-medium text-[#59634D]">
            Galeri privat
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:py-12">
        <div className="mb-8">
          <p className="text-sm text-[#888579]">Setiap foto menyimpan cerita.</p>
          <h2 className="mt-2 font-serif text-3xl">Kenangan dari para tamu ♡</h2>
          <p className="mt-2 text-sm text-[#858277]">
            Foto, ucapan, dan pesan suara dari hari istimewa kalian.
          </p>
        </div>

  
        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center text-sm text-[#858277]">
            Memuat kenangan...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-[#E8D8D1] bg-white p-8 text-center">
            <p className="text-lg font-medium">Galeri belum bisa dibuka</p>
            <p className="mt-2 text-sm text-[#858277]">{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-5">
                <p className="text-sm text-[#858277]">Total kenangan</p>
                <p className="mt-2 text-3xl font-semibold">{memories.length}</p>
              </div>
              <div className="rounded-2xl bg-white p-5">
                <p className="text-sm text-[#858277]">Pesan ucapan</p>
                <p className="mt-2 text-3xl font-semibold">
                  {memories.filter(item => item.ucapan?.trim()).length}
                </p>
              </div>
              <div className="col-span-2 rounded-2xl bg-white p-5 sm:col-span-1">
                <p className="text-sm text-[#858277]">Pesan suara</p>
                <p className="mt-2 text-3xl font-semibold">
                  {memories.filter(item => item.audioFileId || item.audioUrl).length}
                </p>
              </div>
            </div>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-serif text-2xl">Galeri foto</h3>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari nama atau ucapan..."
                className="w-full rounded-xl border border-[#E5E0D6] bg-white px-4 py-3 text-sm outline-none focus:border-[#929A81] sm:max-w-xs"
              />
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center text-sm text-[#858277]">
                {memories.length ? "Tidak ada kenangan yang cocok." : "Belum ada foto dari tamu."}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((item, index) => (
                  <button
                    key={`${item.fotoFileId}-${index}`}
                    onClick={() => setSelected(item)}
                    className="overflow-hidden rounded-2xl bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    {item.fotoUrl ? (
                      <img
                        src={item.fotoUrl || driveUrl(item.fotoFileId)}
                        alt={`Foto ${item.nama}`}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                        
                      />
                    ) : (
                      <div className="flex aspect-[4/5] items-center justify-center bg-[#EAE7DE] text-sm text-[#858277]">
                        Foto tidak tersedia
                      </div>
                    )}
                    <div className="p-3">
                      <p className="truncate font-medium">{item.nama || "Tamu"}</p>
                      <p className="mt-1 text-xs text-[#8B887E]">{dateLabel(item.date)}</p>
                      {item.audioFileId && (
                        <p className="mt-2 text-xs text-[#69765C]">♫ Pesan suara</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="my-auto w-full max-w-lg rounded-3xl bg-white p-4 sm:p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-serif text-2xl">{selected.nama || "Tamu"}</p>
                <p className="mt-1 text-xs text-[#858277]">{dateLabel(selected.date)}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full bg-[#F1EFE8] px-3 py-2 text-sm"
              >
                Tutup ✕
              </button>
            </div>

            {selected.fotoUrl && (
              <img
                src={selected.fotoUrl || driveUrl(selected.fotoFileId)}
                alt={`Foto dari ${selected.nama}`}
                className="w-full rounded-xl object-contain"
                onError={(e) => console.error("Foto gagal dimuat:", e.currentTarget.src)}
              />
            )}

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#858B76]">Ucapan</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6">
                {selected.ucapan || "Tamu tidak menambahkan ucapan."}
              </p>
            </div>

        
            {selected.audioFileId && (
              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#858B76]">
                  Pesan suara
                </p>

                 <iframe
                    key={selected.audioFileId}
                    src={`https://drive.google.com/file/d/${encodeURIComponent(
                      selected.audioFileId
                    )}/preview`}
                    title="Pemutar pesan suara"
                    className="relative top-2 h-40 w-full rounded-lg border-0"
                    allow="autoplay"
                  />

                <a
                  href={`https://drive.google.com/file/d/${encodeURIComponent(
                    selected.audioFileId
                  )}/view`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-[#858B76] underline"
                >
                  Buka audio di Google Drive
                </a>
              </div>
            )}


            {selected.fotoUrl && (
              <a
                href={selected.fotoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 block rounded-xl bg-[#788269] px-4 py-3 text-center text-sm font-medium text-white"
              >
                Buka / simpan foto
              </a>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
