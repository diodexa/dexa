import type { Invitation } from "../../../types/invitationType";
import { FloralFlower } from "../utils/floralSvg";

interface Props {
  data: Invitation;
  scrollY: number;
}

const Story = ({ data }: Props) => {
  return (
    <section
      className="relative min-h-screen overflow-hidden px-6 py-16"
      style={{
        background: data.theme?.warna2,
        color: data.theme?.warna1,
      }}
    >
      <div className="absolute right-0 top-0">
        <FloralFlower
          color={data.theme?.warna3}
          size={180}
          opacity={0.25}
        />
      </div>

      <div className="relative z-10">
        <p className="text-center text-[10px] uppercase tracking-[0.4em]">
          Our Journey
        </p>

        <h2 className="mt-3 text-center font-serif text-4xl">
          Story of Love
        </h2>

        <div className="mt-12 space-y-6">
          {data.Story?.map((story, index) => (
            <div
              key={index}
              className={`border-b pb-5 ${
                index % 2
                  ? "text-right"
                  : "text-left"
              }`}
              style={{
                borderColor: data.theme?.warna3,
              }}
            >
              <p className="font-serif text-xl">
                {story.Head}
              </p>

              <p className="mt-2 text-sm leading-6">
                {story.Story}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Story;
