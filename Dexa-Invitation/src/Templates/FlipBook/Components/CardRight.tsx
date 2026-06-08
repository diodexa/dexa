interface Props {
    Image : string;
    Head : string;
    Content : string;
}
export const CardRight =({Image,Head,Content}:Props)=> {
    return (
        <div className="flex border p-1 w-full">
            <div className="leading-none text-right w-2/4 pr-1">
                <h2 className="text-[0.6rem] mb-1"><strong>{Head}</strong></h2>
                <p className="text-[0.55rem]">{Content}</p>
            </div>
            <div className="relative w-2/4 ">
                <img src={Image} alt="Foto Story" className="w-1/3  absolute inset-0 w-full h-full object-cover object-center" />
            </div>
        </div>
    )
}