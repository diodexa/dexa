import type { Invitation } from "../../../types/invitation";

interface Props {
  data: Invitation;
}

export const CoverBook = ({data}:Props)=> {
    return (
        <section className="book-wrapper">
            <div className="book">
                <div className="book-cover">
                <img src={data.coverImage} alt=""className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
                <div className="absolute z-20 bottom-20 left-0 w-full text-center p-2 text-white">
                    <p>Wedding Invitation</p>
                    <h1 className="Judul">{data.bride} & {data.groom}</h1>
                    <p>{data.date}</p>
                </div>
                </div>
            </div>

        </section>
    )
}