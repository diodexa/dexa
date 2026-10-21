
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzagIYNEDdYJV7VZGceRggWBMRyQD5zcLZBirf6wNNlvrajGKno5TZQrohFvx4FSGku/exec";

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

 
export async function getPhotoboothAudio(key: string, fileId: string) {
  const url = `${APPS_SCRIPT_URL}?aksi=audio&key=${encodeURIComponent(key)}&fileId=${encodeURIComponent(fileId)}`;

  const response = await fetch(url);
  const hasil = await response.text();

  console.log("Status audio:", response.status);
  console.log("Respons audio dari Apps Script:", hasil.slice(0, 1000));
  console.log("File ID audio:", fileId);

  let json;

  try {
    json = JSON.parse(hasil);
  } catch {
    throw new Error(
      `Respons Apps Script bukan JSON. Status: ${response.status}. Awal respons: ${hasil.slice(0, 200)}`
    );
  }

  if (!response.ok || !json.success) {
    throw new Error(json.message || `Audio tidak dapat dimuat. Status: ${response.status}`);
  }

  if (!json.base64) {
    throw new Error("Apps Script berhasil merespons, tetapi data Base64 audio kosong.");
  }

  return {
    base64: json.base64 as string,
    mimeType: json.mimeType as string,
  };
}



export async function getPhotoboothPhoto(
  key: string,
  fileId: string
): Promise<{ base64: string; mimeType: string }> {
  const url =
    `${APPS_SCRIPT_URL}?aksi=foto` +
    `&key=${encodeURIComponent(key)}` +
    `&fileId=${encodeURIComponent(fileId)}`;

  const response = await fetch(url);
  const hasil = await response.text();

  let json: {
    success?: boolean;
    message?: string;
    base64?: string;
    mimeType?: string;
  };

  try {
    json = JSON.parse(hasil);
  } catch {
    throw new Error(
      `Respons Apps Script bukan JSON. HTTP ${response.status}. ` +
      `Respons: ${hasil.slice(0, 250)}`
    );
  }

  if (!response.ok || !json.success) {
    throw new Error(
      json.message ||
      `Gagal mengambil foto. HTTP ${response.status}.`
    );
  }

  if (!json.base64) {
    throw new Error("Data Base64 foto kosong.");
  }

  return {
    base64: json.base64,
    mimeType: json.mimeType || "image/jpeg",
  };
}
