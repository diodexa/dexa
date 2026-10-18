
import { useEffect, useRef, useState } from "react";
import { kirimPhotobooth } from "../Components/Services/PhotoboothService";
import { Photobooth } from "../Data/Photobooth/PhotoboothAccount";
import PhotoboothFormSection from "../Components/Component/PhotoboothFormSection";
import AudioSection from "../Components/Component/AudioSection";
import PhotoboothSection from "../Components/Component/PhotoboothSection";


type Filter = "Original" | "Warm" | "Soft" | "B&W";

const FILTERS: Record<Filter, string> = {
  Original: "none",
  Warm: "sepia(0.22) saturate(1.15)",
  Soft: "brightness(1.08) saturate(0.85)",
  "B&W": "grayscale(1)",
};

const WEDDING_FRAME_SRC = Photobooth.Frame;
const SINGLE_FRAME_SRC = Photobooth.FrameSingle;

const PHOTO_SLOTS = [
  { x: 70, y: 207, width: 700, height: 400 },
  { x: 70, y: 666, width: 700, height: 400 },
  { x: 70, y: 1115, width: 700, height: 400 },
] as const;

const FRAME_WIDTH = 830;
const FRAME_HEIGHT = 1894;
const MAX_BYTES = 2 * 1024 * 1024;

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  filter: string
) {
  const scale = Math.max(width / img.width, height / img.height);
  const cropWidth = width / scale;
  const cropHeight = height / scale;
  const sx = (img.width - cropWidth) / 2;
  const sy = (img.height - cropHeight) / 2;

  ctx.save();
  ctx.filter = filter;
  ctx.drawImage(
    img,
    sx,
    sy,
    cropWidth,
    cropHeight,
    x,
    y,
    width,
    height
  );
  ctx.restore();
}

function readFile(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Gagal membaca file."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Gagal memuat foto."));
    img.src = src;
  });
}

function drawTrackedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  tracking: number
) {
  const chars = [...text];
  const widths = chars.map((char) => ctx.measureText(char).width);

  const totalWidth =
    widths.reduce((sum, width) => sum + width, 0) +
    tracking * Math.max(0, chars.length - 1);

  let x = centerX - totalWidth / 2;

  chars.forEach((char, index) => {
    ctx.fillText(char, x, y);
    x += widths[index] + tracking;
  });
}

