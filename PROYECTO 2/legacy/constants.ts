import { Dish, CardFont } from './types';

export const LEGACY_APP_NAME = 'Gourmet AR Viewer';

export const LEGACY_DISHES: Dish[] = [
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
    modelSrc: '/models/hamburguesa.glb',
    poster: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
    price: 8.9
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
    modelSrc: '/models/pizza.glb',
    poster: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=700&q=80',
    price: 12.5
  }
];

export const LEGACY_INITIAL_FONT = CardFont.MONTSERRAT;

export const LEGACY_TEXTURE_CONFIG_DEFAULTS = {
  width: 512,
  height: 512,
  padding: 40,
  backgroundColor: '#ffffff',
  textColor: '#1f2937'
};
