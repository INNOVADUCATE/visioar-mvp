import { Dish, FontFamily, TextureConfig } from './types';

// This data would typically come from an API or DB
export const BURGER_DISH: Dish = {
  id: 'burger-01',
  name: 'The Royal Smash',
  weight: '220 g',
  ingredients: [
    'Dry-aged Beef Blend',
    'Smoked Cheddar',
    'Caramelized Onions',
    'Truffle Aioli',
    'Brioche Bun'
  ],
  description: 'Our signature patty, smashed to perfection.',
  // Using a standard placeholder model. In a real scenario, this GLB 
  // would contain a mesh named "InfoPlane" floating next to the burger.
  modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb' 
};

export const DEFAULT_TEXTURE_CONFIG: TextureConfig = {
  fontFamily: FontFamily.MONTSERRAT,
  backgroundColor: '#1a1a1a', // Dark elegant background
  textColor: '#ffffff',
  accentColor: '#D4AF37', // Gold
  width: 512, // Power of 2 for texture performance
  height: 1024
};

// The name of the material in the GLB file that corresponds to the floating card
export const INFO_CARD_MATERIAL_NAME = 'InfoCardMaterial';