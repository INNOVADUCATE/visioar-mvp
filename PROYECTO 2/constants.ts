import { Dish, FontFamily, TextureConfig } from './types';

// This data would typically come from an API or DB
export const DISHES: Dish[] = [
  {
    id: 'hamburguesa',
    name: 'Hamburguesa Clásica',
    weight: '220 g',
    ingredients: [
      'Carne Angus',
      'Queso Cheddar',
      'Lechuga Fresca',
      'Tomate',
      'Pan Brioche'
    ],
    description: 'Sabor clásico con ingredientes frescos y jugosos.',
    price: '$8.90',
    imageUrl:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
    modelUrl: '/models/hamburguesa.glb',
    badgeLabel: 'Selección de la casa',
    ctaLabel: 'Ordenar hamburguesa',
    arLabel: 'Ver hamburguesa en AR'
  },
  {
    id: 'pizza',
    name: 'Pizza Artesanal',
    weight: '430 g',
    ingredients: [
      'Masa madre',
      'Salsa de tomate',
      'Mozzarella',
      'Albahaca',
      'Aceite de oliva'
    ],
    description: 'Horneada en piedra con masa de fermentación lenta.',
    price: '$12.50',
    imageUrl:
      'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=700&q=80',
    modelUrl: '/models/pizza.glb',
    badgeLabel: 'Hecha al horno',
    ctaLabel: 'Pedir pizza',
    arLabel: 'Ver pizza en AR'
  },
  {
    id: 'papas',
    name: 'Papas Crujientes',
    weight: '180 g',
    ingredients: [
      'Papas russet',
      'Sal marina',
      'Paprika ahumada',
      'Ajo',
      'Perejil'
    ],
    description: 'Papas doradas con especias y toque de ajo.',
    price: '$5.75',
    imageUrl:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=700&q=80',
    modelUrl: '/models/papas.glb',
    badgeLabel: 'Extra crujiente',
    ctaLabel: 'Sumar papas',
    arLabel: 'Ver papas en AR'
  }
];

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