export default function GuestPhotobooth() {
  const [idUndangan] = useState("photoboth Andi-Siti");
  const slug =
    new URLSearchParams(window.location.search).get("slug") || "";

  const [nama, setNama] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [photos, setPhotos] = useState<string[]>(["", "", ""]);
  const [activeShot, setActiveShot] = useState(0);
  const [filter, setFilter] = useState<Filter>("Original");

  const [audio, setAudio] = useState("");
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);

  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [noticeError, setNoticeError] = useState(false);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [showFloatingActions, setShowFloatingActions] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const recordingRef = useRef(false);
  const photoboothSectionRef = useRef<HTMLElement | null>(null);

  const [photoMode, setPhotoMode] = useState<1 | 3>(3);

  const showNotice = (message: string, error = false) => {
    setNotice(message);
    setNoticeError(error);
  };

  // Tombol kamera dan pilih foto mengambang ketika bagian foto
  // sudah tidak terlihat di layar.
  useEffect(() => {
    const photoSection = photoboothSectionRef.current;
    if (!photoSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingActions(entry.intersectionRatio > 0.5);
      },
      {
        threshold: [0, 0.5, 1],
      }
    );

    observer.observe(photoSection);

    return () => observer.disconnect();
  }, []);

  function closeCamera() {
    cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    cameraStreamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOpen(false);
  }

  async function openCamera() {
    setCameraError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(
        "Browser tidak mendukung kamera. Gunakan HTTPS atau localhost."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 1600 },
        },
        audio: false,
      });

      cameraStreamRef.current = stream;
      setCameraOpen(true);
    } catch (error) {
      const err = error as DOMException;

      if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError"
      ) {
        setCameraError(
          "Izin kamera ditolak. Izinkan kamera melalui pengaturan situs di browser."
        );
      } else if (
        err.name === "NotFoundError" ||
        err.name === "DevicesNotFoundError"
      ) {
        setCameraError(
          "Kamera tidak ditemukan. Periksa kamera perangkat kamu."
        );
      } else if (
        err.name === "NotReadableError" ||
        err.name === "TrackStartError"
      ) {
        setCameraError(
          "Kamera sedang digunakan aplikasi lain. Tutup aplikasi tersebut lalu coba lagi."
        );
      } else {
        setCameraError(
          `Kamera gagal dibuka: ${
            err.message || "Periksa pengaturan kamera."
          }`
        );
      }
    }
  }

  useEffect(() => {
    if (!cameraOpen || !videoRef.current || !cameraStreamRef.current) {
      return;
    }

    const video = videoRef.current;
    video.srcObject = cameraStreamRef.current;

    void video.play().catch(() => {
      setCameraError(
        "Kamera belum bisa ditampilkan. Coba tutup lalu buka kembali."
      );
    });
  }, [cameraOpen, activeShot]);

  
  async function capturePhoto() {
    const video = videoRef.current;

    if (!video || !video.videoWidth || !video.videoHeight) {
      setCameraError("Kamera belum siap. Tunggu sebentar lalu coba lagi.");
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const scale = Math.min(
        1,
        1600 / Math.max(video.videoWidth, video.videoHeight)
      );

      canvas.width = Math.round(video.videoWidth * scale);
      canvas.height = Math.round(video.videoHeight * scale);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Browser tidak mendukung pengolahan foto.");
      }

      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) =>
            result
              ? resolve(result)
              : reject(new Error("Gagal mengambil foto.")),
          "image/jpeg",
          0.88
        );
      });

      const captured = await readFile(blob);
      const shot = photoMode === 1 ? 0 : activeShot;

      setPhotos((current) =>
        current.map((item, index) =>
          index === shot ? captured : item
        )
      );

      setFilter("Original");
      setCameraError("");

      // MODE 1 FOTO: selesai setelah satu jepretan
      if (photoMode === 1) {
        closeCamera();
        showNotice(
          "Foto berhasil diambil! Kamu bisa meninjau hasilnya."
        );
        return;
      }

      // MODE 3 FOTO: tetap lanjut mengambil tiga foto
      if (shot < 2) {
        setActiveShot(shot + 1);
        showNotice(
          `Foto ${shot + 1} berhasil! Lanjutkan ke foto ${shot + 2}.`
        );
      } else {
        closeCamera();
        showNotice(
          "Tiga foto berhasil diambil! Kamu bisa meninjau hasilnya."
        );
      }
    } catch (error) {
      setCameraError(
        error instanceof Error
          ? error.message
          : "Gagal mengambil foto."
      );
    }
  }


  function stopAudioVisualizer() {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    const context = audioContextRef.current;
    audioContextRef.current = null;

    if (context && context.state !== "closed") {
      void context.close().catch(() => {});
    }

    setAudioLevel(0);
  }

  async function startAudioVisualizer(stream: MediaStream) {
    stopAudioVisualizer();

    try {
      const context = new AudioContext();
      await context.resume();

      if (!recordingRef.current || streamRef.current !== stream) {
        await context.close();
        return;
      }

      const analyser = context.createAnalyser();
      analyser.fftSize = 256;

      context.createMediaStreamSource(stream).connect(analyser);
      audioContextRef.current = context;

      const data = new Uint8Array(analyser.fftSize);

      const draw = () => {
        if (!recordingRef.current || context.state === "closed") return;

        analyser.getByteTimeDomainData(data);

        const volume =
          data.reduce(
            (sum, value) => sum + Math.abs(value - 128),
            0
          ) / data.length;

        setAudioLevel(Math.min(100, Math.round(volume * 5)));
        animationRef.current = requestAnimationFrame(draw);
      };

      draw();
    } catch {
      // Rekaman tetap berjalan jika visualizer tidak tersedia.
    }
  }

  useEffect(() => {
    return () => {
      recordingRef.current = false;

      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      const context = audioContextRef.current;

      if (context && context.state !== "closed") {
        void context.close().catch(() => {});
      }

      if (recorderRef.current?.state === "recording") {
        recorderRef.current.stop();
      }

      streamRef.current?.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  async function choosePhoto(file?: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showNotice("Pilih file gambar yang valid.", true);
      return;
    }

    try {
      const original = await loadImage(await readFile(file));

      const scale = Math.min(
        1,
        1600 / Math.max(original.width, original.height)
      );

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(original.width * scale);
      canvas.height = Math.round(original.height * scale);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Browser tidak mendukung pengolahan foto.");
      }

      ctx.drawImage(original, 0, 0, canvas.width, canvas.height);

      const chosen = canvas.toDataURL("image/jpeg", 0.88);
      const shot = activeShot;

      setPhotos((current) =>
        current.map((item, index) => (index === shot ? chosen : item))
      );
      setFilter("Original");

      if (shot < 2) {
        setActiveShot(shot + 1);
      }

      showNotice(
        `Foto ${shot + 1} berhasil dipilih${
          shot < 2 ? `. Lanjutkan ke foto ${shot + 2}` : ""
        }.`
      );
    } catch {
      showNotice("Foto gagal diproses. Coba foto lain.", true);
    }
  }

  async function startRecording() {
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
        showNotice("Browser tidak mendukung rekaman suara.", true);
        return;
      }

      if (recordingRef.current) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      chunksRef.current = [];

      const mimeType = [
        "audio/webm;codecs=opus",
        "audio/mp4",
        "audio/webm",
      ].find((type) => MediaRecorder.isTypeSupported(type));

      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined
      );

      recorderRef.current = recorder;
      recordingRef.current = true;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onerror = () => {
        recordingRef.current = false;
        stopAudioVisualizer();

        if (timerRef.current !== null) {
          window.clearInterval(timerRef.current);
        }

        timerRef.current = null;
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;

        setRecording(false);
        showNotice("Terjadi kesalahan saat merekam suara.", true);
      };

      recorder.onstop = async () => {
        recordingRef.current = false;
        stopAudioVisualizer();

        if (timerRef.current !== null) {
          window.clearInterval(timerRef.current);
        }

        timerRef.current = null;
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        setRecording(false);

        try {
          const blob = new Blob(chunksRef.current, {
            type: recorder.mimeType || "audio/webm",
          });

          if (!blob.size) {
            setAudio("");
            showNotice(
              "Rekaman kosong. Periksa mikrofon lalu coba lagi.",
              true
            );
            return;
          }

          if (blob.size > MAX_BYTES) {
            setAudio("");
            showNotice(
              "Ukuran rekaman melebihi 2 MB. Rekam lebih singkat.",
              true
            );
            return;
          }

          const audioData = await readFile(
            new Blob([blob], { type: "audio/webm" })
          );

          setAudio(audioData);
          showNotice("Rekaman berhasil! Putar audio untuk mengeceknya.");
        } catch {
          setAudio("");
          showNotice("Rekaman gagal diproses. Coba rekam ulang.", true);
        }
      };

      setAudio("");
      setSeconds(0);
      setRecording(true);
      showNotice("Sedang merekam pesan suara...");

      recorder.start();
      void startAudioVisualizer(stream);

      timerRef.current = window.setInterval(() => {
        setSeconds((current) => {
          if (current >= 59) {
            window.setTimeout(() => stopRecording(), 0);
            return 60;
          }

          return current + 1;
        });
      }, 1000);
    } catch (error) {
      recordingRef.current = false;
      stopAudioVisualizer();

      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      setRecording(false);

      showNotice(
        error instanceof Error
          ? `Mikrofon gagal diakses: ${error.message}`
          : "Mikrofon tidak bisa diakses. Periksa izin browser.",
        true
      );
    }
  }

  function stopRecording() {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
    }

    timerRef.current = null;

    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    } else {
      recordingRef.current = false;
      stopAudioVisualizer();

      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setRecording(false);
    }
  }

  async function makeFinalImage(): Promise<string> {
    if (photos.some((item) => !item)) {
      throw new Error("Lengkapi ketiga foto terlebih dahulu.");
    }

    const [img1, img2, img3, frameImg] = await Promise.all([
      loadImage(photos[0]),
      loadImage(photos[1]),
      loadImage(photos[2]),
      loadImage(WEDDING_FRAME_SRC),
    ]);

    await document.fonts.load('12px "Euphorigenic"');
    await document.fonts.load('36px "Tempting"');

    const canvas = document.createElement("canvas");
    canvas.width = FRAME_WIDTH;
    canvas.height = FRAME_HEIGHT;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Gagal membuat foto.");

    const images = [img1, img2, img3];

    PHOTO_SLOTS.forEach((slot, index) => {
      drawCover(
        ctx,
        images[index],
        slot.x,
        slot.y,
        slot.width,
        slot.height,
        FILTERS[filter]
      );
    });

    ctx.drawImage(frameImg, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);

    ctx.save();
    ctx.fillStyle = "#39362f";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";

    const centerX = FRAME_WIDTH / 2;
    const textTop = FRAME_HEIGHT * 0.95 - 200;
    const SCALE = FRAME_WIDTH / 384;

    ctx.font = `${36 * SCALE}px "TypographiTimes"`;

    drawTrackedText(
      ctx,
      "The Wedding Of",
      centerX,
      textTop + 12 * SCALE,
      2.6 * SCALE
    );

    ctx.font = `${36 * SCALE}px "Tempting"`;

    ctx.fillText(
      Photobooth.NamaPengantin,
      centerX,
      textTop + 60 * SCALE
    );

    ctx.restore();

    return canvas.toDataURL("image/jpeg", 0.9);
  }

  async function downloadPhoto() {
    try {
      const image = await makeFinalImage();
      const link = document.createElement("a");

      link.href = image;
      link.download = `photobooth-${nama.trim() || "tamu"}.jpg`;
      link.click();
    } catch {
      showNotice("Foto gagal dibuat. Coba lagi.", true);
    }
  }

  async function submit() {
    if (!nama.trim()) {
      showNotice("Masukkan nama kamu terlebih dahulu.", true);
      return;
    }

    if (photos.some((item) => !item)) {
      showNotice("Ambil atau pilih ketiga foto terlebih dahulu.", true);
      return;
    }

    if (recording) {
      showNotice("Hentikan rekaman suara terlebih dahulu.", true);
      return;
    }

    if (!slug) {
      showNotice("Link photobooth tidak valid.", true);
      return;
    }

    setBusy(true);
    showNotice("");

    try {
      const finalImage = await makeFinalImage();
      const photoBlob = await fetch(finalImage).then((res) => res.blob());

      if (photoBlob.size > MAX_BYTES) {
        throw new Error("Ukuran foto final melebihi 2 MB.");
      }

      await kirimPhotobooth({
        idUndangan,
        slug,
        nama: nama.trim(),
        ucapan: ucapan.trim(),
        foto: finalImage,
        audio,
      });

      showNotice("Foto dan ucapan berhasil dikirim. Terima kasih!");
    } catch (error) {
      showNotice(
        error instanceof Error ? error.message : "Gagal mengirim data.",
        true
      );
    } finally {
      setBusy(false);
    }
  }

  function resetPhotos() {
  setPhotos(["", "", ""]);
  setActiveShot(0);
  setCameraError("");
  showNotice(
    "Ketiga kotak foto dikosongkan. Mulai dari foto pertama."
  );
}

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#f6f3ed] px-3 py-6 text-[#39362f] sm:px-4 sm:py-8">
      <div className="mx-auto w-full max-w-5xl min-w-0">
        <header className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b887c]">
            Dexa Invitation
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Photobooth</h1>
          <p className="mt-2 text-sm text-[#777368]">
            Abadikan momen dan tinggalkan pesan untuk kedua mempelai.
          </p>
        </header>

        <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-6">
          {/* SECTION FOTO */}
          <PhotoboothSection
            sectionRef={photoboothSectionRef}
            namaPengantin={Photobooth.NamaPengantin}
            photos={photos}
            activeShot={activeShot}
            setActiveShot={setActiveShot}
            cameraOpen={cameraOpen}
            videoRef={videoRef}
            filterStyle={FILTERS[filter]}
            frameSrc={WEDDING_FRAME_SRC}
            frameWidth={FRAME_WIDTH}
            frameHeight={FRAME_HEIGHT}
            photoSlots={PHOTO_SLOTS}
            fileRef={fileRef}
            choosePhoto={choosePhoto}
            cameraError={cameraError}
            busy={busy}
            showFloatingActions={showFloatingActions}
            capturePhoto={capturePhoto}
            closeCamera={closeCamera}
            openCamera={openCamera}
            resetPhotos={resetPhotos}
            photoMode={photoMode}
            setPhotoMode={setPhotoMode}
            singleFrameSrc={SINGLE_FRAME_SRC}
          />


          {/* SECTION FORM */}
          <PhotoboothFormSection
            nama={nama}
            setNama={setNama}
            ucapan={ucapan}
            setUcapan={setUcapan}
            filter={filter}
            setFilter={setFilter}
            filters={FILTERS}
            notice={notice}
            noticeError={noticeError}
            busy={busy}
            recording={recording}
            cameraOpen={cameraOpen}
            photos={photos}
            downloadPhoto={downloadPhoto}
            submit={submit}
          >
            <AudioSection
              audio={audio}
              recording={recording}
              seconds={seconds}
              audioLevel={audioLevel}
              busy={busy}
              startRecording={startRecording}
              stopRecording={stopRecording}
              onDeleteAudio={() => {
                setAudio("");
                setSeconds(0);
                showNotice("");
              }}
            />
          </PhotoboothFormSection>
        </div>

        {/* FLOATING ACTIONS */}
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

        <p className="mt-6 text-center text-xs text-[#8b887c]">
          Made with love by Dexa Invitation
        </p>
      </div>
    </main>
  );
}
