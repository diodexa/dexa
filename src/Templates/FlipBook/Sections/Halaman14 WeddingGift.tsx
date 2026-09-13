import type { Invitation } from "../../../types/invitationType";
import { GiftLogo } from "../../1.Components/Giftlogo";

interface Props {
  data: Invitation;
  isActive: boolean;
  onCopy: (text: string) => void;
}

const Halaman14 = ({ data, isActive, onCopy }: Props) => {

  
  return (
    <div
      className="Kertas__half Kertas__half--back flex w-full h-full"
      style={{background: data.theme?.warna1, color: data.theme?.warna2,}}>
      {data.Background?.Background14 ? (
        <img src={data.Background.Background14}alt=""className="absolute inset-0 w-full h-full object-cover"/>) : (
        <div className="flex flex-col items-center mt-2 w-full h-full" style={{pointerEvents: isActive ? "auto" : "none", }}>
          <h2 className="text-2xl font-ColveticaCond tracking-[0.2rem] "> Wedding Gift</h2>
          <div className="w-full px-2 mt-2">
            {data.WeddingGift?.rekening?.map((rekening, index) => {
              const bank = rekening.bank?.toUpperCase() ?? "";
              const logo = GiftLogo[bank];

              return (
                <div className="border rounded-lg p-1 mb-2 flex flex-col items-center text-xs"
                  key={index}>
                  {logo && (
                    <img src={logo} alt={rekening.bank} 
                    style={{filter: `drop-shadow(0 0 2px white`}}
                    className=" object-contain h-7 my-2 " /> )}
                    <div className="flex gap-1">

                    <p className="font-bold" >{rekening.nomorRekening}</p>

                    <button
                      type="button"
                      onClick={() => alert("COPY REKENING")} 
                      >
                      <i className="fa-regular fa-copy" />
                    </button>
                    </div>
                    <p> a.n. {rekening.atasNama}</p>

                  </div>
              );
            })}

            <div className="border rounded-lg p-1 mb-2 flex flex-col items-center text-xs">
              <i className="fa-solid fa-gift text-4xl my-1"></i>

              <div>
                {/* <p className="font-bold">
                  {data.WeddingGift?.alamat?.penerima}
                  </p> */}

                <p> {data.WeddingGift?.alamat?.alamat && data.WeddingGift.alamat.alamat.length > 40 ? data.WeddingGift.alamat.alamat.slice(0, 40) + "...": data.WeddingGift?.alamat?.alamat} </p>
             
                <button className="border px-2 rounded py-1"
                style={{background: data.theme?.warnaButtonBackground,color: data.theme?.contrasfont}}
                onClick={() => onCopy(data.WeddingGift?.alamat?.alamat ?? "")}>
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