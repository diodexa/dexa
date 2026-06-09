export type Invitation = {
  slug: string;

  template: string;

  Namabride: string;
  NamabridePanggilan: string;
  AkunIGWanita? : string;
  AkunTikTokWanita? : string;
  BapakpengantinWanita: string;
  IbupengantinWanita: string;

  Namagroom: string;
  NamagroomPanggilan: string;
  AkunIGPria? : string;
  AkunTikTokPria? : string;
  BapakpengantinPria: string;
  IbupengantinPria: string;
  
  FotoBride: string;
  FotoGroom: string;
   

  TanggalAkad? : string,
  JamAkad? : string,
  TanggalResepsi?: string,
  JamResepsi? : string,
  LokasiAkad?: string,
  LokasiResepsi?: string,
  LinkGoogleMapsAkad?: string,
  LinkGoogleMapsResepsi?: string,
  note?: string,
  
  coverImage: string;
  backcover: string;
  
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
    PrimaryColor? : string;
    SecondaryColor? :string;

    CoverFrontPrimaryColor?: string;
    CoverFrontSecondaryColor?: string;

    backgroundColor?: string;
    ContrasBackgroundColor?:string;
    ContrasBackgroundColorSecond?:string;

    backgroundImage?:string;

    headingFont?: string;
    bodyFont?: string;
  };

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
  }
};