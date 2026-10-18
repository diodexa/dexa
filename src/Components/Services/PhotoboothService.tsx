
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyorpTFbokef1d7fMRPeg3c1axccIY2rY5Vs0Mea_UULAqNkudxuQ6rp0jWTZ5zHz7D/exec";

export interface PhotoboothPayload {
  idUndangan: string;
  nama: string;
  ucapan: string;
  slug: string;
  foto: string;
  audio?: string;
}

export async function kirimPhotobooth(data: PhotoboothPayload) {
  const body = new URLSearchParams({
    aksi: "photobooth",
    idUndangan: data.idUndangan,
    slug: data.slug,
    Nama: data.nama,
    Ucapan: data.ucapan,
    Foto: data.foto,
    Audio: data.audio ?? "",
    });



  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    body,
  });

  const hasil = await response.text();


  if (!response.ok) {
    throw new Error(`Request gagal dengan status ${response.status}`);
  }

  try {
    const json = JSON.parse(hasil);
    if (!json.success) {
      throw new Error(json.message || "Apps Script gagal menyimpan data.");
    }
    return json;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Respons Apps Script bukan JSON. Periksa URL deployment dan log eksekusi.");
    }
    throw error;
  }
}


export async function getPhotoboothData(key: string) {
  const url = `${APPS_SCRIPT_URL}?aksi=list&key=${encodeURIComponent(key)}`;
  const response = await fetch(url);
  const hasil = await response.text();

  let json;
  try {
    json = JSON.parse(hasil);
  } catch {
    throw new Error("Respons Apps Script bukan JSON.");
  }

  if (!response.ok || !json.success) {
    throw new Error(json.message || "Galeri tidak dapat dibuka.");
  }

  return Array.isArray(json.data) ? json.data : [];
}