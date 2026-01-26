import { Dish, CardFont } from './types';

export const APP_NAME = "Gourmet AR Viewer";

// Mock Database of Dishes
export const DISHES: Dish[] = [
  {
    id: 'burger-001',
    name: 'Smash Royal Deluxe',
    weight: '240 g',
    ingredients: [
      'Double Smash Patty',
      'Aged Cheddar',
      'Caramelized Onion',
      'Secret Truffle Sauce',
      'Brioche Bun'
    ],
    // Using a standard GLB for demo purposes. 
    // In a real app, this GLB would have a specific mesh named 'InfoPlane' floating next to it.
    modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 
    poster: 'https://picsum.photos/400/400',
    price: 15.50
  },
  {
    id: 'salad-002',
    name: 'Zen Garden Salad',
    weight: '180 g',
    ingredients: [
      'Fresh Kale',
      'Cherry Tomatoes',
      'Quinoa',
      'Lemon Vinaigrette'
    ],
    modelSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    poster: 'https://picsum.photos/400/400',
    price: 12.00
  }
];

export const INITIAL_FONT = CardFont.MONTSERRAT;

export const TEXTURE_CONFIG_DEFAULTS = {
  width: 512,
  height: 512, // Square texture is often best for UV mapping
  padding: 40,
  backgroundColor: '#FFFFFF',
  textColor: '#1F2937'
};