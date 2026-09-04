import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  scrollY: number;
}

const Closing = ({ data }: Props) => {
  const images = data.gallery ?? [];

  return (
    <section
      className="relative h-[110vh] w-full overflow-hidden"
      style={{ background: data.theme?.warna1 }}
    >
      {images.slice(0, 3).map((image, index) => (
        <div key={index}
          className="absolute inset-0"
          style={{ opacity: 0, animation: "zoomfade 12s infinite", animationDelay: `${index * 4}s`,}}>
          <img src={image}alt=""
            className="h-full w-full object-cover"/>
        </div>
      ))}

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            to top,
            ${data.theme?.warnaweddingInvitation} 0%,
            ${data.theme?.warnaweddingInvitation} 20%,
            transparent 65%
          )`,
        }}
      />

      <div className="absolute bottom-0 left-0 z-20 w-full px-6 pb-20 text-center">
        <p className="mx-auto mb-5 max-w-[500px] whitespace-pre-line text-sm leading-relaxed"
          style={{ color: data.theme?.warna3 }}>
          {data.Closing}
        </p>

        <p className="font-BetterChill text-4xl leading-none"
          style={{ color: data.theme?.warna3 }}>
          {data.NamabridePanggilan} & {data.NamagroomPanggilan}
        </p>
      </div>
    </section>
  );
};

export default Closing;