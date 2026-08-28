import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
}

const Story = ({ data }: Props) => {
  return (
    <section className="px-6 py-24 overflow-x-clip"
    style={{backgroundColor: data.theme?.warna2, color:data.theme?.warna1}}>

      <div className="max-w-md mx-auto FadeinScale">

        <div className="text-center">
          <p className="text-xs tracking-[0.4em] uppercase"
          style={{color:`color-mix(in srgb, ${data.theme?.warna1} 50%, transparent)`}}>
            Our Journey
          </p>

          <h2 className="mt-4 text-4xl font-serif">
            Our Story
          </h2>
        </div>

        <div className="mt-12">

          <img
            src={data.gallery?.[2] ?? ""}
            alt=""
            className="w-full h-[320px] object-cover "
          />
          {data.Story?.map((Cerita,index)=>{
            return (
              <div key={index} className="mt-8">

                <h3 className="text-3xl font-serif">
                  {Cerita.Head}
                </h3>

                <p className="mt-3 text-sm leading-7 "
                style={{color:`color-mix(in srgb, ${data.theme?.warna1} 60%, transparent)`}}>
                  {Cerita.Story}
                </p>
              </div>
            );
          })}
          

        </div>

      </div>

    </section>
  );
};

export default Story;