import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
}

const Story2 = ({ data, animate }: Props) => {
  const stories = data.Story ?? [];
  const photos = data.gallery ?? [];

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-20" style={{ color: data.theme?.contrasfont, background:data.theme?.warna1 }}>
      <div className={`relative z-10 w-full max-w-[430px] ${animate ? "Fadein-1" : "opacity-0"}`}>
        <div className="mb-10 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] opacity-50">A Collection Of Memories</p>
          <h2 className="mt-2 text-5xl" style={{ color: data.theme?.warna3 }}>Our Story </h2>
          <p>yang ke 2</p>
        </div>

        <div className="space-y-14">
          {stories.map((story, index) => (
            <article key={index} className="relative">
              <div className="relative mx-auto w-[92%]">
                {photos[index] && (
                  <div className="relative mx-auto mb-5 w-[82%]">
                    <div className="absolute inset-0 translate-x-2 translate-y-2 rotate-2" style={{ background: `${data.theme?.warna3}20` }} />
                    <div className="relative overflow-hidden border-[8px] border-white shadow-lg">
                      <div className="aspect-[4/3]">
                        <img src={photos[index]} alt="" className="h-full w-full object-cover" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-[9px] uppercase tracking-[0.3em]" style={{ color: data.theme?.warna3 }}>
                    {story.Head}
                  </p>
                  <div className="mx-auto my-3 h-px w-12 opacity-30" style={{ background: data.theme?.warna3 }} />
                  <p className="mx-auto max-w-[350px] text-xs leading-6 opacity-65">
                    {story.Story}
                  </p>
                </div>

                {index !== stories.length - 1 && (
                  <div className="mt-10 flex items-center justify-center gap-3">
                    <span className="h-px w-10 opacity-20" style={{ background: data.theme?.warna3 }} />
                    <span className="text-xs" style={{ color: data.theme?.warna3 }}>✦</span>
                    <span className="h-px w-10 opacity-20" style={{ background: data.theme?.warna3 }} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <span className="text-xl" style={{ color: data.theme?.warna3 }}>♡</span>
        </div>
      </div>
    </section>
  );
};

export default Story2;