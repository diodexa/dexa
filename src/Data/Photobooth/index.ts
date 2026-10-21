export interface PhotoboothAccount {
  idUndangan: string;
  Frame?: string;
  FrameSingle?: string;
  NamaPengantin: string;
}

export const Photobooths: PhotoboothAccount[] = [
  {
    idUndangan: "photoboth Trisna-Oci",
    Frame: "/Frame/FramePutih.png",
    FrameSingle: "/Frame/FrameSinglePutih.png",
    NamaPengantin: "Oci & Trisna",
  },
  {
    idUndangan: "photoboth Andi-Siti",
    Frame: "/Frame/FramePutih.png",
    FrameSingle: "/Frame/FrameSinglePutih.png",
    NamaPengantin: "Andi & Siti",
  },
];