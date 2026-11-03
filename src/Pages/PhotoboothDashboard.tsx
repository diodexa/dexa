
import { useEffect, useMemo, useState } from "react";
import {
  getPhotoboothData,
  getPhotoboothAudio,
  getPhotoboothPhoto,
} from "../Services/PhotoboothService";

type Memory = {
  idUndangan: string;
  nama: string;
  ucapan: string;
  fotoFileId: string;
  audioFileId: string;
  date: string;
  fotoUrl?: string;
};

function driveUrl(id: string) {
  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1200`;
}

function loadCanvasImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("Foto gagal dimuat untuk membuat kolase."));

    image.src = src;
  });
}

async function loadPhotoFromServer(
  key: string,
  fileId: string
): Promise<HTMLImageElement> {
  const { base64, mimeType } = await getPhotoboothPhoto(key, fileId);

  if (!base64) {
    throw new Error("Server tidak mengembalikan data foto.");
  }

  const safeMimeType = /^image\//i.test(mimeType)
    ? mimeType
    : "image/jpeg";

  const dataUrl = `data:${safeMimeType};base64,${base64}`;

  return loadCanvasImage(dataUrl);
}






async function createStoryCollagePages(
  key: string,
  items: Memory[],
  onProgress?: (loaded: number, total: number) => void
): Promise<string[]> {
  const W = 1080;
  const H = 1920;

  const photoItems = items.filter((item) => item.fotoFileId);

  if (photoItems.length === 0) {
    throw new Error("Belum ada foto untuk dibuat kolase.");
  }

  const total = photoItems.length;
  const photos: HTMLImageElement[] = [];

  onProgress?.(0, total);

  for (let i = 0; i < total; i++) {
    const img = await loadPhotoFromServer(
      key,
      photoItems[i].fotoFileId
    );

    photos.push(img);
    onProgress?.(i + 1, total);
  }

  // Warna editorial
  const background = "#FFFFFF";
  const ink = "#39352F";
  const muted = "#888888";

  function createPage(): {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
  } {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas tidak dapat dibuat.");
    }

    const ctx = context;
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, W, H);

    return { canvas, ctx };
  }

  function text(
    ctx: CanvasRenderingContext2D,
    value: string,
    x: number,
    y: number,
    font: string,
    color = ink,
    align: CanvasTextAlign = "left"
  ) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillText(value, x, y);
  }


  // Foto utuh tanpa crop atau distorsi.
  function drawPhoto(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const scale = Math.min(
      width / img.width,
      height / img.height
    );

    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;

    const drawX = x + (width - drawWidth) / 2;
    const drawY = y + (height - drawHeight) / 2;

    // Latar putih untuk area kosong jika rasio berbeda.
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x, y, width, height);

    ctx.drawImage(
      img,
      drawX,
      drawY,
      drawWidth,
      drawHeight
    );
  }

  const pages: string[] = [];

  // Layout 16 foto dalam satu halaman (4 kolom x 4 baris).
  const photosPerPage = 16;

  const photoWidth = 220;
  const photoHeight = 350;

  const gapX = 20;
  const gapY = 20;

  // const startX = 70;
  const startY = 300;

  // Setiap halaman berisi maksimal dua foto.
  
// Maksimal 4 foto per halaman.
  for (let i = 0; i < photos.length; i += photosPerPage) {
    const { canvas, ctx } = createPage();
    const pagePhotos = photos.slice(i, i + photosPerPage);

    // HEADER
    text(
      ctx,
      "DEXA INVITATION",
      75,
      85,
      "500 17px Georgia",
      muted
    );





    pagePhotos.forEach((photo, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;

      // Menghitung jumlah foto pada baris terakhir.
      const firstIndexInRow = row * 4;
      const photosInRow = Math.min(
        4,
        pagePhotos.length - firstIndexInRow
      );

      // Membuat setiap baris berada di tengah.
      const rowWidth =
        photosInRow * photoWidth +
        (photosInRow - 1) * gapX;

      const rowStartX = (W - rowWidth) / 2;

      const x = rowStartX + col * (photoWidth + gapX);
      const y = startY + row * (photoHeight + gapY);

      drawPhoto(
        ctx,
        photo,
        x,
        y,
        photoWidth,
        photoHeight
      );

      // Nomor foto.
      text(
        ctx,
        String(i + index + 1).padStart(2, "0"),
        x + photoWidth,
        y + photoHeight - 8,
        "16px Arial",
        muted,
        "right"
      );
    });

 
    pages.push(canvas.toDataURL("image/jpeg", 0.92));
  }


  return pages;
}






function AudioPlayer({
  fileId,
  accessKey,
}: {
  fileId: string;
  accessKey: string;
}) {
  const [src, setSrc] = useState("");
  const [gagal, setGagal] = useState(false);
  const [pesanError, setPesanError] = useState("");
  

  useEffect(() => {
    let active = true;
    let objectUrl = "";

    setSrc("");
    setGagal(false);
    setPesanError("");

    getPhotoboothAudio(accessKey, fileId)
      .then(({ base64, mimeType }) => {
        if (!active) return;

        const bytes = Uint8Array.from(atob(base64), (c) =>
          c.charCodeAt(0)
        );

        const type = /^audio\//i.test(mimeType)
          ? mimeType
          : "audio/webm";

        objectUrl = URL.createObjectURL(
          new Blob([bytes], { type })
        );

        setSrc(objectUrl);
      })
      .catch((error) => {
        console.error("Audio gagal dimuat:", error);

        if (active) {
          setPesanError(
            error instanceof Error
              ? error.message
              : "Audio gagal dimuat."
          );
          setGagal(true);
        }
      });

    return () => {
      active = false;

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [fileId, accessKey]);

  if (gagal) {
    return (
      <div>
        <iframe
          src={`https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview`}
          title="Pesan suara"
          allow="autoplay"
          loading="lazy"
          className="h-20 w-full rounded-xl border-0"
        />
        {pesanError && (
          <p className="mt-1 text-xs text-[#858277]">
            Jika audio tidak bisa diputar, periksa akses file di Google Drive.
          </p>
        )}
      </div>
    );
  }

  if (!src) {
    return (
      <p className="text-sm text-[#858277]">
        Memuat audio...
      </p>
    );
  }

  return (
    <audio
      controls
      preload="metadata"
      src={src}
      className="block w-full"
      onError={() =>
        setPesanError(
          "Audio tidak dapat diputar. Periksa format file dan respons server."
        )
      }
    >
      Browser kamu tidak mendukung pemutar audio.
    </audio>
  );
}

export default function PhotoboothDashboard() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("key") || "";

  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Memory | null>(null);
  const [search, setSearch] = useState("");

  const [storyLoading, setStoryLoading] = useState(false);
  const [storyError, setStoryError] = useState("");
  const [sharing, setSharing] = useState(false);

  // State progres dan halaman kolase.
  const [storyProgress, setStoryProgress] = useState(0);
  const [storyTotal, setStoryTotal] = useState(0);
  const [collagePages, setCollagePages] = useState<string[]>([]);
  const [activeCollagePage, setActiveCollagePage] = useState(0);

  useEffect(() => {
    if (!key) {
      setError(
        "Link galeri tidak valid atau tidak memiliki kunci akses."
      );
      setLoading(false);
      return;
    }

    let active = true;

    async function loadGallery() {
      try {
        const rows = await getPhotoboothData(key);

        if (active) {
          setMemories(
            rows.map((row: Memory) => ({
              ...row,
              fotoUrl: row.fotoFileId
                ? driveUrl(row.fotoFileId)
                : "",
            }))
          );
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Terjadi kesalahan saat memuat galeri."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadGallery();

    return () => {
      active = false;
    };
  }, [key]);

  const filtered = useMemo(
    () =>
      memories.filter((item) =>
        `${item.nama} ${item.ucapan}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [memories, search]
  );

  const dateLabel = (value: string) => {
    if (!value) return "Tanggal tidak tersedia";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  };

  
  async function handleCreateStory() {
    if (!key) {
      setStoryError("Kunci akses galeri tidak ditemukan.");
      return;
    }

    setStoryLoading(true);
    setStoryError("");
    setCollagePages([]);
    setActiveCollagePage(0);
    setStoryProgress(0);

    const photoItems = memories.filter(
      (item) => item.fotoFileId
    );

    setStoryTotal(photoItems.length);

    try {
      const pages = await createStoryCollagePages(
        key,
        memories,
        (loaded, total) => {
          setStoryProgress(loaded);
          setStoryTotal(total);
        }
      );

      setCollagePages(pages);
      setActiveCollagePage(0);
    } catch (err) {
      console.error("Gagal membuat kolase:", err);

      setStoryError(
        err instanceof Error
          ? err.message
          : "Gagal membuat album wedding."
      );
    } finally {
      setStoryLoading(false);
    }
  }


  
  async function handleShareStory() {
    const currentPage = collagePages[activeCollagePage];

    if (!currentPage || sharing) return;

    setStoryError("");

    if (
      typeof navigator.share !== "function" ||
      typeof navigator.canShare !== "function"
    ) {
      setStoryError(
        "Browser ini belum mendukung berbagi gambar."
      );
      return;
    }

    setSharing(true);

    try {
      const response = await fetch(currentPage);

      if (!response.ok) {
        throw new Error("Gambar kolase gagal disiapkan.");
      }

      const blob = await response.blob();

      const file = new File(
        [blob],
        `wedding-memories-page-${activeCollagePage + 1}.jpg`,
        { type: "image/jpeg" }
      );

      if (!navigator.canShare({ files: [file] })) {
        setStoryError(
          "Perangkat atau browser ini tidak mendukung berbagi gambar."
        );
        return;
      }

      await navigator.share({
        files: [file],
        title: "The Wedding Journal",
        text: `Wedding Memories - Page ${activeCollagePage + 1}`,
      });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      console.error("Gagal membagikan kolase:", err);

      setStoryError(
        err instanceof Error
          ? err.message
          : "Gagal membuka menu berbagi."
      );
    } finally {
      setSharing(false);
    }
  }


  function handlePrintPhoto(photoUrl: string) {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Izinkan pop-up browser untuk mencetak foto.");
      return;
    }

    const style = printWindow.document.createElement("style");

    style.textContent = `
      @page {
        size: auto;
        margin: 0;
      }

      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100%;
        background: white;
      }

      body {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      img {
        display: block;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100vh;
        object-fit: contain;
      }

      @media print {
        body {
          width: 100%;
          height: 100%;
        }

        img {
          max-width: 100%;
          max-height: 100vh;
          page-break-inside: avoid;
        }
      }
    `;

    printWindow.document.head.appendChild(style);
    printWindow.document.title = "Cetak Foto Photobooth";

    const image = printWindow.document.createElement("img");
    image.src = photoUrl;
    image.alt = "Foto photobooth";

    image.onload = () => {
      printWindow.focus();
      printWindow.print();
    };

    image.onerror = () => {
      printWindow.close();
      alert("Foto tidak dapat dimuat untuk dicetak.");
    };

    printWindow.document.body.appendChild(image);
  }

  return (
    <main className="min-h-screen bg-[#F5F2EB] text-[#38382F]">
      <header className="border-b border-[#E8E2D7] bg-white/80 px-5 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[#858B76]">
              DEXA INVITATION
            </p>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl">
              Our Wedding Memories
            </h1>
          </div>

          <div className="rounded-full bg-[#E7EBDD] px-3 py-2 text-xs font-medium text-[#59634D]">
            Galeri privat
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:py-12">
        

        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center text-sm text-[#858277]">
            Memuat kenangan...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-[#E8D8D1] bg-white p-8 text-center">
            <p className="text-lg font-medium">
              Galeri belum bisa dibuka
            </p>
            <p className="mt-2 text-sm text-[#858277]">
              {error}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-5">
                <p className="text-sm text-[#858277]">
                  Total kenangan
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {memories.length}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5">
                <p className="text-sm text-[#858277]">
                  Pesan ucapan
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {
                    memories.filter((item) =>
                      item.ucapan?.trim()
                    ).length
                  }
                </p>
              </div>

              <div className="col-span-2 rounded-2xl bg-white p-5 sm:col-span-1">
                <p className="text-sm text-[#858277]">
                  Pesan suara
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {
                    memories.filter((item) => item.audioFileId)
                      .length
                  }
                </p>
              </div>
            </div>

            <div className="mb-6 flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-serif text-2xl">
                  Galeri foto
                </h3>

                <button
                  type="button"
                  onClick={handleCreateStory}
                  disabled={
                    storyLoading ||
                    !memories.some((item) => item.fotoFileId)
                  }
                  className="rounded-xl bg-[#788269] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#626D55] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {storyLoading
                    ? "Menyiapkan preview..."
                    : "Preview Semua Foto"}
                </button>
              </div>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama atau ucapan..."
                className="w-full rounded-xl border border-[#E5E0D6] bg-white px-4 py-3 text-sm outline-none focus:border-[#929A81] sm:max-w-xs"
              />
            </div>

            {storyError && (
              <div
                role="alert"
                className="mb-4 rounded-xl border border-[#E8D8D1] bg-white p-3 text-sm text-[#8B5145]"
              >
                {storyError}
              </div>
            )}

            {storyLoading && (
              <div className="mb-8 rounded-2xl bg-white p-6 sm:p-8">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="font-medium">
                    Menyiapkan preview...
                  </p>

                  <p className="whitespace-nowrap text-sm font-semibold tabular-nums text-[#788269]">
                    {storyProgress}/{storyTotal} foto
                  </p>
                </div>

                <div
                  className="h-2.5 w-full overflow-hidden rounded-full bg-[#EAE7DE]"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={storyTotal}
                  aria-valuenow={storyProgress}
                  aria-label="Progres menyiapkan foto"
                >
                  <div
                    className="h-full rounded-full bg-[#788269] transition-all duration-300"
                    style={{
                      width: `${
                        storyTotal > 0
                          ? (storyProgress / storyTotal) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-sm text-[#858277]">
                  {storyTotal === 0
                    ? "Memeriksa foto yang tersedia..."
                    : storyProgress === storyTotal
                      ? "Semua foto berhasil dimuat. Sedang menyusun kolase..."
                      : `Memuat foto ${storyProgress} dari ${storyTotal}. Mohon tunggu sebentar.`}
                </p>
              </div>
            )}

            
            {collagePages.length > 0 && (
              <div className="mb-8 rounded-2xl bg-white p-4 sm:p-6">

                {/* Header preview */}
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.2em] text-[#858B76]">
                      DEXA INVITATION
                    </p>

                    <h4 className="mt-1 font-serif text-xl">
                      The Wedding Journal
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCollagePages([]);
                      setActiveCollagePage(0);
                      setStoryError("");
                    }}
                    className="rounded-full bg-[#F1EFE8] px-3 py-2 text-sm"
                  >
                    Tutup ✕
                  </button>
                </div>

                {/* Nomor halaman */}
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-[#858277]">
                    Halaman {activeCollagePage + 1}
                  </p>

                  <p className="text-sm font-medium text-[#788269]">
                    {collagePages.length} halaman
                  </p>
                </div>

                {/* Gambar halaman aktif */}
                <div className="flex justify-center rounded-xl bg-[#F5F2EB] p-2">
                  <img
                    src={collagePages[activeCollagePage]}
                    alt={`Wedding Journal halaman ${activeCollagePage + 1}`}
                    className="max-h-[65vh] w-auto max-w-full object-contain"
                  />
                </div>

                {/* Navigasi halaman */}
                <div className="mt-5 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    disabled={activeCollagePage === 0}
                    onClick={() =>
                      setActiveCollagePage((page) => page - 1)
                    }
                    className="rounded-full border border-[#E5E0D6] px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ← Previous
                  </button>

                  <span className="min-w-[55px] text-center text-sm text-[#858277]">
                    {activeCollagePage + 1} / {collagePages.length}
                  </span>

                  <button
                    type="button"
                    disabled={
                      activeCollagePage === collagePages.length - 1
                    }
                    onClick={() =>
                      setActiveCollagePage((page) => page + 1)
                    }
                    className="rounded-full border border-[#E5E0D6] px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Next →
                  </button>
                </div>

                {/* Bagikan halaman aktif */}
                <button
                  type="button"
                  onClick={handleShareStory}
                  disabled={sharing}
                  className="mt-5 w-full rounded-xl bg-[#788269] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#626D55] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sharing
                    ? "Menyiapkan berbagi..."
                    : `Bagikan Halaman ${activeCollagePage + 1}`}
                </button>

              </div>
            )}


            {filtered.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center text-sm text-[#858277]">
                {memories.length
                  ? "Tidak ada kenangan yang cocok."
                  : "Belum ada foto dari tamu."}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((item, index) => (
                  <button
                    key={`${item.fotoFileId}-${index}`}
                    type="button"
                    onClick={() => setSelected(item)}
                    className="overflow-hidden rounded-2xl bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    {item.fotoUrl ? (
                      <img
                        src={item.fotoUrl}
                        alt={`Foto ${item.nama}`}
                        referrerPolicy="no-referrer"
                        className="aspect-[4/5] w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-[4/5] items-center justify-center bg-[#EAE7DE] text-sm text-[#858277]">
                        Foto tidak tersedia
                      </div>
                    )}

                    <div className="p-3">
                      <p className="truncate font-medium">
                        {item.nama || "Tamu"}
                      </p>

                      <p className="mt-1 text-xs text-[#8B887E]">
                        {dateLabel(item.date)}
                      </p>

                      {item.audioFileId && (
                        <p className="mt-2 text-xs text-[#69765C]">
                          ♫ Pesan suara
                        </p>
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
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-serif text-2xl">
                  {selected.nama || "Tamu"}
                </p>
                <p className="mt-1 text-xs text-[#858277]">
                  {dateLabel(selected.date)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full bg-[#F1EFE8] px-3 py-2 text-sm"
              >
                Tutup ✕
              </button>
            </div>

            {selected.fotoUrl && (
              <div className="mx-auto flex max-h-[60vh] w-full items-center justify-center overflow-hidden">
                <img
                  src={selected.fotoUrl}
                  alt={`Foto dari ${selected.nama}`}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] w-auto max-w-full object-contain"
                  onError={(e) =>
                    console.error(
                      "Foto gagal dimuat:",
                      e.currentTarget.src
                    )
                  }
                />
              </div>
            )}

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#858B76]">
                Ucapan
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6">
                {selected.ucapan || "Tamu tidak menambahkan ucapan."}
              </p>
            </div>

            {selected.audioFileId && (
              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#858B76]">
                  Pesan suara
                </p>

                <AudioPlayer
                  key={selected.audioFileId}
                  fileId={selected.audioFileId}
                  accessKey={key}
                />
              </div>
            )}

            {selected.fotoUrl && (
              <>
                <a
                  href={selected.fotoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 block rounded-xl bg-[#788269] px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Buka / simpan foto
                </a>

                <button
                  type="button"
                  onClick={() => handlePrintPhoto(selected.fotoUrl!)}
                  className="mt-3 block w-full rounded-xl border border-[#E5E0D6] px-4 py-3 text-center text-sm font-medium text-[#38382F]"
                >
                  Print Foto
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
