import { useState } from "react";
import projects from "../../Products/Product";
import Modal from "../UI/Modal";

export const Catalogue = () => {
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  return (
    <section id="Katalog" className="p-4">
      <h1 className="text-4xl md:text-5xl text-gray-800 leading-tight mb-4">Katalog</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {projects.map((contoh, index) => (
          <div key={index} className="border border-white p-2 rounded-xl bg-[#48A6A7] flex flex-col min-w-0">
            <p className="text-white text-sm md:text-xl font-medium mb-2 truncate">{contoh.title}</p>
            <div className="w-full aspect-[3/4] overflow-hidden rounded-lg">
              <img src={contoh.img} alt={contoh.title} className="w-full h-full object-contain" />
            </div>
            <div className="grid gap-2 mt-2">
              <button onClick={() => setModalUrl(contoh.demoUrl)} className="bg-[#F2EFE7] text-[#08060d] text-sm p-2 rounded-full cursor-pointer hover:bg-[#48A6A7] hover:text-white border border-white transition">Open Demo</button>
              <button className="bg-[#F2EFE7] text-[#08060d] text-sm p-2 rounded-full cursor-pointer hover:bg-[#48A6A7] hover:text-white border border-white transition">Order</button>
            </div>
          </div>
        ))}
      </div>
      {modalUrl && (
        <div className="fixed inset-0 z-[9999]">
          <Modal isOpen={true} onClose={() => setModalUrl(null)}>
            <iframe src={modalUrl} title="Project Demo" sandbox="allow-scripts allow-same-origin" className="w-full h-full border-0" />
          </Modal>
        </div>
      )}
    </section>
  );
};