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

  music?: string;

  theme?: {
    PrimaryColor?: string;
    SecondaryColor?: string;

    backgroundColor?: string;
    ContrasBackgroundColor?:string;
    ContrasBackgroundColorSecond?:string;

    backgroundImage?:string;

    headingFont?: string;
    bodyFont?: string;
  };
};