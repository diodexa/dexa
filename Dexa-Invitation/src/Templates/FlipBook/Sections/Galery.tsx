import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation;
}

const Gallery = ({ data }: Props) => {
  return (
    <section>
      <h2>Gallery</h2>

      {data.gallery.map((image) => (
        <img
          key={image}
          src={image}
          alt="gallery"
          width={200}
        />
      ))}
    </section>
  );
};

export default Gallery;