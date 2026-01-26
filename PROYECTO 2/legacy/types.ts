export interface Dish {
  id: string;
  name: string;
  weight: string;
  ingredients: string[];
  modelSrc: string;
  iosSrc?: string;
  poster?: string;
  price?: number;
}

export enum CardFont {
  CALIBRI = 'Calibri, sans-serif',
  MONTSERRAT = 'Montserrat, sans-serif',
}

export interface TextureConfig {
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  fontFamily: CardFont;
  padding: number;
}
