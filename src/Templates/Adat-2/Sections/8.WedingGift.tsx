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
    <section className="relative min-h-screen w-full overflow-hidden px-5 py-16" style={{ background: data.theme?.warna1, color: data.theme?.contrasfont }}>
      <div className={`relative z-[3] mx-auto flex w-full max-w-[380px] flex-col items-center pt-[105px] ${animate ? "MunculBawah-1" : "opacity-0"}`}>
        <p className="text-[8px] uppercase tracking-[0.5em]" style={{ color: data.theme?.warna3 }}>A Little Gift</p>
        <h2 className="mt-1 font-Tempting text-4xl" style={{ color: data.theme?.warna3 }}>Wedding Gift</h2>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-px w-8" style={{ background: `${data.theme?.warna3}70` }} />
          <span style={{ color: data.theme?.warna3 }}>✦</span>
          <span className="h-px w-8" style={{ background: `${data.theme?.warna3}70` }} />
        </div>
        <p className="mt-4 max-w-[290px] text-center text-[10px] leading-5 opacity-70">
          Your presence and prayers are already the most precious gift. If you wish to send a gift, you may use the options below.
        </p>

        {/* Rekening */}
        <div className="w-full">
          
          <div className="space-y-4">
            {data.WeddingGift?.rekening?.map((rekening, index) => {
              const bank = rekening.bank?.toUpperCase() ?? "";
              const logo = GiftLogo[bank];
              return (
                <div key={index} className="relative mt-4 overflow-hidden rounded-xl border p-5" style={{ background: `${data.theme?.warna1}f2`, borderColor: `${data.theme?.warna3}45` }}>
                  <span className="absolute -right-2 -top-5 font-Tempting text-7xl opacity-5" style={{ color: data.theme?.warna3 }}>{index + 1}</span>
                  <div className="relative z-10 flex items-center justify-between">
                    {logo ? <img src={logo} alt={rekening.bank} className="h-6 w-auto object-contain" /> : <p className="text-xs font-bold">{rekening.bank}</p>}
                  </div>
                  <div className="relative z-10 mt-6 text-center">
                    <p className="text-[7px] uppercase tracking-[0.35em] opacity-50">Account Number</p>
                    <p className="mt-2 text-lg font-semibold tracking-[0.15em]">{maskAccountNumber(rekening.nomorRekening)}</p>
                    <p className="mt-2 text-[10px] opacity-70">a.n. {rekening.atasNama}</p>
                    <button type="button" onClick={() => handleCopy(rekening.nomorRekening ?? "")} className="mt-4 rounded-full border px-5 py-2 text-[8px] uppercase tracking-[0.2em]" style={{ color: data.theme?.warna3, borderColor: `${data.theme?.warna3}60` }}>
                      <i className="fa-regular fa-copy mr-2" /> Copy Number
                    </button>
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
            <div className="relative overflow-hidden rounded-2xl border p-6 text-center shadow-sm" style={{ background: `${data.theme?.warna1}e6`, borderColor: `${data.theme?.warna2}25`,  backdropFilter: "blur(10px)" }}>
             
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
