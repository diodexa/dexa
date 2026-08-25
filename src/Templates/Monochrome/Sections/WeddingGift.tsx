import { useState } from "react";
import type { Invitation } from "../../../types/invitationType";

import logoBCA from "../../../../public/Icon/BCA Logo.png";
import logoBNI from "../../../../public/Icon/BNI Logo.png";
import logoBRI from "../../../../public/Icon/BRI Logo.png";
import logoMandiri from "../../../../public/Icon/Mandiri Logo.png";
import logoCIMB from "../../../../public/Icon/CIMB Niaga Logo.png";
import logoDANA from "../../../../public/Icon/Dana Logo.png";
import logoGopay from "../../../../public/Icon/GoPay Logo.png";
import logoOVO from "../../../../public/Icon/OVO Logo.png";
import logoShopeePay from "../../../../public/Icon/ShopeePay Logo.png";
import logoSeabank from "../../../../public/Icon/SeaBank Logo.png";

interface Props {
  data: Invitation;
}

const WeddingGift = ({ data }: Props) => {
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

  return (
    <section className="bg-black text-black px-6 py-24"
    style={{backgroundColor: `${data.theme?.warna1}`, color:data.theme?.warna2}}>

      <div className="max-w-md mx-auto text-center">

        {/* TITLE */}
        <p className="text-xs tracking-[0.4em] uppercase text-black/50 MunculBawah">
          Wedding Gift
        </p>

        <h2 className="mt-4 text-4xl font-serif MunculBawah">
          Tanda Kasih
        </h2>

        <div className="w-12 h-px mx-auto my-8 MuculBawah" style={{backgroundColor: `${data.theme?.warna2}`}}/>

        <p className="text-sm leading-7 MunculBawah"
        style={{color:`color-mix(in srgb, ${data.theme?.warna2} 60%, transparent)`}}>
          Kehadiran dan doa restu Anda merupakan hadiah terindah
          bagi kami. Namun apabila ingin memberikan tanda kasih,
          dapat melalui informasi berikut.
        </p>


        {/* REKENING */}
        <div className="mt-10 space-y-3">

          {data.WeddingGift?.rekening?.map(
            (rekening, index) => {

              const bank =
                rekening.bank?.toUpperCase() ?? "";

              const logo = GiftLogo[bank];

              return (
                <div key={index}
                  className={`border border-black/15 p-6 ${index%2 ? "MunculKanan": "MunculKiri"}`}
                  style={{border: `1px solid color-mix(in srgb, ${data.theme?.warna2} 15%, transparent)`, backgroundColor:data.theme?.warna2}}>

                  {/* LOGO */}
                  {logo && (
                    <div className="flex justify-center mb-5">

                      <img
                        src={logo}
                        alt={rekening.bank}
                        className="h-8 w-auto object-contain "
                      />

                    </div>
                  )}

                  {/* BANK */}
                  <p className="text-xs tracking-[0.25em] uppercase text-black/50" style={{color:`color-mix(in srgb, ${data.theme?.warna1} 50%, transparent)`}}>
                    {rekening.bank}
                  </p>

                  {/* NOMOR */}
                  <div className="mt-3 flex items-center justify-center gap-3"
                  style={{color:data.theme?.warna1}}>

                    <p className="text-xl tracking-wider">
                      {rekening.nomorRekening}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          rekening.nomorRekening ?? ""
                        )
                      }
                      className="text-black/50 hover:text-black transition"
                      aria-label="Salin nomor rekening"
                    >
                      <i className="fa-regular fa-copy" />
                    </button>

                  </div>

                  {/* PEMILIK */}
                  <p className="mt-3 text-sm text-black/60">
                    a.n. {rekening.atasNama}
                  </p>

                </div>
              );
            }
          )}

        </div>


        {/* ALAMAT HADIAH */}
        {data.WeddingGift?.alamat?.alamat && (
          <div className="mt-4 border border-black/15 p-6 MunculBawah"
          style={{backgroundColor:data.theme?.warna2, color:data.theme?.warna1}}>

            <i className="fa-solid fa-gift text-3xl" />

            <p className="mt-4 text-xs tracking-[0.25em] uppercase text-black/50" style={{color:`color-mix(in srgb, ${data.theme?.warna1} 50%, transparent)`}}>
              Kirim Hadiah
            </p>

            <p className="mt-4 text-sm leading-7 "
            style={{color:`color-mix(in srgb, ${data.theme?.warna1} 70%, transparent)`}}>
              {data.WeddingGift.alamat.alamat.length > 40
                ? data.WeddingGift.alamat.alamat.slice(0, 40) + "..."
                : data.WeddingGift.alamat.alamat}
            </p>

            <button
              type="button"
              onClick={() =>
                handleCopy(
                  data.WeddingGift?.alamat?.alamat ?? ""
                )
              }
              className="mt-5 border px-6 py-3 text-xs tracking-[0.2em] uppercase transition "
              style={{border:`1px solid ${data.theme?.warna1}`, background:data.theme?.warnaButtonBackground, color:data.theme?.warnaButtonBorder}}
            >
              Copy Alamat
            </button>

          </div>
        )}

      </div>


      {/* TOAST */}
      {copied && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] bg-black text-white px-5 py-3 text-sm shadow-lg">
          ✓ Berhasil disalin
        </div>
      )}

    </section>
  );
};

export default WeddingGift;