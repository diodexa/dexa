import { useState } from "react";
import type { Invitation } from "../../../types/invitationType";
import { postComment } from "../../Components/ChatService";

interface Props {
  data: Invitation
  isActive: boolean;
  loadComments: () => Promise<void>;
}

const Halaman12 = ({data,isActive, loadComments}:Props) =>  {
  const idUndangan = `${data.template} ${data.NamabridePanggilan}-${data.NamagroomPanggilan}`
  const [nama,setNama] = useState ("");
  const [ucapan,setUcapan] = useState ("");
  const [kehadiran,setKehadiran] = useState ("Hadir");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim() || !ucapan.trim()) {
      alert("Isi nama atau ucapannya dulu ya :)");
      return;
    }

    const formData = new FormData();
    formData.append("id", idUndangan);
    formData.append("Nama", nama.trim());
    formData.append("Kehadiran", kehadiran);
    formData.append("Ucapan", ucapan. trim());

    setLoading(true);
    try {
      await postComment(formData);
      await loadComments();

      setNama("");
      setUcapan("");
      setKehadiran("Hadir");
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim. Coba ulangi ya");
    }
    finally {setLoading(false)}
  };


  return (
    <div className="Kertas__half Kertas__half--back  flex w-full h-full lg:text-[0.6rem]"
    style={{background: data.theme?.warna1, color: data.theme?.warna2}}>
      {data.Background?.Background12 ? (
        <img src={data.Background?.Background12} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ): <>
        <div className="flex flex-col justify-center mt-2 w-full  " style={{pointerEvents: isActive ? "auto" : "none"}}>
            <h2 className="font-Colvetica text-2xl">Ucapan & Doa</h2>
            <form className="mx-2 " onSubmit={handleSubmit}>
              <input required
              type="text" 
              placeholder="Isi Nama"
              value={nama} 
              onChange={(e) => setNama(e.target.value)} className="border text-center w-full mb-2 break-words"/>
              <textarea  required
              placeholder="isi pesan kamu" 
              className="border  w-full px-1" 
              value={ucapan}
              onChange={(e) => setUcapan(e.target.value)}/>
              <div className="flex w-full justify-end">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={kehadiran === "Hadir"}
                    style={{accentColor: data.theme?.warna2}}
                    onChange={(e) =>
                      setKehadiran(e.target.checked ? "Hadir" : "Tidak Hadir")
                    }
                  />
                  Hadir
                </label>

                <button className={`border p-2 lg:p-1  rounded-lg ${loading? "opacity-50 cursor-not-allowed" : ""}`}
                style={{background:data.theme?.warna2, color:data.theme?.contrasfont}}
                type="submit" 
                disabled={loading}> {loading ? "Mengirim..." : "Kirim Pesan"}</button>
              </div>
            </form>
            
        </div>
        
      </>}
    </div>
  )
};

export default Halaman12;