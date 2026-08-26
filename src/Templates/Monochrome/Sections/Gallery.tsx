import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  openGallery: (index: number) => void;
}

const Gallery = ({ data,openGallery }: Props) => {
  const images = data.gallery ?? [];

  return (
    <section className="px-4 py-24"
    style={{color:data.theme?.warna2, background:data.theme?.warna1}}>

      <div className="max-w-md mx-auto">

        <div className="text-center mb-10 FadeinScale">

          <p className="text-xs tracking-[0.4em] uppercase "
          style={{color:`color-mix(in srgb, ${data.theme?.warna2} 50%, transparent)`}}>
            Memories
          </p>

          <h2 className="mt-4 text-4xl font-serif">
            Our Gallery
          </h2>

        </div>

        <div className="grid grid-cols-2 gap-2">

          {images.map((image, index) => (
            <div key={index}
              className={`overflow-hidden ${
                index % 3 === 0 ? "col-span-2 h-80 MunculKiri": "h-52 MunculKanan"}`}>
              <img src={image}
                alt=""
                className="w-full h-full object-cover  transition duration-700"
                onClick={()=>openGallery(index)}
              />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Gallery;