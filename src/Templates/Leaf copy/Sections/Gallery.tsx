import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  scrollY: number;
  openGallery: (index: number) => void;
}

const progress = (
  scroll: number,
  start: number,
  end: number
) => {
  return Math.min(
    Math.max((scroll - start) / (end - start), 0),
    1
  );
};

const Gallery = ({ data, scrollY, openGallery }: Props) => {


  const p = progress(scrollY, 3100, 3500);
  const kiriX = -100 + 100 * p;
  const kananX = 100 - 100 * p;
  // const tulisanY = 200 - 200 * p;


  const galleryLayout = [
    {
      col: "col-span-2",
      row: "row-span-2",
      posisi: "kiri",
    },
    {
      col: "col-span-2",
      row: "row-span-4",
      posisi: "kanan",
    },
    {
      col: "col-span-2",
      row: "row-span-4",
      posisi: "kiri",
    },
    {
      col: "col-span-2",
      row: "row-span-2",
      posisi: "kanan",
    },
    
  ];
  // const isActive = scrollY >= 3534 && scrollY < 1608;
  // console.log(scrollY)

  return (
    /*
      INI JANGAN absolute.
      Karena section harus bisa punya tinggi lebih dari 100vh
      supaya video berada DI BAWAH gallery.
    */
    <section className="relative w-full ">
      <div className={`h-screen overflow-hidden absolute inset-0 flex flex-col `}>


        {/* GRID FOTO ${isActive ? "pointer-events-auto z-50" : "pointer-events-none z-0"}*/}

        {/* JUDUL */}
        <div className="flex justify-center overflow-hidden w-full text-5xl font-semibold py-2 font-ColveticaCond">
            <p className="mr-3" style={{transform: `translateX(${kiriX *3}%)`}}>Galery </p> 
            <p style={{transform: `translateX(${kananX *3}%)`}}>Photo </p>
        </div>
        <div className=" grid flex-1 grid-cols-4 grid-flow-dense mt-2 gap-[6px]  overflow-hidden ">

          {galleryLayout.map((item, index) => {
            const image = data.gallery?.[index];

            if (!image) return null;

            const translateX =item.posisi === "kiri"? kiriX: kananX;

            return (
              <div key={index}
                className={`${item.col} ${item.row} relative overflow-hidden `}
                style={{transform: `translateX(${translateX}%)`}}>
                <img src={image} alt={`foto ${index + 1}`} loading="lazy"
                  className=" block w-full h-full object-cover object-center"
                  onClick={() => openGallery(index)}/>
              </div>
              );
            })}

        </div>

      </div>
    </section>
  );
};

export default Gallery;