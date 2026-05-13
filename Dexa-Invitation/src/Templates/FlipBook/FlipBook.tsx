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
    <div className="min-h-screen bg-gray flex justify-center">
      <div className="relative w-full max-w-[430px] bg-white">

        <Hero data={data} guest={guest}  />

        <Couple data={data} />

        <Gallery data={data} />
      </div>
    </div>
  );
};

export default FlipBook;