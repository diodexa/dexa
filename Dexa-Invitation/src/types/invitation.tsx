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
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    backgroundImage?:string;

    headingFont?: string;
    bodyFont?: string;
  };
};