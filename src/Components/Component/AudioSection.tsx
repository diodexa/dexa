
interface AudioSectionProps {
  audio: string;
  recording: boolean;
  seconds: number;
  audioLevel: number;
  busy: boolean;
  startRecording: () => void | Promise<void>;
  stopRecording: () => void;
  onDeleteAudio: () => void;
}

export default function AudioSection({
  audio,
  recording,
  seconds,
  audioLevel,
  busy,
  startRecording,
  stopRecording,
  onDeleteAudio,
}: AudioSectionProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">Pesan suara</p>

      <div className="rounded-2xl border border-[#e8e2d7] bg-[#faf8f4] p-4">
        <div className="mb-4 flex items-center justify-between gap-2">
          <span className="text-xs text-[#777368]">
            {recording
              ? "Sedang merekam suara"
              : audio
                ? "Rekaman siap diputar"
                : "Rekam pesan untuk mempelai"}
          </span>

          {recording && (
            <span className="flex items-center gap-2 text-xs font-semibold text-red-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              REC
            </span>
          )}
        </div>

        <div className="flex h-16 items-center justify-center gap-1 overflow-hidden rounded-xl bg-white px-3">
          {Array.from({ length: 36 }, (_, i) => {
            const wave = Math.abs(Math.sin(i * 1.7 + audioLevel / 10));

            const height = recording
              ? 5 + wave * (8 + audioLevel * 0.45)
              : audio
                ? 8 + Math.abs(Math.sin(i * 1.7)) * 18
                : 4;

            return (
              <span
                key={i}
                className="w-1 rounded-full transition-all duration-100"
                style={{
                  height: `${height}px`,
                  backgroundColor: recording ? "#af4364" : "#9a927f",
                  opacity: recording ? 0.5 + audioLevel / 200 : 0.8,
                }}
              />
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 text-xs text-[#777368]">
          <span>
            {recording
              ? audioLevel > 3
                ? "Suara terdeteksi"
                : "Bicaralah dengan jelas..."
              : audio
                ? "Putar untuk mendengarkan"
                : "Maksimal 60 detik · 2 MB"}
          </span>

          <span className="shrink-0 font-medium tabular-nums">
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:
            {String(seconds % 60).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {!recording ? (
            <button
              type="button"
              onClick={() => void startRecording()}
              disabled={busy}
              className="rounded-full bg-[#39362f] px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
            >
              {audio ? "↻ Rekam Ulang" : "● Mulai Rekam"}
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="rounded-full bg-red-100 px-5 py-3 text-sm font-medium text-red-700"
            >
              ■ Berhenti
            </button>
          )}

          {audio && !recording && (
            <button
              type="button"
              disabled={busy}
              onClick={onDeleteAudio}
              className="rounded-full border border-[#e3ddd2] px-4 py-3 text-sm disabled:opacity-50"
            >
              Hapus
            </button>
          )}
        </div>

        {audio && !recording && (
          <audio
            key={audio.slice(0, 80)}
            className="mt-4 w-full"
            controls
            preload="metadata"
            src={audio}
          >
            Browser tidak mendukung pemutar audio.
          </audio>
        )}
      </div>
    </div>
  );
}
