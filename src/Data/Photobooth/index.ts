export interface PhotoboothAccount {
  idUndangan: string;
  Frame?: string;
  FrameSingle?: string;
  NamaPengantin?: string;
  JudulAcara?: string;
  TanggalAcara?: string;
  Font:string;
}

export const Photobooths: PhotoboothAccount[] = [
  {
    idUndangan: "photoboth Trisna & Oci",
    Frame: "/Frame/FramePutih.png",
    FrameSingle: "/Frame/FrameSinglePutih.png",
    NamaPengantin: "Oci & Trisna",
    JudulAcara:"THE WEDDING OF",
    TanggalAcara:"28 November 2026",
    Font:"Tempting",
  },
  {
    idUndangan: "photoboth Andi-Siti",
    Frame: "/Frame/FramePutih.png",
    FrameSingle: "/Frame/FrameSinglePutih.png",
    NamaPengantin: "Andi & Siti",
    JudulAcara:"THE WEDDING OF",
    Font:"Tempting",
  },
  {
    idUndangan: "photoboth PMB",
    Frame: "/Frame/FramePutih.png",
    FrameSingle: "/Frame/FrameSinglePutih.png",
    NamaPengantin: "Malam Balas Budi 2026",
    JudulAcara:"Perhimpunan Mahasiswa Bandung",
    Font:"ColveticaCond",
  },
];