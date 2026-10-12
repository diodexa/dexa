
import { useState } from "react";
import projects from "../../Products/Product";
import Modal from "../UI/Modal";
import { trackEvent } from "../../utils/analytics";


export const Catalogue = () => {
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const openDemo = (contoh: (typeof projects)[number]) => {
    trackEvent("demo_open", {
      template: contoh.title,
    });

    setActiveDemo(contoh.title);
    setModalUrl(contoh.demoUrl);
  };

  const closeDemo = () => {
    setModalUrl(null);
    setActiveDemo(null);
  };

  return (
    <section id="katalog" className="p-4">
      <h1 className="text-4xl md:text-5xl text-gray-800 leading-tight mb-4">Katalog</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {projects.map((contoh, index) => (
          <div key={index} className="border border-white p-2 rounded-xl bg-[#48A6A7] flex flex-col min-w-0">
            <p className="text-white text-sm md:text-xl font-medium mb-2 truncate">{contoh.title}</p>
            <div className="w-full aspect-[3/4] overflow-hidden rounded-lg">
              <img src={contoh.img} alt={contoh.title} className="w-full h-full object-contain" />
            </div>
            <div className="grid gap-2 mt-2">
              <button
                onClick={() => openDemo(contoh)}
                className="bg-[#F2EFE7] text-[#08060d] text-sm p-2 rounded-full cursor-pointer hover:bg-[#48A6A7] hover:text-white border border-white transition"
              >
                Open Demo
              </button>
              <a
                href={`https://api.whatsapp.com/send/?phone=6285155001718&text=${encodeURIComponent(`Hai Min Saya mau Pesan Undangan Digitalnya dong yang ${contoh.title}`)}&type=phone_number&app_absent=0`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_order_click", {
                    template: contoh.title,
                    button_location: "catalogue",
                  })
                }
              >
                <button className="bg-[#F2EFE7] text-[#08060d] text-sm p-2 w-full rounded-full cursor-pointer hover:bg-[#48A6A7] hover:text-white border border-white transition">
                  Order
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {modalUrl && (
        <div className="fixed inset-0 z-[9999]">
          <Modal isOpen={true} onClose={closeDemo}>
            <iframe
              key={modalUrl}
              src={modalUrl}
              title={`Demo ${activeDemo ?? "Undangan"}`}
              onLoad={() => {
                trackEvent("demo_iframe_loaded", {
                  template: activeDemo ?? "unknown",
                });
              }}
              sandbox="allow-scripts allow-same-origin"
              className="w-full h-full border-0"
            />
          </Modal>
        </div>
      )}
    </section>
  );
};
