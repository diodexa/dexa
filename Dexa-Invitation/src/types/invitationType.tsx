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

  video? : string;

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

  Background? : {
    CoverBack? : string ;
    Background1? : string ;
    Background2? : string ;
    Background3? : string ;
    Background4? : string ;
    Background5? : string ;
    Background6? : string ;
    Background7? : string ;
    Background8? : string ;
    Background9? : string ;
    Background10? : string ;
    Background11? : string ;
    Background12? : string ;
    Background13? : string ;
    Background14? : string ;
    Background15? : string ;
    Background16? : string ;
  }
  
};