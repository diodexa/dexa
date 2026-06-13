interface Props {
    Image : string;
    Head : string;
    Content : string;
}
export const CardLeft =({Image,Head,Content}:Props)=> {
    return (
        <div className="flex border p-1 w-full h-1/2">
            <div className="relative w-2/4 ">
                <img src={Image} alt="Foto Story" className="w-1/3  absolute inset-0 w-full h-full object-cover object-center" />
            </div>
            <div className="leading-none text-left w-2/4 pl-1">
                <h2 className="text-[0.8rem] mb-1"><strong>{Head}</strong></h2>
                <p className="text-[0.6rem]">{Content}</p>
            </div>
        </div>
    )
}