
type Filter = "Original" | "Warm" | "Soft" | "B&W";

interface PhotoboothFormSectionProps {
  nama: string;
  setNama: (value: string) => void;
  ucapan: string;
  setUcapan: (value: string) => void;
  filter: Filter;
  setFilter: (value: Filter) => void;
  filters: Record<Filter, string>;
  notice: string;
  noticeError: boolean;
  busy: boolean;
  recording: boolean;
  cameraOpen: boolean;
  photos: string[];
  downloadPhoto: () => void | Promise<void>;
  submit: () => void | Promise<void>;
  children?: React.ReactNode;
}

export default function PhotoboothFormSection({
  nama,
  setNama,
  ucapan,
  setUcapan,
  filter,
  setFilter,
  filters,
  notice,
  noticeError,
  busy,
  recording,
  cameraOpen,
  photos,
  downloadPhoto,
  submit,
  children,
}: PhotoboothFormSectionProps) {
  return (
    <section className="space-y-5 rounded-3xl border border-[#e8e2d7] bg-white p-5 shadow-sm sm:p-6">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Nama kamu
        </label>
        <input
          value={nama}
          onChange={(event) => setNama(event.target.value)}
          placeholder="Masukkan nama"
          maxLength={35}
          className="w-full rounded-xl border border-[#e3ddd2] px-4 py-3 text-sm outline-none focus:border-[#9a927f]"
        />
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Filter foto</p>
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(filters) as Filter[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-xl border px-2 py-3 text-xs ${
                filter === item
                  ? "border-[#39362f] bg-[#39362f] text-white"
                  : "border-[#e3ddd2]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Ucapan untuk mempelai
        </label>
        <textarea
          value={ucapan}
          onChange={(event) => setUcapan(event.target.value)}
          placeholder="Tulis doa dan ucapan terbaikmu..."
          rows={3}
          maxLength={500}
          className="w-full resize-y rounded-xl border border-[#e3ddd2] px-4 py-3 text-sm outline-none focus:border-[#9a927f]"
        />
      </div>

      {/* Bagian pesan suara dari AudioSection */}
      {children}

      {notice && (
        <p
          role="status"
          className={`text-sm ${
            noticeError ? "text-red-600" : "text-green-700"
          }`}
        >
          {notice}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => void downloadPhoto()}
          disabled={photos.some((item) => !item) || busy || cameraOpen}
          className="rounded-xl border border-[#d9d2c5] px-3 py-3 text-sm font-medium disabled:opacity-40"
        >
          Unduh Foto
        </button>

        <button
          type="button"
          onClick={() => void submit()}
          disabled={
            busy ||
            recording ||
            cameraOpen ||
            photos.some((item) => !item)
          }
          className="rounded-xl bg-[#39362f] px-3 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {busy ? "Mengirim..." : "Kirim"}
        </button>
      </div>
    </section>
  );
}
