import { Dish, CardFont, TextureConfig } from '../types';
import { LEGACY_TEXTURE_CONFIG_DEFAULTS } from '../constants';

export const generateInfoCardTexture = async (
  dish: Dish,
  font: CardFont
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const config: TextureConfig = { ...LEGACY_TEXTURE_CONFIG_DEFAULTS, fontFamily: font };

      if (!ctx) {
        throw new Error('Canvas context not available');
      }

      canvas.width = config.width;
      canvas.height = config.height;

      ctx.fillStyle = config.backgroundColor;
      ctx.fillRect(0, 0, config.width, config.height);

      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 10;
      ctx.strokeRect(5, 5, config.width - 10, config.height - 10);

      const centerX = config.width / 2;
      let currentY = config.padding + 40;

      ctx.fillStyle = config.textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.font = `bold 48px ${config.fontFamily}`;

      const words = dish.name.split(' ');
      let line = '';
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > config.width - config.padding * 2 && n > 0) {
          ctx.fillText(line, centerX, currentY);
          line = words[n] + ' ';
          currentY += 55;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, centerX, currentY);
      currentY += 60;

      ctx.beginPath();
      ctx.moveTo(config.padding, currentY);
      ctx.lineTo(config.width - config.padding, currentY);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 4;
      ctx.stroke();
      currentY += 40;

      ctx.font = `italic 32px ${config.fontFamily}`;
      ctx.fillStyle = '#6b7280';
      ctx.fillText(`Net Weight: ${dish.weight}`, centerX, currentY);
      currentY += 60;

      ctx.font = `bold 28px ${config.fontFamily}`;
      ctx.fillStyle = config.textColor;
      ctx.fillText('INGREDIENTS', centerX, currentY);
      currentY += 40;

      ctx.font = `24px ${config.fontFamily}`;
      ctx.fillStyle = '#374151';

      dish.ingredients.forEach((ingredient) => {
        ctx.fillText(`• ${ingredient}`, centerX, currentY);
        currentY += 35;
      });

      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    } catch (error) {
      reject(error);
    }
  });
};
