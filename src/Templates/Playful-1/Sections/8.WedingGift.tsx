
import type { Invitation } from "../../../types/invitationType";
import { useState } from "react";
import { GiftLogo } from "../../1.Components/Giftlogo";

interface Props {
  data: Invitation;
  animate: boolean;
}

const WeddingGift = ({ data, animate }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Gagal copy:", err);
      alert("Gagal menyalin. Silakan salin secara manual.");
    }
  };



  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden px-5 py-20" style={{ color: data.theme?.warna2 }}>
      {/* Doodle decorations */}

      <img src="/Ornament/doodleAmplop.webp" alt="" className={`pointer-events-none absolute -bottom-2 -left-7 z-0 w-[120px] rotate-[5deg] object-contain ${animate ? "MunculKiri-1" : "opacity-0"}`} />

      <div className={`relative z-10 mx-auto w-full max-w-[370px] ${animate ? "MunculBawah-1" : "opacity-0"}`}>
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-KH-Blackline text-5xl">Wedding <span style={{color:data.theme?.warna3}}> Gift</span></h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 opacity-50" style={{ background: data.theme?.warna3 }} />
            <span>✿</span>
            <span className="h-px w-10 opacity-50" style={{ background: data.theme?.warna3 }} />
          </div>
          <p className="mx-auto mt-4 max-w-[290px] text-xs leading-6">
            Kehadiran dan doa Anda adalah hadiah terindah bagi kami. Jika berkenan berbagi kasih, kami telah menyediakan amplop kecil di bawah ini.
          </p>
        </div>

        {/* Envelope scene */}
        <div className="relative mx-auto mt-20 w-full max-w-[330px]">
          {/* Flower behind envelope */}
          <img src="/Ornament/doodleFlower2.webp" alt="" className="pointer-events-none absolute -left-10 -top-24 z-0 w-[100px] -rotate-12 object-contain" />

          {/* Cards emerging from envelope */}
          <div className="relative z-10 mx-auto mb-[-35px] w-[84%] space-y-3">
            {data.WeddingGift?.rekening?.map((rekening, index) => {
              const bank = rekening.bank?.toUpperCase() ?? "";
              const logo = GiftLogo[bank];
              const nomor = rekening.nomorRekening ?? "";

              return (
                <div key={index} className={`relative border p-4 shadow-md transition-transform duration-300 hover:rotate-0 bg-white ${index % 2 === 0 ? "rotate-[-3deg]" : "rotate-[3deg]"}`} style={{ borderColor: `${data.theme?.warna3}70`,  }}>
             

                  <div className="flex items-center justify-between gap-3 border-b pb-3" style={{ borderColor: `${data.theme?.warna3}50` }}>
                    {logo ? <img src={logo} alt={rekening.bank || "Bank"} className="h-6 max-w-[100px] object-contain object-left" /> : <p className="text-xs font-bold">{rekening.bank}</p>}
                    <button type="button" aria-label="Salin nomor rekening" onClick={() => handleCopy(nomor)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition hover:scale-110" style={{ borderColor: data.theme?.warna3, color: data.theme?.warna3 }}>
                      <i className="fa-regular fa-copy text-xs" />
                    </button>
                  </div>

                  <p className="mt-3 text-[9px] uppercase tracking-widest opacity-70">Account Number</p>
                 <p className="mt-1 break-all font-sans text-lg font-semibold tracking-wider">
                    {"**** **** " + (nomor.slice(-4) || "****")}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <p className="text-[10px]">a.n. {rekening.atasNama}</p>
                    <span className="text-lg">♡</span>
                  </div>
                </div>
              );
            })}

            {/* QRIS card */}
            {data.WeddingGift?.Qris?.Qris && (
              <div className="relative mx-auto w-[85%] rotate-[2deg] border p-3 text-center shadow-md bg-white" style={{  borderColor: `${data.theme?.warna3}70`, color: data.theme?.warna3 }}>
                <span className="pointer-events-none absolute -top-2 left-1/2 h-4 w-10 -translate-x-1/2 rotate-3 opacity-70" style={{ background: data.theme?.warna3 }} />
                <p className="mb-2 text-xs font-semibold">Send Your Love ♡</p>
                <div className="mx-auto w-fit border border-white bg-white p-2">
                  <img src={data.WeddingGift.Qris.Qris} alt={`QRIS ${data.WeddingGift.Qris.penerima}`} className="h-auto w-[150px] object-contain" />
                </div>
                <p className="mt-2 text-[10px]">QRIS a.n. {data.WeddingGift.Qris.penerima}</p>
              </div>
            )}

            {/* Gift address card */}
            {data.WeddingGift?.alamat?.alamat && (
              <div className="relative mx-auto w-[90%] -rotate-[2deg] border p-4 text-center shadow-md bg-white" style={{  borderColor: `${data.theme?.warna3}70`, color: data.theme?.warna3 }}>
                <p className="text-[9px] uppercase tracking-[0.2em]">Gift Delivery Address</p>
                <p className="mt-2 text-xs leading-5">{data.WeddingGift.alamat.alamat}</p>
                <button type="button" onClick={() => handleCopy(data.WeddingGift?.alamat?.alamat ?? "")} className="mt-3 rounded-full border px-4 py-2 text-[9px] uppercase tracking-widest transition hover:scale-105" style={{ borderColor: data.theme?.warna3, color: data.theme?.warnaButtonBorder, background:data.theme?.warnaButtonBackground }}>
                  <i className="fa-regular fa-copy mr-2" />Copy Address
                </button>
              </div>
            )}
          </div>

          {/* Envelope body */}
          <div className="relative z-0 h-[135px] overflow-hidden rounded-b-xl border shadow-md" style={{ background: data.theme?.warnaButtonBorder, borderColor: data.theme?.warna3 }}>
            <div className="absolute inset-0" style={{ background: data.theme?.warna3, clipPath: "polygon(0 0, 50% 65%, 100% 0, 100% 100%, 0 100%)" }} />
          </div>

          {/* Front envelope flap */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[135px] overflow-hidden rounded-b-xl">
            <div className="absolute inset-0" style={{ background: data.theme?.warnaButtonBorder, clipPath: "polygon(0 0, 50% 58%, 100% 0, 100% 100%, 0 100%)" }} />
            <div className="absolute inset-0" style={{ background: data.theme?.warnaButtonBorder, clipPath: "polygon(0 100%, 50% 38%, 100% 100%)" }} />
          </div>

          {/* Envelope seal */}
          <div className="absolute bottom-[48px] left-1/2 z-30 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border shadow-sm" style={{ background: data.theme?.warna3, borderColor: data.theme?.warna2, color: data.theme?.warnaButtonBorder }}>
            <span className="text-lg">♡</span>
          </div>

          {/* Envelope outline */}
          <svg className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[135px] w-full" viewBox="0 0 330 135" preserveAspectRatio="none" fill="none" style={{ color: data.theme?.warna3 }}>
            <path d="M1 1 L165 78 L329 1" stroke="currentColor" strokeWidth="1.5" />
            <path d="M1 1 V119 Q1 134 16 134 H314 Q329 134 329 119 V1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="font-KH-Blackline text-2xl" style={{color:data.theme?.warna3}}>Makasih banyak, semuanya! ♡</p>
          <p className="mt-2 text-[10px]">Jangan lupa bahagia bareng kami, yaa!</p>
        </div>
      </div>

      {/* Copy notification */}
      {copied && (
        <div className="fixed bottom-20 left-1/2 z-[9999] -translate-x-1/2 rounded-full px-5 py-2 text-xs shadow-lg text-white" style={{ background: data.theme?.warna3 }}>
          ✓ Berhasil disalin
        </div>
      )}
    </section>
  );
};

export default WeddingGift;
