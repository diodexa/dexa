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
  
   
  FormatWaktu? : string,

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
  
  coverImage?: string;
  backcover?: string;
  
  gallery?: string[];
  
  Salam?: string;
  Sambutan? : string;
  Ayat? : string;
  NamaSurat? : string;

  Story?: {
    Head: string;
    Story: string;
  }[];

  music?: string;
  video? : string;

  theme?: {
    backgroundImage?:string;
    
    warna1?: string;
    warna2?: string;
    warna3?: string;
    contrasfont?: string;
    ContrasBackgroundColor?:string;

    warnaButtonBackground?: string;
    warnaButtonBorder? : string;

    warnaweddingInvitation? : string;

  };

  nav?: {
    label: string;
    icon: string;
    scrollTo: number;
    scrollEnd?: number;
    }[];

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
    CoverFront? : string;
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
  },
  
  Chat?: {
    Interaksi?: {
      FotoProfil?: string;
      Nama?: string;
      isiChat?: string ;
      gallery? : string[];
      video? : string;
      Waktu?: string;
    }[];
  };
  sticker?: string[];
};