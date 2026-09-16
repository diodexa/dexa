import type { Invitation } from "../../../types/invitationType";
import { useState } from "react";
import { GiftLogo } from "../../1.Components/Giftlogo";

interface Props {
  data: Invitation;
  animate: boolean
}

const WeddingGift = ({ data,animate }: Props) => {
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

  return (
    <section className="relative flex min-h-screen w-full overflow-hidden px-5 py-20" style={{ background: data.theme?.warna1, color: data.theme?.contrasfont }}>
        <div className="absolute -top-10 -right-80 h-[350px] pointer-events-none">
            <img src="/Ornament/Pohon2.webp" alt=""
            className=" h-full w-auto object-contain object-right-bottom scale-x-[-1] opacity-20"/>
        </div>
        <div className="absolute -bottom-20 -left-10 h-[250px] pointer-events-none">
            <img src="/Ornament/DahliaMerah.webp" alt=""
            className=" h-full w-auto object-contain object-right-bottom  opacity-70"/>
        </div>
        <div className="absolute -bottom-15 -right-10 h-[200px] pointer-events-none">
            <img src="/Ornament/DahliaCream.webp" alt=""
            className=" h-full w-auto object-contain object-right-bottom opacity-70 sepia-30"/>
        </div>
        <div className="absolute -bottom-20 left-1/4 h-[200px] pointer-events-none">
            <img src="/Ornament/DaunDahlia.webp" alt=""
            className=" h-full w-auto object-contain object-right-bottom rotate-270 opacity-70"/>
        </div>
        <div className={`relative z-10 mx-auto flex w-full max-w-[500px] flex-col items-center ${animate? "MunculBawah-1" :"opacity-0"}`}>
            <div className="mb-10 text-center">
            <h2 className="text-5xl" style={{ color: data.theme?.warna3 }}>Wedding Gift</h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-3">
                <span className="h-px w-12 opacity-30" style={{ background: data.theme?.warna3 }} />
                <span style={{ color: data.theme?.warna3 }}>♡</span>
                <span className="h-px w-12 opacity-30" style={{ background: data.theme?.warna3 }} />
            </div>
            <p className="mx-auto mt-4 max-w-[330px] text-xs leading-6 ">Having you with us and receiving your prayers is the greatest gift. If you would like to share a token of love, you may do so through the options below.</p>
            </div>
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
                    <div key={index} className="relative overflow-hidden rounded-2xl border p-5" style={{ background: `${data.theme?.warna2}40`, borderColor: `${data.theme?.contrasfont}15`, color: data.theme?.ContrasBackgroundColor, backdropFilter: "blur(10px)" }}>
                    <span className="absolute -right-3 -top-7 text-8xl opacity-5" style={{ color: data.theme?.warna3 }}>{index + 1}</span>
                    <div className="relative z-10 flex items-center justify-between">
                        {logo ? <img src={logo} alt={rekening.bank} className="h-7 w-auto object-contain" style={{ filter: "drop-shadow(0 0 2px white)" }} /> : <p className="text-xs font-bold">{rekening.bank}</p>}
                        <button type="button" onClick={() => handleCopy(rekening.nomorRekening ?? "")} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition hover:scale-105" style={{ borderColor: `${data.theme?.contrasfont}20`, background: `${data.theme?.warna1}30` }}>
                        <i className="fa-regular fa-copy text-xs" />
                        </button>

                    </div>
                    <div className="relative z-10 mt-7">
                        <p className="mb-1 text-xs  tracking-[0.2em] opacity-50">Account Number</p>
                        <div className="flex items-center justify-center gap-3">
                        <p className="text-xl font-semibold tracking-[0.12em]">{rekening.nomorRekening}</p>
                        </div>
                        <p className="mt-3 text- opacity-60">a.n. {rekening.atasNama}</p>
                    </div>
                    </div>
                );
                })}
            </div>
            </div>
            {data.WeddingGift?.Qris?.Qris && (
            <div className="mt-5 w-full">
                <div className="relative overflow-hidden rounded-2xl border p-6 text-center" style={{ background: `${data.theme?.warna2}40`, borderColor: `${data.theme?.contrasfont}15`, color: data.theme?.ContrasBackgroundColor, backdropFilter: "blur(10px)" }}>
                    <div className="mx-auto mb-4 flex w-fit items-center justify-center " >
                        <img src={data.WeddingGift.Qris.Qris} alt={`Qris ${data.WeddingGift.Qris.penerima}`} />
                    </div>
                    <p className="mx-auto max-w-[300px] line-clamp-2 text-sm leading-6">QRIS a.n. <br/> {data.WeddingGift.Qris.penerima}</p>
                    {/* <p className="mx-auto max-w-[300px] line-clamp-2 text-sm leading-6">{data.WeddingGift.alamat.alamat}</p>
                    <button type="button" className="mt-5 rounded-full border px-5 py-2 text-[10px] tracking-widest transition hover:scale-105" style={{ background: data.theme?.warnaButtonBackground, color: data.theme?.warnaButtonBorder, borderColor: data.theme?.warnaButtonBackground }} onClick={() => handleCopy(data.WeddingGift?.alamat?.alamat ?? "")}>
                        <i className="fa-regular fa-copy mr-2" />Copy Address
                    </button> */}
                </div>
            </div>
            )}
            {data.WeddingGift?.alamat?.alamat && (
            <div className="mt-5 w-full">
                <div className="relative overflow-hidden rounded-2xl border p-6 text-center" style={{ background: `${data.theme?.warna2}40`, borderColor: `${data.theme?.contrasfont}15`, color: data.theme?.ContrasBackgroundColor, backdropFilter: "blur(10px)" }}>
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: `${data.theme?.warna3}15`, color: data.theme?.warna3 }}>
                        <i className="fa-solid fa-gift text-2xl" />
                    </div>
                    <p className="mb-2 text-[9px] uppercase tracking-[0.25em] opacity-70">Gift Delivery Address</p>
                    <p className="mx-auto max-w-[300px] line-clamp-2 text-sm leading-6">{data.WeddingGift.alamat.alamat}</p>
                    <button type="button" className="mt-5 rounded-full border px-5 py-2 text-[10px] tracking-widest transition hover:scale-105" style={{ background: data.theme?.warnaButtonBackground, color: data.theme?.warnaButtonBorder, borderColor: data.theme?.warnaButtonBackground }} onClick={() => handleCopy(data.WeddingGift?.alamat?.alamat ?? "")}>
                        <i className="fa-regular fa-copy mr-2" />Copy Address
                    </button>
                </div>
            </div>
            )}
        </div>
        {copied && <div className="fixed bottom-20 left-1/2 z-[9999] -translate-x-1/2 rounded-full px-5 py-2 text-xs shadow-lg" style={{ background: data.theme?.warna3, color: data.theme?.warna1 }}>✓ Berhasil disalin</div>}
    </section>
  );
};

export default WeddingGift;
