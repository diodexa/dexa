import type { Invitation } from "../../../types/invitationFlipBook";

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
  isActive: boolean;
}

const Halaman14 = ({ data, isActive }: Props) => {
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

  return (
    <div
      className="Kertas__half Kertas__half--back flex w-full h-full"
      style={{background: data.theme?.warna1,color: data.theme?.warna2,}}>
      {data.Papper?.Halaman14 ? (
        <img src={data.Papper.Halaman14}alt=""className="absolute inset-0 w-full h-full object-cover"/>) : (
        <div className="flex flex-col items-center mt-2 w-full h-full" style={{pointerEvents: isActive ? "auto" : "none",}}>
          <h2 className="text-2xl font-Colvetica"> Wedding Gift</h2>
          <div className="w-full px-2 mt-2">
            {data.WeddingGift?.rekening?.map((rekening, index) => {
              const bank = rekening.bank?.toUpperCase() ?? "";
              const logo = GiftLogo[bank];

              return (
                <div className="border rounded-lg p-1 mb-2 flex flex-col items-center text-xs"
                  key={index}>
                  {logo && (
                    <img src={logo} alt={rekening.bank} 
                    className=" object-contain h-7 mb-2"/> )}
                    <p className="text-sm"> Nomor Rekening </p>
                    <div className="flex gap-1">

                    <p className="font-bold">{rekening.nomorRekening}</p>

                    <button 
                      onClick={() =>navigator.clipboard.writeText(rekening.nomorRekening ?? "")}>
                      <i className="fa-regular fa-copy"></i>
                    </button>
                    </div>
                    <p> a.n. {rekening.atasNama}</p>

                  </div>
              );
            })}

            <div className="border rounded-lg p-1 mb-2 flex flex-col items-center text-xs">
              <i className="fa-solid fa-gift text-3xl"></i>

              <div>
                {/* <p className="font-bold">
                  {data.WeddingGift?.alamat?.penerima}
                </p> */}

                <p>
                  {data.WeddingGift?.alamat?.alamat}
                </p>
             
                <button className="border px-2 rounded py-1"
                style={{background: data.theme?.warna2,color: data.theme?.contrasfont}}
                  onClick={() =>navigator.clipboard.writeText(data.WeddingGift?.alamat.alamat ?? "")}>
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
    </div>
  );
};

export default Halaman14;