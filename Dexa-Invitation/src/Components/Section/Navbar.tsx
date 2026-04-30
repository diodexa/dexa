import { useState } from "react"

type Navbarprops = {
    activeSection : string
}
export const Navbar = ({activeSection} : Navbarprops)=> {
    const menu = [
        {name: "Home", id: "home"},
        {name: "Fitur", id: "fitur"},
        {name: "Katalog", id: "katalog"},
        {name: "FAQ", id: "faq"},
    ]
    const [isOpen, setisOpen] = useState (false);
    const toggleMenu = () => setisOpen(!isOpen);

    return (
            <div className="fixed flex justify-between items-center w-full p-4 border-b-1 border-gray-300 bg-[#F2EFE7] ">
                <a href="https://dexa-invitation.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo-dio.webp" className="max-h-25 w-auto object-contain"  />
                    <div className="flex flex-col">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-teal-500 dark:text-white">DEXA </span>
                        <span className="self-center text-2xs whitespace-nowrap text-teal-500 dark:text-white"> invitation  </span>
                    </div>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  dark:text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700 " onClick={toggleMenu}>
                    {isOpen? (
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>) : 
                    (
                     <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>   
                    )}
                </button>
                <div className= {`${isOpen ? "block bg-[#f2efe7bf] absolute  top-25 left-0" : "hidden"} w-full md:block md:w-auto text-right`}>
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-700 md:dark:bg-gray-700 dark:border-gray-700">
                        {menu.map((item)=>(
                            <li key={item.id}>
                                <a href={`#${item.id}`}
                                className={`block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#2973B2] md:p-3 dark:text-white md:dark:hover:text-teal-500 dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${activeSection === item.id ? "text-[#2973B2]" : "text-black"} `}> {item.name} </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        
    )
}