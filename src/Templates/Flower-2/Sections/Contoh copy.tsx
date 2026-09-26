import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
}

const Story = ({ data, animate }: Props) => {
  const stories = data.Story ?? [];

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-20" style={{ color: data.theme?.contrasfont, background:data.theme?.warna1 }}>
      <div className={`relative z-10 w-full max-w-[430px] ${animate ? "Fadein-1" : "opacity-0"}`}>
        <div className="mb-12 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] opacity-50">Our Journey Together</p>
          <h2 className="mt-2 text-5xl" style={{ color: data.theme?.warna3 }}>Our Story</h2>
          <p>ini yang ke 3</p>
        </div>

        <div className="space-y-8">
          {stories.map((story, index) => {
            const cleanHead = story.Head.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
            const match = cleanHead.match(/^(.*?)\s*[—–-]\s*(.+)$/);
            const date = match ? match[1].trim() : cleanHead;
            const title = match ? match[2].trim() : "";

            return (
              <article key={index} className={`relative ${index % 2 === 0 ? "mr-5" : "ml-5"}`}>
                <div className="relative rounded-sm border px-6 py-6 shadow-sm" style={{ background: `${data.theme?.warna2}25`, borderColor: `${data.theme?.warna3}20`, transform: `rotate(${index % 2 === 0 ? "-0.6deg" : "0.6deg"})` }}>
                  <div className="text-center">
                    <p className="text-[8px] uppercase tracking-[0.3em] opacity-50">{date}</p>
                    <div className="mx-auto mt-3 h-px w-8" style={{ background: data.theme?.warna3 }} />
                    <h3 className="mt-3 text-xl" style={{ color: data.theme?.warna3 }}>{title}</h3>
                    <p className="mt-3 text-xs leading-6 opacity-65">{story.Story}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Story;