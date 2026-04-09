export const Hero = ()=> {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center  p-8 md:p-12 gap-8">
    
            <div className="flex justify-center " > 
                <img src="/hp.webp" alt="Undangan Digital di HP" className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto"/>
            </div>

            {/* <div className="hidden lg:block lg:col-span-1" > </div> */}

            <div className="md:col-span-1 lg:col-span-1 flex flex-col items-start self-stretch"> 
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-800 dark:text-white leading-tight text-left">
                    Undangan <span className="text-[#48A6A7]">Digital</span>  Interaktif
                </h1>
                <p className="text-justify md:text-lg text-gray-600 dark:text-gray-300 max-w-lg mt-8 mb-auto">
                    Buat undanganmu lebih menarik dan tidak itu-itu saja
                </p>
                <div className="md:col-span-1 lg:col-span-1 flex flex-col items-center self-stretch h-10"> </div>
                <div className="md:col-span-1 lg:col-span-3 flex flex-col  self-stretch"> 
                    <div className="flex items-center"> 
                        <button className="bg-[#48A6A7] border border-gray-400 text-white dark:text-white dark:border-gray-400 font-medium py-3 px-8 rounded-lg transition duration-300 hover:bg-gray-100 hover:text-teal-500 dark:hover:bg-white dark:hover:text-teal-500 cursor-pointer" >
                            Lihat Katalog
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}