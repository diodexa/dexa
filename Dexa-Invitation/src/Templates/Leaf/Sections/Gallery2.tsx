import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
}



const Gallery2 = ({ data }: Props) => {

    const gallerySisa = data.gallery?.slice(4) ?? [];



  const galleryLayout =
    gallerySisa.length === 1
        ? [{col: "col-span-4",
            row: "row-span-2"}]

        : gallerySisa.length === 2
        ? [{col: "col-span-2",
            row: "row-span-3"},

            {col: "col-span-2",
             row: "row-span-3"}]
        : gallerySisa.length === 3
        ? [{col: "col-span-4",
            row: "row-span-2"},

            {col: "col-span-2",
             row: "row-span-3"},

            {col: "col-span-2",
             row: "row-span-3"},
            ] : 
            [{col: "col-span-4",
            row: "row-span-2"},

            {col: "col-span-2",
             row: "row-span-3"},

            {col: "col-span-2",
             row: "row-span-3"},
            
             {col: "col-span-4",
            row: "row-span-2"},
            ];


  return (
    /*
      INI JANGAN absolute.
      Karena section harus bisa punya tinggi lebih dari 100vh
      supaya video berada DI BAWAH gallery.
    */
    <section className="relative w-full">

      {/* ================================= */}
      {/* BAGIAN GALLERY YANG DIANIMASIKAN */}
      {/* ================================= */}

      <div className=" h-full overflow-hidden  inset-0 flex flex-col">


          {/* GRID FOTO */}

          <div className=" grid flex-1 grid-cols-4 grid-flow-dense gap-[6px] auto-rows-[90px] overflow-hidden ">

            {galleryLayout.map((item, index) => {
              const image = data.gallery?.[index + 4];

              if (!image) return null;


              return (
                <div key={index}
                  className={`${item.col} ${item.row} relative overflow-hidden`}>
                  <img src={image} alt={`foto ${index + 1}`} loading="lazy"
                    className=" block w-full h-full object-cover object-center"/>
                </div>
              );
            })}

          </div>
      </div>
    </section>
  );
};

export default Gallery2;