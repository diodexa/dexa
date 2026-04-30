export const FAQ = ()=> {
    return (
        <div id="faq" className="p-8 md:p-12 text-sm lg:text-base md:text-base mb-10">
            <h1>FAQ</h1>
            <div className="md:col-span-1 lg:col-span-3 flex flex-col self-stretch pt-10">
                <div className="text-left">
                    <ul className="grid grid-cols-2 gap-8">
                        <li>
                            <strong>Berapa lama proses pembuatannya?</strong>
                            <p>Untuk pembuatannya dilakukan oleh admin, jadi proses pengerjaannya MAX 2 hari (disesuaikan antrian)</p>
                        </li>
                        <li>
                            <strong>Apakah tema bisa di custom? </strong>
                            <p>Tentu bisa. Kamu bisa custom warna tema, jenis font dan lainnya :) Tinggal hubungi admin aja langsung ya {":)"} </p>
                        </li>
                        <li>
                            <strong>Ada batas kirim undangan?</strong>
                            <p>Ga ada dong. Kamu bisa kirim undangan semaumu Tanpa Batas {":)"}</p>
                        </li>
                        <li>
                            <strong>Apakah ada masa aktif? </strong>
                            <p>Ga ada masa aktif, ga seperti undangan digital web lainnya, undangan dari dexa-invitation bakal bisa di akses terus </p>
                        </li>
                        <li>
                            <strong>Apakah bisa kirim undangan sekaligus?</strong>
                            <p>Bisa dong.  Kamu bisa kirim langsung ke banyak tamu dalam satu klik melalui Whatsapp tau media lainnya tanpa perlu kirim manual satu per satu {":)"}</p>
                        </li>
                        <li>
                            <strong>Gimana cara pesannya?</strong>
                            <p>Langsung hubungi admin di Whatsapp, isi data untuk undangan kamu, Undangan selesai setelah lakukan pembayaran {":)"}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}