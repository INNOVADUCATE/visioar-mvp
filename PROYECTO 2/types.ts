export enum FontFamily {
  CALIBRI = 'Calibri, sans-serif',
  MONTSERRAT = 'Montserrat, sans-serif',
}

export interface Dish {
  id: string;
  name: string;
  weight: string;
  ingredients: string[];
  description?: string;
  price?: string;
  imageUrl?: string;
  modelUrl: string; // Path to the GLB file
  badgeLabel?: string;
  ctaLabel?: string;
  arLabel?: string;
}

export interface TextureConfig {
  fontFamily: FontFamily;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  width: number;
  height: number;
}
