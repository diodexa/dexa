import type { Invitation } from "../../types/invitation";
import Couple from "./Sections/Couple";
import Gallery from "./Sections/Galery";
import Hero from "./Sections/Hero";



interface Props {
  data: Invitation;
  guest: string;
}

const FlipBook = ({ data, guest }: Props) => {
  return (
    <>
      <Hero data={data} guest={guest}  />

      <Couple data={data} />

      <Gallery data={data} />
    </>
  );
};

export default FlipBook;