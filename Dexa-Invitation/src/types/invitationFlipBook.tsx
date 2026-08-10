export type Invitation = {
  slug: string;

  template: string;

  Namabride: string;
  NamabridePanggilan: string;
  AkunIGWanita? : string;
  AkunTikTokWanita? : string;
  BapakpengantinWanita: string;
  IbupengantinWanita: string;
  FotoBride: string;

  Namagroom: string;
  NamagroomPanggilan: string;
  AkunIGPria? : string;
  AkunTikTokPria? : string;
  BapakpengantinPria: string;
  IbupengantinPria: string;
  FotoGroom: string;
  
   
  FormatWaktu : string,

  TanggalAkad? : string,
  JamAkad? : string,
  TanggalAkadISO? : string,
  LokasiAkad?: string,
  LinkGoogleMapsAkad?: string,

  TanggalResepsi?: string,
  JamResepsi? : string,
  LokasiResepsi?: string,
  LinkGoogleMapsResepsi?: string,

  note?: string,
  
  coverImage: string;
  backcover?: string;
  
  gallery: string[];
  
  Salam?: string;
  Sambutan? : string;
  Ayat? : string;
  NamaSurat? : string;

  Story : {
    Story1 : string,
    Story2 : string,
    Story3 : string,
    Story4 : string,
    Head1 : string,
    Head2 : string,
    Head3 : string,
    Head4 : string,
  }

  music?: string;

  theme?: {
    backgroundImage?:string;
    
    warna1?: string;
    warna2?: string;
    warna3?: string;
    contrasfont?: string;
    ContrasBackgroundColor?:string;

  };

  WeddingGift?: {
    rekening?: {
      bank?: string;
      atasNama?: string;
      nomorRekening?: string;
    }[];
   alamat: {
    alamat: string;
    penerima: string;
    noHp: string;
  };
  };

  Closing? : string;

  Papper? : {
    CoverBack? : string ;
    Halaman1? : string ;
    Halaman2? : string ;
    Halaman3? : string ;
    Halaman4? : string ;
    Halaman5? : string ;
    Halaman6? : string ;
    Halaman7? : string ;
    Halaman8? : string ;
    Halaman9? : string ;
    Halaman10? : string ;
    Halaman11? : string ;
    Halaman12? : string ;
    Halaman13? : string ;
    Halaman14? : string ;
    Halaman15? : string ;
    Halaman16? : string ;
  }
};