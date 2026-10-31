import { type RefObject } from "react";
import { Photobooths } from "../../Data/Photobooth";

export type FrameMode = "none" | "single" | "triple";

interface PhotoSlot {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PhotoboothSectionProps {
  idUndangan: string;
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
  photoSlots: readonly PhotoSlot[];

  fileRef: RefObject<HTMLInputElement | null>;
  choosePhoto: (file?: File) => void;

  cameraError: string;
  busy: boolean;
  showFloatingActions: boolean;

  capturePhoto: () => void;
  closeCamera: () => void;
  openCamera: () => void;
  resetPhotos: () => void;

  frameMode: FrameMode;
  setFrameMode: (mode: FrameMode) => void;

  namaPengantin: string;
  sectionRef: RefObject<HTMLElement | null>;

  switchCamera: () => void;
  cameraFacing: "user" | "environment";
}

export default function PhotoboothSection({
  idUndangan,
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
  fileRef,
  choosePhoto,
  cameraError,
  busy,
  resetPhotos,
  frameMode,
  setFrameMode,
  namaPengantin,
  sectionRef,
  switchCamera,
  cameraFacing,
}: PhotoboothSectionProps) {
  const hasWeddingFrame = Boolean(frameSrc?.trim());
  const hasSingleFrame = Boolean(singleFrameSrc?.trim());
  const hasAnyFrame = hasWeddingFrame || hasSingleFrame;

  const effectiveMode: FrameMode = !hasAnyFrame
    ? "none"
    : frameMode === "single" && hasSingleFrame
      ? "single"
      : frameMode === "triple" && hasWeddingFrame
        ? "triple"
        : hasSingleFrame
          ? "single"
          : "triple";

  const isTriple = effectiveMode === "triple";
  const isSingle = effectiveMode === "single";
  const currentPhotoIndex = isTriple ? activeShot : 0;
  const currentPhoto = photos[currentPhotoIndex] || "";
  
  const selectedPhotobooth = Photobooths.find(
  (item) => item.idUndangan === idUndangan
);

  const photoTitle =
    namaPengantin?.trim() || "";

  return (
    <section
      ref={sectionRef}
      className="relative min-w-0 w-full overflow-visible"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>


          <h2 className="mt-1 text-xs text-left text-[#39362f]">
            Kirim foto dan doa terbaikmu 
          </h2>
        </div>

        <button
          type="button"
          onClick={resetPhotos}
          disabled={busy}
          className="shrink-0 rounded-full border border-[#d9d2c5] px-3 py-2 text-xs text-[#625e53] transition hover:bg-white disabled:opacity-50"
        >
          Reset Foto
        </button>
      </div>

      {hasSingleFrame && hasWeddingFrame && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setFrameMode("single");
              setActiveShot(0);
            }}
            disabled={busy || cameraOpen}
            className={`rounded-xl border px-4 py-3 text-sm transition ${
              effectiveMode === "single"
                ? "border-[#39362f] bg-[#39362f] text-white"
                : "border-[#d9d2c5] bg-white text-[#625e53] hover:bg-[#f9f7f2]"
            } disabled:opacity-50`}
          >
            1 Foto
          </button>

          <button
            type="button"
            onClick={() => {
              setFrameMode("triple");
              setActiveShot(0);
            }}
            disabled={busy || cameraOpen}
            className={`rounded-xl border px-4 py-3 text-sm transition ${
              effectiveMode === "triple"
                ? "border-[#39362f] bg-[#39362f] text-white"
                : "border-[#d9d2c5] bg-white text-[#625e53] hover:bg-[#f9f7f2]"
            } disabled:opacity-50`}
          >
            3 Foto
          </button>
        </div>
      )}

      {/* Pratinjau foto: ukuran dan rasio frame tetap. */}
      <div
        className="relative isolate w-full overflow-hidden rounded-sm"
        style={{
          aspectRatio: `${frameWidth} / ${frameHeight}`,
        }}
      >
        {/* Mode tanpa frame */}
        {effectiveMode === "none" && (
          <>
            {cameraOpen ? (
              <div className="absolute inset-0">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`absolute inset-0 z-0 h-full w-full object-cover ${cameraFacing === "user" ? "scale-x-[-1]" : ""}`}
                  style={{ filter: filterStyle }}
                />

                <button
                  type="button"
                  onClick={switchCamera}
                  className="absolute top-4 right-4 z-10 rounded-full border border-white/20 bg-black/20 p-2 text-sm text-white shadow backdrop-blur-md"
                >
                  <i className="fa-solid fa-camera-rotate text-xl" />
                </button>
              </div>
            ) : currentPhoto ? (
              <img
                src={currentPhoto}
                alt="Foto photobooth"
                className={`absolute inset-0 z-0 h-full w-full object-cover ${cameraFacing === "user" ? "" : "scale-x-[-1]"}`}
                style={{ filter: filterStyle }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70 text-[#8b887c]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M8 5l1.5-2h5L16 5" />
                  </svg>
                </div>

           
              </div>
            )}
          </>
        )}

        {/* Mode satu foto */}
        {effectiveMode === "single" && (
          <>
            {cameraOpen ? (
              <div className="absolute inset-0">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`absolute top-1/2 left-0 -translate-y-1/2 z-0 h-[80%] w-full object-cover ${cameraFacing === "user" ? "scale-x-[-1]" : ""}`}
                  style={{ filter: filterStyle }}
                />

                <button
                  type="button"
                  onClick={switchCamera}
                  className="absolute top-30 right-13 z-99 rounded-full border border-white/20 bg-black/20 p-2 text-sm text-white shadow backdrop-blur-md"
                >
                  <i className="fa-solid fa-camera-rotate text-xl" />
                </button>
              </div>
            ) : currentPhoto ? (
              <img
                src={currentPhoto}
                alt="Foto photobooth"
                className={`absolute top-1/2 left-0 -translate-y-1/2 z-0 h-[80%] w-full object-cover ${cameraFacing === "user" ? "" : "scale-x-[-1]"}`}
                style={{ filter: filterStyle }}
              />
            ) : (
              <div className="absolute inset-x-0 top-[2.3%] z-0 flex h-[90%] flex-col items-center justify-center gap-3 px-5 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70 text-[#8b887c]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M8 5l1.5-2h5L16 5" />
                  </svg>
                </div>

                <p className="text-sm font-medium text-[#625e53]">
                  Foto kamu akan tampil di sini
                </p>
              </div>
            )}

            <img
              src={singleFrameSrc}
              alt="Frame wedding satu foto"
              className="pointer-events-none absolute inset-0 z-10 h-full w-full object-fill"
            />

            {/* Teks pengantin di atas frame */}
            {photoTitle && (
              <div className="pointer-events-none absolute bottom-[6%] left-1/2 z-20 w-[90%] -translate-x-1/2 px-3 text-center text-[#39362f]">
                <p className="text-[clamp(8px,2.4vw,16px)]  uppercase tracking-[0.3em]">
                  {selectedPhotobooth?.JudulAcara}
                </p>

                <p className={`mt-2 font-${selectedPhotobooth?.Font} text-[clamp(20px,7vw,44px)] leading-tight`}>
                  {photoTitle}
                </p>
              </div>
            )}
          </>
        )}

        {/* Mode tiga foto */}
        {effectiveMode === "triple" && (
          <>
            {photoSlots.map((slot, index) => {
              const isActive = activeShot === index;

              return (
                <div
                  key={index}
                  className={`absolute z-0 overflow-hidden ${
                    isActive && cameraOpen
                      ? "ring-2 ring-inset ring-white"
                      : ""
                  }`}
                  style={{
                    left: `${(slot.x / frameWidth) * 100}%`,
                    top: `${(slot.y / frameHeight) * 100}%`,
                    width: `${(slot.width / frameWidth) * 100}%`,
                    height: `${(slot.height / frameHeight) * 100}%`,
                  }}
                >
                  {cameraOpen && isActive ? (
                    <div className="absolute inset-0">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`absolute inset-0 z-0 h-full w-full object-cover ${
                          cameraFacing === "user" ? "scale-x-[-1]" : ""
                        }`}
                        style={{ filter: filterStyle }}
                      />

                      <button
                        type="button"
                        onClick={switchCamera}
                        className="absolute top-4 right-10 z-10 rounded-full border border-white/20 bg-black/20 p-2 text-sm text-white shadow backdrop-blur-md"
                      >
                        <i className="fa-solid fa-camera-rotate text-xl" />
                      </button>
                    </div>
                  ) : photos[index] ? (
                    <img
                      src={photos[index]}
                      alt={`Foto ${index + 1}`}
                      className={`h-full w-full object-cover ${cameraFacing === "user" ? "" : "scale-x-[-1]"}`}
                      style={{ filter: filterStyle }}
                    />
                  ) : (
                    <>
                    </>
                  )}
                </div>
              );
            })}

            <img
              src={frameSrc}
              alt="Frame wedding tiga foto"
              className="pointer-events-none absolute inset-0 z-10 h-full w-full object-fill"
            />

            {/* Teks pengantin di atas frame */}
            {photoTitle && (
              <div className="pointer-events-none absolute bottom-[7%] left-1/2 z-20 w-[90%] -translate-x-1/2 px-3 text-center text-[#39362f]">
                <p className="text-[clamp(8px,2.4vw,16px)] uppercase tracking-[0.3em]">
                  {selectedPhotobooth?.JudulAcara}
                </p>

                <p className={`mt-2 font-${selectedPhotobooth?.Font} text-[clamp(20px,7vw,44px)] leading-tight  `}>
                  {photoTitle}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={busy}
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];

          if (file) {
            void choosePhoto(file);
          }

          event.currentTarget.value = "";
        }}
      />

      {cameraError && (
        <div
          role="alert"
          className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700"
        >
          {cameraError}
        </div>
      )}

     

      <p className="mt-3 text-center text-xs text-[#8b887c]">
        {isTriple
          ? `Foto ${activeShot + 1} dari 3`
          : isSingle
            ? "Mode satu foto"
            : "Mode satu foto tanpa frame"}
      </p>

      {namaPengantin && (
        <p className="sr-only">
          Photobooth untuk {namaPengantin}
        </p>
      )}
    </section>
  );
}
