export const CaraMemesan = () => {
  const steps = [
    { number: "01", title: "Pilih Template", text: "Hubungi WhatsApp admin atau klik tombol Order pada katalog untuk memilih template undangan yang kamu inginkan." },
    { number: "02", title: "Kirim Data", text: "Isi data pernikahan seperti data CPP & CPW, foto, tanggal, lokasi, dan informasi lainnya." },
    { number: "03", title: "Kami Buatkan", text: "Setelah data diterima, admin akan mulai membuat undangan digital kamu." },
    { number: "04", title: "Undangan Siap", text: "Kamu akan mendapatkan link khusus seperti dexa-invitation.com/namapasangan-wedding." },
    { number: "05", title: "Sebarkan", text: "Bagikan link undangan kamu kepada keluarga, sahabat, dan seluruh tamu undangan." },
  ];

  return (
    <section id="cara-memesan" className=" py-24 md:py-28">
      <div className="mx-auto max-w-4xl   ">
        <div className="mb-14 w-full flex flex-col items-center justify-center text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Simple & Easy</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Cara Memesan</h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-gray-500">Hanya dengan beberapa langkah, undangan digital kamu siap dibagikan.</p>
        </div>

        <div className="mx-auto max-w-4xl">
        {steps.map((step) => (
            <div key={step.number} className="relative border-t border-gray-200 py-9 md:py-10">
            <div className="absolute left-0 top-7 text-5xl font-light tracking-tight text-gray-300 md:top-8 md:text-6xl">{step.number}</div>
            <div className="mx-auto max-w-2xl text-center">
                <h3 className="text-lg font-semibold md:text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-500">{step.text}</p>
            </div>
            </div>
        ))}
        <div className="border-t border-gray-200" />
        </div>
      </div>
    </section>
  );
};