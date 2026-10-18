
import { type RefObject } from "react";

interface PhotoboothSectionProps {
  sectionRef: RefObject<HTMLElement | null>;
  namaPengantin: string;

  photos: string[];
  activeShot: number;
  setActiveShot: (index: number) => void;
  cameraOpen: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
  filterStyle: string;

  frameSrc: string;
  singleFrameSrc: string;
  frameWidth: number;
  frameHeight: number;

  photoSlots: readonly {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];

  photoMode: 1 | 3;
  setPhotoMode: (mode: 1 | 3) => void;

  fileRef: RefObject<HTMLInputElement | null>;
  choosePhoto: (file?: File) => void | Promise<void>;
  cameraError: string;
  busy: boolean;
  showFloatingActions: boolean;
  capturePhoto: () => void | Promise<void>;
  closeCamera: () => void;
  openCamera: () => void | Promise<void>;
  resetPhotos: () => void;
}

export default function PhotoboothSection({
  sectionRef,
  namaPengantin,
  photos,
  activeShot,
  setActiveShot,
  cameraOpen,
  videoRef,
  filterStyle,
  frameSrc,
  singleFrameSrc,
  frameWidth,
  frameHeight,
  photoSlots,
  photoMode,
  setPhotoMode,
  fileRef,
  choosePhoto,
  cameraError,
  busy,
  showFloatingActions,
  capturePhoto,
  closeCamera,
  openCamera,
  resetPhotos,
}: PhotoboothSectionProps) {
  const visibleSlots = photoSlots.slice(0, photoMode);
  const filledPhotos = photos
    .slice(0, photoMode)
    .filter(Boolean).length;


  return (
    <section
      ref={sectionRef}
      className="rounded-3xl border border-[#e8e2d7] bg-white p-4 shadow-sm sm:p-6"
    >
      {/* Pilihan mode */}
      <div className="mx-auto mb-5 grid w-full max-w-sm grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            resetPhotos();
            setPhotoMode(3);
            setActiveShot(0);
          }}
          disabled={busy || cameraOpen}
          className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
            photoMode === 3
              ? "border-[#39362f] bg-[#39362f] text-white"
              : "border-[#e3ddd2] bg-white text-[#777368]"
          } disabled:opacity-50`}
        >
          3 Foto
        </button>

        <button
          type="button"
          onClick={() => {
            setPhotoMode(1);
            setActiveShot(0);
            resetPhotos();
          }}
          disabled={busy || cameraOpen}
          className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
            photoMode === 1
              ? "border-[#39362f] bg-[#39362f] text-white"
              : "border-[#e3ddd2] bg-white text-[#777368]"
          } disabled:opacity-50`}
        >
          1 Foto
        </button>
      </div>

      {/* Preview foto */}
      <div className="mx-auto w-full max-w-sm">
        <div
          className="relative isolate w-full overflow-hidden bg-[#f5f2ec]"
          style={{
            aspectRatio: `${frameWidth} / ${frameHeight}`,
          }}
        >
          {photoMode === 1 ? (
            <>
              {/* MODE 1 FOTO: satu foto memenuhi seluruh area */}
              {cameraOpen ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute top-5 z-0 h-[90%] w-full scale-x-[-1] object-cover"
                  style={{ filter: filterStyle }}
                />
              ) : photos[0] ? (
                <img
                  src={photos[0]}
                  alt="Foto"
                  className="absolute inset-0 z-0 h-full w-full object-cover"
                  style={{ filter: filterStyle }}
                />
              ) : (
                <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-[#f7f5f0] text-[#8b887c]">
                  <span className="text-3xl">1</span>
                  <span className="mt-1 text-xs">
                    Foto Anda
                  </span>
                </div>
              )}

              {/* Frame khusus mode 1 foto */}
              <img
                src={singleFrameSrc}
                alt="Frame wedding satu foto"
                className="pointer-events-none absolute inset-0 z-10 h-full w-full object-fill"
              />

              {/* Nama pengantin */}
              <div className="pointer-events-none absolute bottom-[8%] left-1/2 z-20 w-[80%] -translate-x-1/2 px-3 text-center">
                <p className="mb-1 font-TypographiTimes text-[8px] uppercase tracking-[.3em]">
                  The Wedding Of
                </p>
                <p className="font-Tempting text-3xl">
                  {namaPengantin}
                </p>
              </div>
            </>
          ) : (
            <>
              {/* MODE 3 FOTO: slot lama tetap digunakan */}
              {visibleSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveShot(index)}
                  aria-label={`Pilih kotak foto ${index + 1}`}
                  className={`absolute z-0 overflow-hidden ${
                    activeShot === index
                      ? "ring-2 ring-inset ring-[#9b8052]"
                      : ""
                  }`}
                  style={{
                    left: `${(slot.x / frameWidth) * 100}%`,
                    top: `${(slot.y / frameHeight) * 100}%`,
                    width: `${(slot.width / frameWidth) * 100}%`,
                    height: `${(slot.height / frameHeight) * 100}%`,
                  }}
                >
                  {cameraOpen && activeShot === index ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="h-full w-full scale-x-[-1] object-cover"
                      style={{ filter: filterStyle }}
                    />
                  ) : photos[index] ? (
                    <img
                      src={photos[index]}
                      alt={`Foto ${index + 1}`}
                      className="h-full w-full object-cover"
                      style={{ filter: filterStyle }}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[#f7f5f0] text-center text-[#8b887c]">
                      <span className="text-2xl">
                        {index + 1}
                      </span>
                      <span className="px-1 text-[10px] sm:text-xs">
                        Foto {index + 1}
                      </span>
                    </div>
                  )}
                </button>
              ))}

              <img
                src={frameSrc}
                alt="Frame wedding tiga foto"
                className="pointer-events-none absolute inset-0 z-10 h-full w-full"
              />

              <div className="pointer-events-none absolute bottom-[8%] left-1/2 z-20 w-[80%] -translate-x-1/2 px-3 text-center">
                <p className="mb-1 font-TypographiTimes text-[8px] uppercase tracking-[.3em]">
                  The Wedding Of
                </p>
                <p className="font-Tempting text-3xl">
                  {namaPengantin}
                </p>
              </div>
            </>
          )}
        </div>

        <p className="mt-3 text-center text-xs text-[#777368]">
          {filledPhotos}/{photoMode} foto terisi
          {photoMode === 3
            ? " · Klik kotak untuk memilih foto yang ingin diganti."
            : " · Foto memenuhi seluruh area frame."}
        </p>
      </div>

      {/* Input file */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          void choosePhoto(event.currentTarget.files?.[0]);
          event.currentTarget.value = "";
        }}
      />

      {cameraError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {cameraError}
        </p>
      )}

      <button
        type="button"
        onClick={resetPhotos}
        disabled={busy || cameraOpen}
        className="mt-3 w-full rounded-xl border border-[#e3ddd2] px-4 py-2 text-xs text-[#777368] disabled:opacity-40"
      >
        Ulangi dari Foto 1
      </button>

      {/* Tombol floating */}
      {showFloatingActions && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#e8e2d7] bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-3">
            {cameraOpen ? (
              <>
                <button
                  type="button"
                  onClick={() => void capturePhoto()}
                  className="rounded-xl bg-[#39362f] px-4 py-3 text-sm font-medium text-white"
                >
                  {photoMode === 1
                    ? "Jepret Foto"
                    : `Jepret Foto ${activeShot + 1}/3`}
                </button>

                <button
                  type="button"
                  onClick={closeCamera}
                  className="rounded-xl border border-[#d9d2c5] bg-white px-4 py-3 text-sm font-medium"
                >
                  Tutup Kamera
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => void openCamera()}
                  disabled={busy}
                  className="rounded-xl bg-[#39362f] px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
                >
                  Buka Kamera
                </button>

                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={busy}
                  className="rounded-xl border border-[#d9d2c5] bg-white px-4 py-3 text-sm font-medium disabled:opacity-50"
                >
                  Pilih Foto
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
