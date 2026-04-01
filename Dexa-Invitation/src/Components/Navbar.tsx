export const Navbar = ()=> {
    return (
        <div>
            <div className="flex justify-between items-center w-screen-xl p-4 ">
                <a href="https://dexa-invitation.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo-dio.webp" className="max-h-25 w-auto object-contain"  />
                    <div className="flex flex-col">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-teal-500 dark:text-white">DEXA </span>
                        <span className="self-center text-2xs whitespace-nowrap text-teal-500 dark:text-white"> invitation  </span>
                    </div>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center bg-white text-sm  dark:text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700 " aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-700 md:dark:bg-gray-700 dark:border-gray-700">
                        <li>
                        <a href="#Home" className="block py-2 px-3 text-black rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-3 dark:text-white md:dark:hover:text-teal-500 dark:hover:bg-gray-700  md:dark:hover:bg-transparent" aria-current="page">Home</a>
                        </li>
                        <li>
                        <a href="#catalogue" className="block py-2 px-3 text-black rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-3 dark:text-white md:dark:hover:text-teal-500 dark:hover:bg-gray-700  md:dark:hover:bg-transparent ">Catalogue</a>
                        </li>
                        <li>
                        <a href="#Contact" className="block py-2 px-3 text-black rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-3 dark:text-white md:dark:hover:text-teal-500 dark:hover:bg-gray-700 dark:hover:text-teal-500 md:dark:hover:bg-transparent nav-default">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}