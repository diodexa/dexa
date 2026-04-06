import { useState } from "react";
import projects from "../Products/Product"
import Modal from "./Modal";


export const Card = ()=> {
    const [modalUrl, setModalUrl] = useState<string | null>(null);
   
    return (
        <div>
            {projects.map((contoh,index)=>(
                <div key={index}>
                    <img src={contoh.img} alt={contoh.title} />
                    <button onClick={()=>setModalUrl(contoh.demoUrl)}> open demo </button>
                    <p>{contoh.title} </p>
                </div>
            ))}
            {modalUrl && (
                <Modal isOpen={true} onClose={() => setModalUrl(null)}>
                    <iframe src={modalUrl} title="Project Demo" sandbox="allow-scripts allow-same-origin" className="w-full h-full border-0"></iframe>
                </Modal>
            )}
        </div>
    )
}