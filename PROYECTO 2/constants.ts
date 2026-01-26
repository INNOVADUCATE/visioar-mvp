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
  price: '$24.00',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC4RZrnDuvtL7GBZZESJo10hVcHND5L-RzIEve8a0wTqq8TL-SFve5sTZZhatAzzm1z36-tIL--KOsGWQs2SQso4LtCdwUngP0lL6tBprm_Vf--Ufh696str0odG-R_fvHXBzmP5ZQ3hwrNimax1aReKlbT287nh_KK1tUUaTBELxj3A9cyaoZVhMj0sgWUvSJ9pAbyB41yS5Nqlnbxfze5aYfD52RBNYG5izVVZN7gljLq8z0eaqPUIOOYAm-mAPIYF9JkdIenF_M',
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
