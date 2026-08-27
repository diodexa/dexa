import type { Invitation } from "../../../types/invitationType";
import { FloralFlower } from "../utils/floralSvg";

interface Props {
  data: Invitation;
  scrollY: number;
}

const Ayat = ({ data }: Props) => {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-8 text-center"
      style={{
        background: data.theme?.warna2,
        color: data.theme?.warna1,
      }}
    >
      <div className="absolute">
        <FloralFlower
          color={data.theme?.warna3}
          size={300}
          opacity={0.08}
        />
      </div>

      <div className="relative z-10">
        <p className="font-serif text-2xl leading-loose">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم
          مِّنْ أَنفُسِكُمْ أَزْوَاجًا
        </p>

        <p className="mt-8 text-sm italic leading-7">
          "Dan di antara tanda-tanda kekuasaan-Nya
          ialah Dia menciptakan untukmu pasangan
          dari jenismu sendiri."
        </p>

        <p className="mt-5 text-xs tracking-widest">
          QS. Ar-Rum : 21
        </p>
      </div>
    </section>
  );
};

export default Ayat;
