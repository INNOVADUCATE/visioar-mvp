import { Dish, CardFont, TextureConfig } from '../types';
import { TEXTURE_CONFIG_DEFAULTS } from '../constants';

/**
 * Generates a URL representing a dynamic texture card for the dish.
 * This simulates a "Smart Texture" that can be applied to a 3D plane.
 */
export const generateInfoCardTexture = async (
  dish: Dish,
  font: CardFont
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const config: TextureConfig = { ...TEXTURE_CONFIG_DEFAULTS, fontFamily: font };

      if (!ctx) {
        throw new Error('Canvas context not available');
      }

      // Set Resolution
      canvas.width = config.width;
      canvas.height = config.height;

      // 1. Background (Card style)
      ctx.fillStyle = config.backgroundColor;
      // Draw a rounded rectangle visually (though texture is square)
      // For simplicity in UV mapping, we usually fill the whole texture or add transparency borders
      ctx.fillRect(0, 0, config.width, config.height);

      // Add a border
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 10;
      ctx.strokeRect(5, 5, config.width - 10, config.height - 10);

      // 2. Typography Setup
      const centerX = config.width / 2;
      let currentY = config.padding + 40;

      // 3. Draw Title (Name)
      ctx.fillStyle = config.textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.font = `bold 48px ${config.fontFamily}`;
      
      // Handle simple wrapping for long titles
      const words = dish.name.split(' ');
      let line = '';
      for(let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > config.width - (config.padding * 2) && n > 0) {
          ctx.fillText(line, centerX, currentY);
          line = words[n] + ' ';
          currentY += 55;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, centerX, currentY);
      currentY += 60;

      // 4. Draw Divider
      ctx.beginPath();
      ctx.moveTo(config.padding, currentY);
      ctx.lineTo(config.width - config.padding, currentY);
      ctx.strokeStyle = '#EF4444'; // Red accent
      ctx.lineWidth = 4;
      ctx.stroke();
      currentY += 40;

      // 5. Draw Weight
      ctx.font = `italic 32px ${config.fontFamily}`;
      ctx.fillStyle = '#6B7280'; // Gray 500
      ctx.fillText(`Net Weight: ${dish.weight}`, centerX, currentY);
      currentY += 60;

      // 6. Draw Ingredients Header
      ctx.font = `bold 28px ${config.fontFamily}`;
      ctx.fillStyle = config.textColor;
      ctx.fillText('INGREDIENTS', centerX, currentY);
      currentY += 40;

      // 7. List Ingredients
      ctx.font = `24px ${config.fontFamily}`;
      ctx.fillStyle = '#374151';
      
      dish.ingredients.forEach((ing) => {
        ctx.fillText(`• ${ing}`, centerX, currentY);
        currentY += 35;
      });

      // 8. Convert to Blob URL
      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);

    } catch (e) {
      reject(e);
    }
  });
};