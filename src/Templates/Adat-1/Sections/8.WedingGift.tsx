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
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error("Gagal copy:", err);
      alert("Copy gagal: " + err);
    } finally {
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const maskAccountNumber = (number: string = "") => {
    if (!number) return "";
    const clean = number.replace(/\s/g, "");
    if (clean.length <= 4) return clean;
    return `•••• •••• ${clean.slice(-4)}`;
  };

  return (
    <section
  className="relative flex min-h-screen w-full overflow-hidden px-5 py-20 bg-white"
  style={{ color: data.theme?.contrasfont, background: `${data.theme?.warna2}D7` }}
>
  {/* <div className="absolute -top-32 -left-32 h-[350px] w-[350px] rounded-full opacity-70" style={{ background: data.theme?.warna1 }} />
  <div className="absolute -bottom-40 -right-32 h-[350px] w-[350px] rounded-full opacity-70" style={{ background: data.theme?.warna2 }} /> */}
  {/* konten Wedding Gift kamu tetap di sini */}

      {/* Ornamen */}
      <div className="pointer-events-none absolute -right-30 -bottom-50 z-[2] h-[300px]">
        <img src="/Ornament/BungaJawa1.webp" alt="" className="h-full w-auto object-contain object-center-bottom opacity-80" />
      </div>
      <div className="pointer-events-none absolute -bottom-50 -left-30 z-[2] h-[300px]">
        <img src="/Ornament/BungaJawa1.webp" alt="" className="h-full w-auto object-contain object-right-bottom scale-x-[-1] opacity-70" />
      </div>
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 z-[2] h-[300px]">
        <img src="/Ornament/BungaJawa2.webp" alt="" className="h-full w-auto object-contain object-right-bottom scale-x-[-1] opacity-70" />
      </div>


      <div className={`relative z-10 mx-auto flex w-full max-w-[500px] flex-col items-center ${animate ? "MunculBawah-1" : "opacity-0"}`}>
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-5xl" style={{ color: data.theme?.warna3 }}>Wedding Gift</h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 opacity-30" style={{ background: data.theme?.warna3 }} />
            <span style={{ color: data.theme?.warna3 }}>♡</span>
            <span className="h-px w-12 opacity-30" style={{ background: data.theme?.warna3 }} />
          </div>
          <p className="mx-auto mt-4 max-w-[330px] text-xs leading-6">
            Having you with us and receiving your prayers is the greatest gift. If you would like to share a token of love, you may do so through the options below.
          </p>
        </div>

        {/* Rekening */}
        <div className="w-full">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xl" style={{ color: data.theme?.warna3 }}>♢</span>
            <p className="text-xs uppercase tracking-[0.25em] opacity-60">Send a Gift</p>
          </div>
          <div className="space-y-4">
            {data.WeddingGift?.rekening?.map((rekening, index) => {
              const bank = rekening.bank?.toUpperCase() ?? "";
              const logo = GiftLogo[bank];
              return (
                <div key={index} className="relative overflow-hidden rounded-2xl border  shadow-sm" style={{ background: `${data.theme?.warna2}e6`, borderColor: `${data.theme?.warna3}25`,  backdropFilter: "blur(10px)" }}>
                  <span className="absolute -right-3 -top-7 text-8xl opacity-5" style={{ color: data.theme?.warna3 }}>{index + 1}</span>
                  <div className="relative z-10 flex items-center justify-between bg-white p-5">
                    {logo ? 
                    <img src={logo} alt={rekening.bank} className="h-7 w-auto object-contain"  /> : <p className="text-xs font-bold">{rekening.bank}</p>}
                    <button type="button" onClick={() => handleCopy(rekening.nomorRekening ?? "")} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition hover:scale-105" style={{ borderColor: `${data.theme?.warna3}`,color:data.theme?.warna3 }}>
                      <i className="fa-regular fa-copy text-xs" />
                    </button>
                  </div>
                  <div className="relative z-10 mt-7">
                    <p className="mb-1 text-xs tracking-[0.2em] opacity-50">Account Number</p>
                    <div className="flex items-center justify-center gap-3">
                      <p className="text-xl font-semibold tracking-[0.12em]">{maskAccountNumber(rekening.nomorRekening)}</p>
                    </div>
                    <p className="mt-3 opacity-60">a.n. {rekening.atasNama}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* QRIS */}
        {data.WeddingGift?.Qris?.Qris && (
          <div className="mt-5 w-full">
            <div className="relative overflow-hidden rounded-2xl border p-6 text-center shadow-sm" style={{ background: `${data.theme?.warna1}e6`, borderColor: `${data.theme?.warna3}25`, backdropFilter: "blur(10px)" }}>
              <div className="mx-auto mb-4 flex w-fit items-center justify-center rounded-xl p-2" style={{ background: data.theme?.ContrasBackgroundColor }}>
                <img src={data.WeddingGift.Qris.Qris} alt={`Qris ${data.WeddingGift.Qris.penerima}`} className="h-auto w-[190px] object-contain" />
              </div>
              <p className="mx-auto max-w-[300px] text-sm leading-6">QRIS a.n. <br />{data.WeddingGift.Qris.penerima}</p>
            </div>
          </div>
        )}

        {/* Alamat */}
        {data.WeddingGift?.alamat?.alamat && (
          <div className="mt-5 w-full">
            <div className="relative overflow-hidden rounded-2xl border p-6 text-center shadow-sm" style={{ background: `${data.theme?.warna2}e6`, borderColor: `${data.theme?.warna2}25`,  backdropFilter: "blur(10px)" }}>
             
              <i className="fa-solid fa-gift text-2xl"
              style={{color:data.theme?.warna3}} />
              
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] opacity-70">Gift Delivery Address</p>
              <p className="mx-auto max-w-[300px] line-clamp-2 text-sm leading-6">{data.WeddingGift.alamat.alamat}</p>
              <button type="button" className="mt-5 rounded-full border px-5 py-2 text-[10px] tracking-widest transition hover:scale-105" style={{ background: data.theme?.warnaButtonBackground, color: data.theme?.warnaButtonBorder, borderColor: data.theme?.warnaButtonBackground }} onClick={() => handleCopy(data.WeddingGift?.alamat?.alamat ?? "")}>
                <i className="fa-regular fa-copy mr-2" />Copy Address
              </button>
            </div>
          </div>
        )}
      </div>

      {copied && (
        <div className="fixed bottom-20 left-1/2 z-[9999] -translate-x-1/2 rounded-full px-5 py-2 text-xs shadow-lg" style={{ background: data.theme?.warna3, color: data.theme?.warna1 }}>
          ✓ Berhasil disalin
        </div>
      )}
    </section>
  );
};

export default WeddingGift;
