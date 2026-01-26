import React from 'react';

// Data model for a Dish
export interface Ingredient {
  name: string;
}

export interface Dish {
  id: string;
  name: string;
  weight: string; // e.g., "220 g"
  ingredients: string[];
  modelSrc: string; // URL to the GLB file
  iosSrc?: string; // URL to USDZ for iOS (optional)
  poster?: string; // Loading image
  price?: number;
}

// Typography options available for the card
export enum CardFont {
  CALIBRI = 'Calibri, sans-serif',
  MONTSERRAT = 'Montserrat, sans-serif',
}

// Configuration for generating the texture
export interface TextureConfig {
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  fontFamily: CardFont;
  padding: number;
}

// Augment the JSX namespace to support model-viewer
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
        exposure?: string;
        ref?: React.RefObject<HTMLElement>;
      }, HTMLElement>;
    }
  }
}