
export const Feature = ()=> {
    return (
        <div id="fitur" className="grid grid-cols-1 md:grid-cols-2 items-center  p-8 md:p-12 gap-8">
    
            <div className="flex justify-center " > 
                <img src="/feature.png" alt="Undangan Digital di HP" className="w-1/2 max-w-xs md:max-w-sm lg:max-w-md h-auto"/>
            </div>

            {/* <div className="hidden lg:block lg:col-span-1" > </div> */}

            <div className="md:col-span-1 lg:col-span-1 flex flex-col items-start self-stretch mt-4"> 
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-800 dark:text-white leading-tight text-left">
                    Fitur Eksklusif untuk Momen Spesialmu
                </h1>
                <p className="text-justify md:text-lg text-gray-600 dark:text-gray-300 max-w-lg mt-8 mb-auto">
                    Hanya dengan <span className="text-[#48A6A7] text-xl">IDR 99K</span> Semua yang kamu butuhkan untuk membuat undangan digital yang elegan dan berkesan
                </p>
                <div className="md:col-span-1 lg:col-span-1 flex flex-col items-center self-stretch h-10"> </div>
                <div className="md:col-span-1 lg:col-span-3 flex flex-col  self-stretch"> 
                    <div className="text-left"> 
                        <ul className="grid grid-cols-2">
                            <li className="relative pl-7 before:content-['✓'] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:flex before:items-center before:justify-center before:rounded-full before:bg-[#2973B2] before:text-white before:text-xs"> Unlimited Nama Tamu Undangan</li>
                            <li className="relative pl-7 before:content-['✓'] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:flex before:items-center before:justify-center before:rounded-full before:bg-[#2973B2] before:text-white before:text-xs"> Bebas pilih Musik Latar</li>
                            <li className="relative pl-7 before:content-['✓'] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:flex before:items-center before:justify-center before:rounded-full before:bg-[#2973B2] before:text-white before:text-xs"> Masa aktif 2 tahun</li>
                            <li className="relative pl-7 before:content-['✓'] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:flex before:items-center before:justify-center before:rounded-full before:bg-[#2973B2] before:text-white before:text-xs"> Hitung Mundur Waktu Acara</li>
                            <li className="relative pl-7 before:content-['✓'] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:flex before:items-center before:justify-center before:rounded-full before:bg-[#2973B2] before:text-white before:text-xs"> Galeri foto + video</li>
                            <li className="relative pl-7 before:content-['✓'] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:flex before:items-center before:justify-center before:rounded-full before:bg-[#2973B2] before:text-white before:text-xs"> Form RSVP & Ucapan</li>
                            <li className="relative pl-7 before:content-['✓'] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:flex before:items-center before:justify-center before:rounded-full before:bg-[#2973B2] before:text-white before:text-xs"> Amplop digital</li>
                            <li className="relative pl-7 before:content-['✓'] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:flex before:items-center before:justify-center before:rounded-full before:bg-[#2973B2] before:text-white before:text-xs"> Custom warna tema undangan</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}