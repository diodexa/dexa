import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
}

const Closing = ({ data }: Props) => {
  const images = data.gallery ?? [];
  const rotations = ["-rotate-[12deg]", "rotate-[8deg]", "-rotate-[5deg]", "rotate-[14deg]", "-rotate-[9deg]", "rotate-[4deg]"];
  const positions = [
    "left-[2%] top-[8%] z-[2]",
    "left-[38%] top-[2%] z-[4]",
    "left-[20%] top-[20%] z-[5]",
    "left-[0%] top-[37%] z-[3]",
    "left-[40%] top-[35%] z-[6]",
    "left-[23%] top-[49%] z-[4]",
  ];

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden px-4 pt-12" style={{ background: data.theme?.warnaweddingInvitation, color: data.theme?.warna3 }}>
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-center gap-1">
          <div className="relative h-[290px] w-[50%] shrink-0">
            {images.slice(0, 6).map((image, index) => (
              <div key={index} className={`absolute ${positions[index]} ${rotations[index]} w-[58%] max-w-[125px] bg-white p-1.5 pb-5 shadow-[0_6px_18px_rgba(0,0,0,0.18)]`}>
                <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                  <img src={image} alt={`Foto pengantin ${index + 1}`} className="h-full w-full object-cover" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex text-sm min-w-0 flex-1 flex-col items-end justify-center py-6 text-right">
            {data.Closing && <p className="whitespace-pre-line  leading-6">{data.Closing}</p>}

          </div>
        </div>

        <div className="relative z-10 mt-2 flex flex-col items-center px-3 pb-8 text-center">
          <span className="mb-3 uppercase tracking-[0.3em] opacity-70">With Love</span>
          <h2 className="break-words text-6xl leading-tight font-KH-Blackline">
            {data.NamabridePanggilan}
            <span className="mx-2 italic" style={{ color: data.theme?.warna2 }}>&</span>
            {data.NamagroomPanggilan}
          </h2>
        </div>
      </div>

      <footer className="relative z-10 mt-auto flex flex-col items-center pb-6 pt-4">
        <img src="/logo-dio.webp" alt="Dexa Invitation" className="w-8 object-contain" />
        <p className="mt-1 text-[9px] tracking-wide">dexa-invitation.com</p>
      </footer>
    </section>
  );
};

export default Closing;