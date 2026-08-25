import { useState } from "react";
import type { Invitation } from "../../types/invitationType";

import logoBCA from "../../../public/Icon/BCA Logo.png";
import logoBNI from "../../../public/Icon/BNI Logo.png";
import logoBRI from "../../../public/Icon/BRI Logo.png";
import logoMandiri from "../../../public/Icon/Mandiri Logo.png";
import logoCIMB from "../../../public/Icon/CIMB Niaga Logo.png";
import logoDANA from "../../../public/Icon/Dana Logo.png";
import logoGopay from "../../../public/Icon/GoPay Logo.png";
import logoOVO from "../../../public/Icon/OVO Logo.png";
import logoShopeePay from "../../../public/Icon/ShopeePay Logo.png";
import logoSeabank from "../../../public/Icon/SeaBank Logo.png";

interface Props {
  data: Invitation;
  isOpen: boolean;
  onClose: () => void;
  onOpenGallery: (images: string[], index: number) => void;
}

const ModalGroupInfo = ({data,isOpen,onClose,onOpenGallery,}: Props) => {
    
  if (!isOpen) return null;
   const [copied, setCopied] = useState(false);

  const GiftLogo: Record<string, string> = {
    BCA: logoBCA,
    BNI: logoBNI,
    BRI: logoBRI,
    MANDIRI: logoMandiri,
    SEABANK: logoSeabank,
    CIMB: logoCIMB,
    GOPAY: logoGopay,
    DANA: logoDANA,
    OVO: logoOVO,
    SHOPEEPAY: logoShopeePay,
  };

  // =========================
  // COPY
  // =========================

  const handleCopy = async (text: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error("Gagal copy:", err);
    } finally {
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  };

  // =========================
  // Ambil semua gallery chat
  // =========================
  const gallery =
    data.Chat?.Interaksi?.flatMap(
      (chat) => chat.gallery ?? []
    ) ?? [];

  // =========================
  // Wedding Gift
  // =========================
  const rekening = data.WeddingGift?.rekening ?? [];
  const alamat = data.WeddingGift?.alamat;

  

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-[95%] max-w-[385px] max-h-full overflow-y-auto rounded-2xl"
        style={{
          background: data.theme?.contrasfont,
          color: data.theme?.warna1,
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ================= HEADER ================= */}
        <div className="relative flex flex-col items-center px-5 pt-6 pb-6">

          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20">
            ✕
          </button>

          {/* Foto Grup */}
          <img src="/logo-dio.webp"
            alt="Foto grup"
            className="w-28 h-28 rounded-full object-cover border-4"
            style={{
              borderColor: data.theme?.contrasfont,
            }}/>

          {/* Nama Grup */}
          <h2 className="mt-3 text-lg font-bold text-center">
            {data.NamabridePanggilan} & {data.NamagroomPanggilan}
          </h2>

          <p className="text-sm opacity-70 mt-1">
            Undangan Pernikahan
          </p>
        </div>


        {/* ================= GALLERY ================= */}
        <div className="px-4 py-4 border-t">

          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">
              Gallery
            </h3>

            {gallery.length > 0 && (
              <button
                onClick={() => onOpenGallery(gallery, 0)}
                className="text-sm opacity-70"
              >
                Lihat semua
              </button>
            )}
          </div>

          {gallery.length > 0 ? (
            <div className="grid grid-cols-4 gap-1">

              {gallery.slice(0, 8).map((image, index) => (
                <button
                  key={index}
                  onClick={() => onOpenGallery(gallery, index)}
                  className="relative aspect-square overflow-hidden rounded"
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                  {index === 7 && gallery.length > 8 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        +{gallery.length - 8}
                      </span>
                    </div>
                  )}
                </button>
              ))}

            </div>
          ) : (
            <p className="text-sm opacity-60">
              Belum ada foto.
            </p>
          )}
        </div>

        {/* ============= Save The Date ==================== */}
            <div className="flex flex-col px-4 py-5 border-t">

            <h2 className="text-lg font-bold text-left mb-2">save the date</h2>

            {/* ================= AKAD ================= */}
            <div className="mb-5 leading-2">

                <p className="font-bold text-center mb-2">
                Akad
                </p>

                <p className="text-sm opacity-70 text-center">
                {data.TanggalAkad} Pukul {data.JamAkad}
                </p>

                {/* Location Card */}
                <a
                href={data.LinkGoogleMapsAkad}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3"
                >
                <div
                    className="rounded-xl overflow-hidden border"
                    style={{
                    background: data.theme?.contrasfont,
                    }}
                >

                    {/* Map Preview */}
                    <div className="relative h-28 overflow-hidden">

                    {data.LinkGoogleMapsAkad ? (
                        <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                            data.LokasiAkad ?? ""
                        )}&output=embed`}
                        className="w-full h-full border-0 pointer-events-none"
                        loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                        <i className="fa-solid fa-location-dot text-4xl" />
                        </div>
                    )}

                    </div>

                    {/* Location Info */}
                    <div className="p-3 flex items-center gap-3">

                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{
                        background: data.theme?.warnaButtonBackground,
                        color: data.theme?.contrasfont,
                        }}
                    >
                        <i className="fa-solid fa-location-dot" />
                    </div>

                    <div className="min-w-0">

                        <p className="font-bold text-sm">
                        {data.LokasiAkad}
                        </p>

                        <p className="text-xs opacity-70 mt-1">
                        Buka di Google Maps
                        </p>

                    </div>

                    </div>

                </div>
                </a>

            </div>


            {/* ================= RESEPSI ================= */}
            <div className="leading-2">

                <p className="font-bold text-center mb-2">Resepsi</p>

                <p className="text-sm opacity-70 text-center">
                {data.TanggalResepsi} Pukul {data.JamResepsi}
                </p>

                {/* Location Card */}
                <a href={data.LinkGoogleMapsResepsi}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3">
                <div
                    className="rounded-xl overflow-hidden border"
                    style={{
                    background: data.theme?.contrasfont,
                    }}
                >

                    {/* Map Preview */}
                    <div className="relative h-28 overflow-hidden">

                    {data.LinkGoogleMapsResepsi ? (
                        <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                            data.LokasiResepsi ?? ""
                        )}&output=embed`}
                        className="w-full h-full border-0 pointer-events-none"
                        loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                        <i className="fa-solid fa-location-dot text-4xl" />
                        </div>
                    )}

                    </div>

                    {/* Location Info */}
                    <div className="p-3 flex items-center gap-3">

                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                            style={{
                            background: data.theme?.warnaButtonBackground,
                            color: data.theme?.contrasfont,
                            }}
                        >
                            <i className="fa-solid fa-location-dot" />
                        </div>

                        <div className="min-w-0">

                            <p className="font-bold text-sm">
                            {data.LokasiResepsi}
                            </p>

                            <p className="text-xs opacity-70 mt-1">
                            Buka di Google Maps
                            </p>
                        </div>
                    </div>
                </div>
                </a>
            </div>
        </div>

        


        {/* ================= WEDDING GIFT ================= */}
         <div className="px-4 py-4 border-t">

          <h3 className="font-bold mb-3 text-center"> Wedding Gift</h3>


          {/* ================= REKENING ================= */}

          <div className="space-y-2">

            {rekening.map((item, index) => {

              const bank =
                item.bank?.toUpperCase() ?? "";

              const logo =
                GiftLogo[bank];

              return (
                <div key={index}
                  className="border rounded-lg p-3 flex flex-col items-center text-xs">

                  {/* Logo Bank */}

                  {logo && (
                    <img src={logo} alt={item.bank} className="object-contain h-7 my-1"/>
                  )}


                  {/* Nomor rekening + copy */}

                  <div className="flex items-center gap-2 mt-1">

                    <p className="font-bold">
                      {item.nomorRekening}
                    </p>

                    <button type="button"
                    className="opacity-70 hover:opacity-100"
                      onClick={() =>
                        handleCopy(
                          item.nomorRekening ?? ""
                        )
                      }>
                      <i className="fa-regular fa-copy" />
                    </button>

                  </div>


                  {/* Nama */}

                  <p> a.n. {item.atasNama}</p>

                </div>
              );

            })}

          </div>


          {/* ================= ALAMAT ================= */}

          {alamat?.alamat && (
            <div className="border rounded-lg p-3 mt-2 flex flex-col items-center text-xs">

              <i className="fa-solid fa-gift text-3xl my-1" />

              <p className="text-center leading-relaxed">
                {alamat.alamat.length > 80
                  ? alamat.alamat.slice(0, 80) + "..."
                  : alamat.alamat}
              </p>

              <button className="border px-3 rounded py-1 mt-2"
                type="button"
                style={{background:data.theme?.warnaButtonBackground,color:data.theme?.contrasfont,}}
                onClick={() =>handleCopy(alamat.alamat ?? "")}>
                Copy alamat
              </button>

            </div>
          )}

        </div>

      </div>


      {/* ================= COPY NOTIFICATION ================= */}

      {copied && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[10000] bg-black/80 text-white px-4 py-2 rounded-lg text-sm">
          ✓ Berhasil disalin
        </div>
      )}

    </div>
  );
};

export default ModalGroupInfo;