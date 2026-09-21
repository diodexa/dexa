import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
}

const Closing = ({ data }: Props) => {
  const images = data.gallery ?? [];

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 pb-8 pt-16 text-center" style={{ color: data.theme?.contrasfont }}>
      <div className="absolute inset-0 h-full w-full bg-white/80" />
      <div className="pointer-events-none absolute -left-20 top-20 h-[260px] w-[180px] rounded-full opacity-30 blur-2xl" style={{ background: data.theme?.warna1 }} />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-[280px] w-[180px] rounded-full opacity-25 blur-2xl" style={{ background: data.theme?.warna2 }} />

      <div className="relative z-10 flex min-h-[calc(100vh-6rem)] w-full max-w-[500px] flex-col items-center">
        <div>
        
          <h2 className="mt-3 text-5xl" style={{ color: data.theme?.warna3 }}>Thank you</h2>
        </div>

        {images.length > 0 && (
        <div className="relative mt-8 flex h-[350px] w-[280px] items-center justify-center">
            <div className="absolute h-[335px] w-[245px] rounded-t-[130px] rounded-b-[8px] border-2 opacity-40" style={{ borderColor: data.theme?.warna2 }} />
            <div className="absolute h-[320px] w-[230px] rounded-t-[120px] rounded-b-[6px] border opacity-30" style={{ borderColor: data.theme?.warna1 }} />

            <div className="relative mt-4 h-[285px] w-[190px] overflow-hidden rounded-t-[100px] rounded-b-[8px] border-[3px]" style={{ borderColor: `${data.theme?.warna3}70` }}>
            {images.map((image, index) => (
                <div key={index} className="absolute inset-0" style={{ opacity: 0, animation: "zoomfade 12s infinite", animationDelay: `${index * 4}s` }}>
                <img src={image} alt="" className="h-full w-full object-cover" />
                </div>
            ))}
            </div>

            <div className="pointer-events-none absolute -bottom-5 -left-20 h-auto w-[180px]">
            <img src="/Ornament/LilyWhite.webp" alt="" className="h-full w-full object-contain object-bottom" />
            </div>

            <div className="pointer-events-none absolute -bottom-5 -right-10 h-[100px] w-[120px]">
            <img src="/Ornament/BungaPinkTunggal2.webp" alt="" className="h-full w-full object-contain object-bottom scale-x-[-1]" />
            </div>
        </div>
        )}

        <div className="mt-8 max-w-[350px]">
          <p className="whitespace-pre-line text-xs leading-6">{data.Closing}</p>
        </div>

        <div className="mt-8">
          <p className="mb-2 text-[8px] uppercase tracking-[.4em]">With Love</p>
          <p className="text-4xl font-BylinerScript" style={{ color: data.theme?.warna3 }}>
            {data.NamabridePanggilan} & {data.NamagroomPanggilan}
          </p>
        </div>

        <footer className="mt-auto flex flex-col items-center justify-center pt-10">
          <div className="w-10">
            <img src="/logo-dio.webp" alt="" />
          </div>
          <p className="text-[9px] tracking-[.25em]">dexa-invitation.com</p>
        </footer>
      </div>
    </section>
  );
};

export default Closing;