import { useState } from "react";
import projects from "../../Products/Product";
import Modal from "../Modal";




export const Catalogue = ()=> {
    const [modalUrl, setModalUrl] = useState<string | null>(null);
   
    return (
        <div className=" p-4" id="katalog">
            <h1>Katalog</h1>
            <div className="flex flex-wrap gap-4 ">
                {projects.map((contoh,index)=>(
                    <div key={index} className="border-1 border-white p-2 min-w-3xs flex flex-col flex-1 rounded-xl bg-[#48A6A7]" >
                        <p className="text-white text-xl">{contoh.title} </p>
                        <img src={contoh.img} alt={contoh.title} className="grow-1" />
                        <div className="grid gap-2">
                            <button onClick={()=>setModalUrl(contoh.demoUrl)} className="bg-[#F2EFE7] text-[#08060d] p-2 rounded-4xl cursor-pointer hover:bg-[#48A6A7] hover:text-white border-1 border-white"> Open Demo </button>
                            <button className="bg-[#F2EFE7] text-[#08060d] p-2 rounded-4xl cursor-pointer hover:bg-[#48A6A7] hover:text-white border-1 border-white">Order</button>
                            
                        </div>
                    </div>
                ))}
                {modalUrl && (
                    <Modal isOpen={true} onClose={() => setModalUrl(null)}>
                        <iframe src={modalUrl} title="Project Demo" sandbox="allow-scripts allow-same-origin" className="w-full h-full border-0"></iframe>
                    </Modal>
                )}
            </div>
        </div>
    )
}