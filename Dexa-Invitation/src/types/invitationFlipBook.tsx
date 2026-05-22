export type Invitation = {
  slug: string;

  template: string;

  bride: string;
  groom: string;

  date: string;
  time: string;
  location: string;
  
  coverImage: string;
  
  gallery: string[];
  
  Salam?: string;
  Sambutan? : string;
  Ayat? : string;
  NamaSurat? : string;

  music?: string;

  theme?: {
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