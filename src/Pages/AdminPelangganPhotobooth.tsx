import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { APPS_SCRIPT_URL } from "../Services/PhotoboothService";

type EventResult = {
  idUndangan: string;
  folderId: string;
  accessKeyHash: string;
  dashboardSlug: string;
};

type GuestResult = {
  slug: string;
  url: string;
  qrUrl: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  events?: EventResult[];
  slugs?: string[];
};

type AdminPelangganProps = {
  dashboardBaseUrl: string;
  guestBaseUrl: string;
};

async function postApi(
  values: Record<string, string>
): Promise<ApiResponse> {
  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    body: new URLSearchParams(values),
  });

  const raw = await response.text();

  let data: ApiResponse;

  try {
    data = JSON.parse(raw) as ApiResponse;
  } catch {
    throw new Error(
      "Respons Apps Script bukan JSON. Periksa URL dan deployment Web App."
    );
  }

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Permintaan ke server gagal.");
  }

  return data;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Gagal memuat gambar: ${src}`));
    image.src = src;
  });
}

// Membuat QR PNG dengan area putih diubah menjadi transparan.
async function makeQrUrl(url: string): Promise<string> {
  const qrDataUrl = await QRCode.toDataURL(url, {
    width: 600,
    margin: 4,
    errorCorrectionLevel: "H",
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });

  const image = await loadImage(qrDataUrl);
  const canvas = document.createElement("canvas");

  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Browser tidak mendukung pembuatan gambar QR.");
  }

  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];

    if (r > 240 && g > 240 && b > 240) {
      imageData.data[i + 3] = 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL("image/png");
}

// Menggabungkan QR, logo, domain, dan nomor menjadi satu PNG.
async function makeQrArtwork(guest: GuestResult, number: number) {
  const qrImage = await loadImage(guest.qrUrl);
  const logo = await loadImage("/logo-dio.webp");

  const canvas = document.createElement("canvas");

  canvas.width = 900;
  canvas.height = 710;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Gagal menyiapkan gambar QR.");
  }

  // Background tetap transparan.
  const qrSize = 600;
  const qrX = (canvas.width - qrSize) / 2;

  ctx.drawImage(qrImage, qrX, 0, qrSize, qrSize);

  // Logo di tengah QR.
  const logoSize = 105;

  ctx.drawImage(
    logo,
    (canvas.width - logoSize) / 2,
    (qrSize - logoSize) / 2,
    logoSize,
    logoSize
  );

  // Domain di bawah QR.
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.font = "500 24px Arial, sans-serif";
  ctx.fillText("dexa-invitation.com", canvas.width / 2, 650);

  // Nomor sangat kecil di bawah domain.
  ctx.font = "8px Arial, sans-serif";
  ctx.fillText(String(number), canvas.width / 2, 680);

  return canvas.toDataURL("image/png");
}

function safeFileName(value: string) {
  return value.replace(/[^a-z0-9-_]/gi, "-") || "tamu";
}

export default function AdminPelangganPhotobooth({
  dashboardBaseUrl,
  guestBaseUrl,
}: AdminPelangganProps) {
  const [adminKey, setAdminKey] = useState("");
  const [events, setEvents] = useState<EventResult[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [jumlahTamu, setJumlahTamu] = useState(100);

  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [copyNotice, setCopyNotice] = useState("");
  const [guests, setGuests] = useState<GuestResult[]>([]);

  const selectedEvent = useMemo(
    () => events.find((item) => item.idUndangan === selectedId) || null,
    [events, selectedId]
  );

  const dashboardUrl = useMemo(() => {
    if (!selectedEvent) return "";

    const url = new URL(dashboardBaseUrl, window.location.origin);
    url.searchParams.set("key", selectedEvent.accessKeyHash);

    return url.toString();
  }, [selectedEvent, dashboardBaseUrl]);

  useEffect(() => {
    setEvents([]);
    setSelectedId("");
    setGuests([]);
    setNotice("");
    setError("");
  }, [adminKey]);

  async function loadEvents() {
    if (!adminKey.trim()) {
      setError("Masukkan kunci Admin terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError("");
    setNotice("");
    setCopyNotice("");
    setGuests([]);

    try {
      const data = await postApi({
        aksi: "admin-daftar-acara",
        adminKey: adminKey.trim(),
      });

      const rows = data.events || [];

      // Hilangkan pelanggan duplikat berdasarkan idUndangan
      const uniqueRows = Array.from(
        new Map(
          rows.map((item) => [item.idUndangan.trim(), item])
        ).values()
      );

      setEvents(uniqueRows);

      if (rows.length === 0) {
        setSelectedId("");
        setNotice(
          "Belum ada pelanggan di Events. Tambahkan pelanggan terlebih dahulu di Google Sheets."
        );
      } else {
        setSelectedId((current) =>
          rows.some((item) => item.idUndangan === current)
            ? current
            : rows[0].idUndangan
        );

        setNotice(
          `${rows.length} pelanggan berhasil dimuat dari Events.`
        );
      }
    } catch (err) {
      setEvents([]);
      setSelectedId("");
      setError(
        err instanceof Error ? err.message : "Gagal memuat pelanggan."
      );
    } finally {
      setLoading(false);
    }
  }

  async function createGuests(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setNotice("");
    setCopyNotice("");
    setGuests([]);

    if (!adminKey.trim()) {
      setError("Masukkan kunci Admin.");
      return;
    }

    if (!selectedEvent) {
      setError("Pilih pelanggan terlebih dahulu.");
      return;
    }

    if (
      !Number.isInteger(jumlahTamu) ||
      jumlahTamu < 1 ||
      jumlahTamu > 500
    ) {
      setError("Jumlah QR harus antara 1 sampai 500.");
      return;
    }

    setGuestLoading(true);

    try {
      const data = await postApi({
        aksi: "admin-buat-qr-tamu",
        adminKey: adminKey.trim(),
        idUndangan: selectedEvent.idUndangan,
        jumlahSlug: String(jumlahTamu),
      });

      const rows: GuestResult[] = await Promise.all(
        (data.slugs || []).map(async (slug) => {
          const url = new URL(
            guestBaseUrl,
            window.location.origin
          );

          url.searchParams.set("slug", slug);
          url.searchParams.set(
            "idUndangan",
            selectedEvent.idUndangan
          );

          const guestUrl = url.toString();

          return {
            slug,
            url: guestUrl,
            qrUrl: await makeQrUrl(guestUrl),
          };
        })
      );

      if (rows.length === 0) {
        throw new Error("Server tidak mengembalikan slug QR.");
      }

      setGuests(rows);
      setNotice(
        `${rows.length} QR berhasil dibuat untuk ${selectedEvent.idUndangan}.`
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal membuat QR tamu."
      );
    } finally {
      setGuestLoading(false);
    }
  }

  async function copyText(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyNotice(`${label} berhasil disalin.`);
    } catch {
      setCopyNotice(
        "Gagal menyalin otomatis. Salin URL secara manual."
      );
    }
  }

  async function downloadQr(
    guest: GuestResult,
    index: number
  ) {
    try {
      const artwork = await makeQrArtwork(guest, index + 1);
      const link = document.createElement("a");

      link.href = artwork;
      link.download = `QR-${safeFileName(
        selectedEvent?.idUndangan || ""
      )}-${index + 1}.png`;

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengunduh gambar QR."
      );
    }
  }

  async function downloadAllQr() {
    if (guests.length === 0) return;

    setError("");
    setNotice("Sedang menyiapkan gambar QR...");

    try {
      // Unduh satu per satu agar penggunaan memori lebih terkendali.
      for (let i = 0; i < guests.length; i++) {
        const artwork = await makeQrArtwork(guests[i], i + 1);
        const link = document.createElement("a");

        link.href = artwork;
        link.download = `QR-${safeFileName(
          selectedEvent?.idUndangan || ""
        )}-${i + 1}.png`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        // Beri kesempatan browser memproses setiap unduhan.
        await new Promise<void>((resolve) =>
          window.setTimeout(resolve, 150)
        );
      }

      setNotice(
        `${guests.length} gambar QR selesai disiapkan. Browser mungkin meminta izin untuk beberapa unduhan.`
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal menyiapkan unduhan QR."
      );
    }
  }

  function downloadAllLinks() {
    const content = guests
      .map(
        (guest, index) =>
          `Tamu ${index + 1}\nSlug: ${guest.slug}\nURL: ${guest.url}`
      )
      .join("\n\n");

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = `Daftar-QR-${safeFileName(
      selectedEvent?.idUndangan || ""
    )}.txt`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(objectUrl);
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-4 py-8 text-[#39362F] sm:px-8">
      <style>{`
        @media print {
          @page {
            margin: 8mm;
          }

          body {
            background: transparent !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          body * {
            visibility: hidden !important;
          }

          #qr-print-area,
          #qr-print-area * {
            visibility: visible !important;
          }

          #qr-print-area {
            position: absolute !important;
            inset: 0 auto auto 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
          }

          #qr-print-area .qr-print-header,
          #qr-print-area .qr-admin-controls,
          #qr-print-area .qr-url-input {
            display: none !important;
          }

          #qr-print-area .qr-print-grid {
            display: grid !important;
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 4mm !important;
            margin: 0 !important;
          }

          #qr-print-area .qr-print-card {
            min-width: 0 !important;
            padding: 2mm !important;
            border: none !important;
            border-radius: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          #qr-print-area .qr-artwork {
            width: 100% !important;
            max-width: none !important;
            margin: 0 auto !important;
          }

          #qr-print-area .qr-image-wrap {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 1 / 1 !important;
          }

          #qr-print-area .qr-image-wrap > img:first-child {
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important;
          }

          #qr-print-area .qr-logo {
            background: transparent !important;
            padding: 0 !important;
            border-radius: 0 !important;
          }

          #qr-print-area .qr-domain {
            margin-top: 1.5mm !important;
            font-size: 7pt !important;
            color: #000 !important;
          }

          #qr-print-area .qr-number {
            margin-top: 1mm !important;
            font-size: 4pt !important;
            line-height: 1 !important;
            color: #000 !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#788269]">
            Dexa Photobooth
          </p>

          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
            Admin QR Tamu
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-[#858277]">
            Pilih pelanggan dari sheet Events untuk membuat QR tamu.
            Data pelanggan dan folder tidak dibuat ulang.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <form
            onSubmit={createGuests}
            className="h-fit rounded-2xl border border-[#E9E4DA] bg-white p-5 shadow-sm sm:p-6"
          >
            <h2 className="font-serif text-2xl">Buat QR tamu</h2>

            <label
              className="mt-5 block text-sm font-medium"
              htmlFor="admin-key"
            >
              Kunci Admin
            </label>

            <input
              id="admin-key"
              type="password"
              autoComplete="current-password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#E5E0D6] px-4 py-3 text-sm outline-none focus:border-[#929A81]"
              placeholder="Masukkan ADMIN_KEY"
              required
            />

            <button
              type="button"
              onClick={() => void loadEvents()}
              disabled={loading || guestLoading}
              className="mt-3 w-full rounded-xl border border-[#E5E0D6] px-4 py-3 text-sm font-semibold disabled:opacity-50"
            >
              {loading
                ? "Memuat pelanggan..."
                : "Muat / Segarkan Pelanggan"}
            </button>

            <label
              className="mt-5 block text-sm font-medium"
              htmlFor="pilih-acara"
            >
              Pilih pelanggan
            </label>

            <select
              id="pilih-acara"
              value={selectedId}
              onChange={(e) => {
                setSelectedId(e.target.value);
                setGuests([]);
                setNotice("");
                setError("");
              }}
              className="mt-2 w-full rounded-xl border border-[#E5E0D6] bg-white px-4 py-3 text-sm outline-none focus:border-[#929A81]"
              disabled={events.length === 0 || guestLoading}
              required
            >
              {events.length === 0 && (
                <option value="">
                  Muat daftar pelanggan dahulu
                </option>
              )}

              {events.map((item) => (
                <option
                  key={item.idUndangan}
                  value={item.idUndangan}
                >
                  {item.idUndangan}
                </option>
              ))}
            </select>

            <label
              className="mt-4 block text-sm font-medium"
              htmlFor="jumlah-tamu"
            >
              Jumlah QR tamu (1–500)
            </label>

            <input
              id="jumlah-tamu"
              type="number"
              min={1}
              max={500}
              value={jumlahTamu}
              onChange={(e) =>
                setJumlahTamu(
                  e.target.value === "" ? 0 : Number(e.target.value)
                )
              }
              className="mt-2 w-full rounded-xl border border-[#E5E0D6] px-4 py-3 text-sm outline-none focus:border-[#929A81]"
              required
            />

            <button
              type="submit"
              disabled={!selectedEvent || guestLoading || loading}
              className="mt-5 w-full rounded-xl bg-[#788269] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#626D55] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {guestLoading ? "Membuat QR..." : "Buat QR Tamu"}
            </button>

            <p className="mt-3 text-xs leading-5 text-[#858277]">
              QR yang dibuat akan tercatat di sheet Guests dan
              terhubung ke pelanggan yang dipilih.
            </p>
          </form>

          <div className="space-y-6">
            {(error || notice) && (
              <div
                className={`rounded-xl border p-4 text-sm ${
                  error
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-[#DDE3D4] bg-[#F0F3EB] text-[#59634D]"
                }`}
                role={error ? "alert" : "status"}
              >
                {error || notice}
              </div>
            )}

            {selectedEvent && (
              <section className="rounded-2xl border border-[#E9E4DA] bg-white p-5 shadow-sm sm:p-6">
                <p className="text-xs uppercase tracking-wider text-[#858277]">
                  Pelanggan terpilih
                </p>

                <h2 className="mt-1 break-words font-serif text-2xl">
                  {selectedEvent.idUndangan}
                </h2>

                <div className="mt-5">
                  <p className="text-xs text-[#858277]">
                    Dashboard URL
                  </p>

                  <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                    <input
                      readOnly
                      value={dashboardUrl}
                      className="min-w-0 flex-1 rounded-lg border border-[#E5E0D6] bg-[#FAF9F6] px-3 py-2 text-xs"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        void copyText(dashboardUrl, "URL dashboard")
                      }
                      className="rounded-lg border border-[#E5E0D6] px-3 py-2 text-xs font-medium"
                    >
                      Salin URL
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-[#858277]">
                    Dashboard slug
                  </p>

                  <p className="mt-1 break-all font-mono text-xs">
                    {selectedEvent.dashboardSlug || "(belum tersedia)"}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-[#858277]">
                    Folder Drive
                  </p>

                  {selectedEvent.folderId ? (
                    <a
                      className="mt-1 inline-block break-all text-sm text-[#626D55] underline"
                      href={`https://drive.google.com/drive/folders/${encodeURIComponent(
                        selectedEvent.folderId
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Buka folder Drive
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-red-600">
                      Folder ID belum tersedia.
                    </p>
                  )}
                </div>
              </section>
            )}

            {copyNotice && (
              <p className="text-sm text-[#59634D]" role="status">
                {copyNotice}
              </p>
            )}
          </div>
        </section>

        {guests.length > 0 && (
          <section
            id="qr-print-area"
            className="mt-8 rounded-2xl border border-[#E9E4DA] bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="qr-print-header flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-serif text-2xl">QR tamu</h2>

                <p className="mt-1 text-sm text-[#858277]">
                  {guests.length} QR untuk {selectedEvent?.idUndangan}.
                </p>
              </div>

              <div className="qr-admin-controls flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={downloadAllLinks}
                  className="rounded-xl border border-[#E5E0D6] px-4 py-2.5 text-sm font-medium"
                >
                  Unduh daftar URL (.txt)
                </button>

                <button
                  type="button"
                  onClick={() => void downloadAllQr()}
                  className="rounded-xl border border-[#E5E0D6] px-4 py-2.5 text-sm font-medium"
                >
                  Unduh semua QR (.png)
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="rounded-xl bg-[#788269] px-4 py-2.5 text-sm font-medium text-white"
                >
                  Cetak QR
                </button>
              </div>
            </div>

            <div className="qr-print-grid mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {guests.map((guest, index) => (
                <article
                  key={guest.slug}
                  className="qr-print-card rounded-xl border border-[#E9E4DA] p-4"
                >
                  <div className="qr-artwork mx-auto mt-3 w-full max-w-[190px] text-center">
                      <p className="qr-domain mt-2 text-sm font-medium tracking-wide text-black uppercase">
                        Photobooth virtual
                      </p>
                    <div
                      className="qr-image-wrap"
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "1 / 1",
                      }}>
                      <img
                        src={guest.qrUrl}
                        alt={`QR ${index + 1}`}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />

                      <img
                        src="/logo-dio.webp"
                        alt="Logo Dexa Invitation"
                        className="qr-logo"
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          width: "18%",
                          height: "18%",
                          transform: "translate(-50%, -50%)",
                          objectFit: "contain",
                          display: "block",
                          maxWidth: "none",
                        }}
                      />
                    </div>

                    <p className="qr-domain mt-2 text-[11px] font-medium tracking-wide text-black">
                      dexa-invitation.com
                    </p>

                    <p className="qr-number mt-1 text-[5px] leading-none text-black">
                      {index + 1}
                    </p>
                  </div>

                  <input
                    readOnly
                    value={guest.url}
                    aria-label={`URL tamu ${index + 1}`}
                    className="qr-url-input mt-3 w-full rounded-lg border border-[#E5E0D6] bg-[#FAF9F6] px-2 py-2 text-[11px]"
                  />

                  <div className="qr-admin-controls mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        void copyText(
                          guest.url,
                          `URL tamu ${index + 1}`
                        )
                      }
                      className="rounded-lg border border-[#E5E0D6] px-2 py-2 text-xs"
                    >
                      Salin URL
                    </button>

                    <button
                      type="button"
                      onClick={() => void downloadQr(guest, index)}
                      className="rounded-lg bg-[#788269] px-2 py-2 text-xs font-medium text-white"
                    >
                      Unduh QR
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
