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
import { useState } from "react";

interface Props {
  data: Invitation;
  scrollY: number;
}

const WeddingGift = ({ data }: Props) => {
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async (nomorRekening: string) => {
  try {
    await navigator.clipboard.writeText(nomorRekening);
    setCopied(true)

  } catch (err) {
    console.error("Gagal copy:", err);
    alert("Copy gagal: " + err);
  }
  finally {
    setTimeout(()=> setCopied(false), 1500)
  }
};

  return (
    <section className="relative z-10 flex w-full tracking-[0.1rem] text-lg pointer-events-auto"
      style={{ background: data.theme?.warna1, color: data.theme?.contrasfont }}>
      {data.Background?.Background14 ? (
        <img src={data.Background.Background14}alt=""className="absolute inset-0 w-full h-full object-cover"/>) : (
          <div className="flex flex-col items-center   my-6 w-full h-full" >
          <h2 className="text-3xl tracking-[0.2rem] pt-10 uppercase font-Cenova "> Wedding Gift</h2>
          <div className=" relative  w-full opacity-60 pointer-events-none">
            <img src="/Ornament/sun5.png"  alt="" className=" w-auto absolute opacity-40 "/>
          </div>
        
          <div className="w-full px-2 mt-15 z-2">
            {data.WeddingGift?.rekening?.map((rekening, index) => {
              const bank = rekening.bank?.toUpperCase() ?? "";
              const logo = GiftLogo[bank];

              return (
                <div className="border rounded-lg p-1 mb-2 flex flex-col items-center  text-sm"
                  key={index} style={{background:data.theme?.warna2 , color: data.theme?.ContrasBackgroundColor}}>
                  {logo && (
                    <img src={logo} alt={rekening.bank} 
                    style={{filter: `drop-shadow(0 0 2px white`}}
                    className=" object-contain h-7 my-2 " /> )}
                    <div className="flex gap-1 ">

                    <p className="font-bold ">{rekening.nomorRekening}</p>

                    <button type="button"
                      onClick={() => handleCopy(rekening.nomorRekening ?? "")}>
                      <i className="fa-regular fa-copy " />
                    </button>
                    </div>
                    <p > a.n. {rekening.atasNama}</p>

                  </div>
              );
            })}

            <div className="border rounded-lg p-1 mb-2 flex flex-col items-center z-2 text-sm" style={{background:data.theme?.warna2, color: data.theme?.ContrasBackgroundColor}}>
              <i className="fa-solid fa-gift text-4xl my-1" style={{color: data.theme?.warna1}}/>

              <div>
                {/* <p className="font-bold">
                  {data.WeddingGift?.alamat?.penerima}
                  </p> */}

                <p> {data.WeddingGift?.alamat?.alamat && data.WeddingGift.alamat.alamat.length > 40 ? data.WeddingGift.alamat.alamat.slice(0, 40) + "...": data.WeddingGift?.alamat?.alamat} </p>
             
                <button className="border px-2 rounded py-1"
                style={{background: data.theme?.warnaButtonBackground,color: data.theme?.contrasfont}}
                onClick={() => handleCopy(data.WeddingGift?.alamat.alamat ?? "")}>
                  Copy alamat
                </button>

                {/* <p>
                  {data.WeddingGift?.alamat?.noHp}
                  </p> */}
              </div>
            </div>
          </div>

        </div>
      )}
      
      {copied && (
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] bg-black/80 text-white rounded-lg ">
        Berhasil disalin
      </div>)}
    </section>
  );
};

export default WeddingGift;