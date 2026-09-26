import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  animate: boolean;
}

const Story = ({ data, animate }: Props) => {
  const stories = data.Story ?? [];
  const photos = data.gallery ?? [];

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden px-6 py-20" style={{ color: data.theme?.contrasfont, background:data.theme?.warna1 }}>
      <div className={`relative z-10 w-full max-w-[450px] ${animate ? "Fadein-1" : "opacity-0"}`}>
        <div className="mb-10 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] opacity-50">Our Journey</p>
          <h2 className="mt-2 text-5xl" style={{ color: data.theme?.warna3 }}>Our Story</h2>
        </div>

        <div className="space-y-12">
          {stories.map((story, index) => (
            <article key={index} className={`relative ${index % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.5deg]"}`}>
              <div className="bg-white p-3 pb-5 shadow-lg">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  {photos[index] ? (
                    <img src={photos[index]} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center" style={{ background: `${data.theme?.warna3}15` }}>
                      <span className="text-4xl" style={{ color: data.theme?.warna3 }}>♡</span>
                    </div>
                  )}
                </div>

                <div className="px-2 pt-4 text-center">
                  <p className="text-[9px] uppercase tracking-[0.25em]" style={{ color: data.theme?.warna3 }}>
                    {story.Head}
                  </p>
                  <p className="mt-3 text-xs leading-6" style={{ color: data.theme?.contrasfont }}>
                    {story.Story}
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-3 left-1/2 h-5 w-20 -translate-x-1/2 rotate-[-2deg] opacity-40" style={{ background: `${data.theme?.warna3}30` }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Story;