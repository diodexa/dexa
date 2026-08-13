const scriptURL =
  "https://script.google.com/macros/s/AKfycbwr3c_LZ_636Dv3gB9gEoTe_rEtvsoYfUAC9DI-AGQ4386O6PHmlJKZ6U9UzxOE6V0/exec";

export interface Comment {
  id: string;
  nama: string;
  ucapan: string;
  kehadiran: string;
  date : string
}



export const fetchComments = async (id: string) => {
  const response = await fetch(`${scriptURL}?id=${id}`);

  if (!response.ok) {
    throw new Error("Gagal mengambil komentar");
  }

  const data = await response.json();

  return data.reverse() as Comment[];
};



export const postComment = async (formData: FormData) => {
  const response = await fetch(scriptURL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Gagal mengirim komentar");
  }

  return response;
};