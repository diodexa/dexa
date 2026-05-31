export type Invitation = {
  slug: string;

  template: string;

  Namabride: string;
  NamabridePanggilan: string;
  BapakpengantinWanita: string;
  IbupengantinWanita: string;

  Namagroom: string;
  NamagroomPanggilan: string;
  BapakpengantinPria: string;
  IbupengantinPria: string;
  
  FotoBride: string;
  FotoGroom: string;
   

  date: string;
  time: string;
  location: string;
  
  coverImage: string;
  backcover: string;
  
  gallery: string[];
  
  Salam?: string;
  Sambutan? : string;
  Ayat? : string;
  NamaSurat? : string;

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
};