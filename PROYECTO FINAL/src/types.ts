import React from 'react';

export enum FontFamily {
  CALIBRI = 'Calibri, sans-serif',
  MONTSERRAT = 'Montserrat, sans-serif',
}

export enum CardFont {
  CALIBRI = 'Calibri, sans-serif',
  MONTSERRAT = 'Montserrat, sans-serif',
}

export interface Dish {
  id: string;
  name: string;
  weight: string;
  ingredients: string[];
  description?: string;
  price?: string | number;
  imageUrl?: string;
  modelUrl?: string; // Path to the GLB file
  modelSrc?: string; // Alternate GLB field used by legacy module
  iosSrc?: string;
  poster?: string;
}

export interface TextureConfig {
  fontFamily: FontFamily | CardFont;
  backgroundColor: string;
  textColor: string;
  accentColor?: string;
  width: number;
  height: number;
  padding?: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        'ios-src'?: string;
        poster?: string;
        alt?: string;
        'shadow-intensity'?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        ar?: boolean;
        'ar-modes'?: string;
        'environment-image'?: string;
        'ar-placement'?: string;
        'ar-scale'?: string;
        exposure?: string;
        ref?: React.RefObject<HTMLElement>;
      }, HTMLElement>;
    }
  }
}
