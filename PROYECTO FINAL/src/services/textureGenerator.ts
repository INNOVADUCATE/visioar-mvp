import { CardFont, Dish, TextureConfig } from '../types';
import { TEXTURE_CONFIG_DEFAULTS } from '../constants';

/**
 * Generates a dynamic texture (Data URL) from dish data.
 * This simulates "printing" the digital info card.
 */
export const generateInfoCardTexture = (
  dish: Dish,
  configOrFont: TextureConfig | CardFont
): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return '';
  }

  if (typeof configOrFont === 'string') {
    const config: TextureConfig = {
      ...TEXTURE_CONFIG_DEFAULTS,
      fontFamily: configOrFont
    };
    canvas.width = config.width;
    canvas.height = config.height;

    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, config.width, config.height);

    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, config.width - 10, config.height - 10);

    const centerX = config.width / 2;
    let currentY = (config.padding ?? 40) + 40;

    ctx.fillStyle = config.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = `bold 48px ${config.fontFamily}`;

    const words = dish.name.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > config.width - (config.padding ?? 40) * 2 && n > 0) {
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
    ctx.moveTo(config.padding ?? 40, currentY);
    ctx.lineTo(config.width - (config.padding ?? 40), currentY);
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 4;
    ctx.stroke();
    currentY += 40;

    ctx.font = `italic 32px ${config.fontFamily}`;
    ctx.fillStyle = '#6B7280';
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

    return canvas.toDataURL('image/png');
  }

  const config: TextureConfig = configOrFont;
  const accentColor = config.accentColor ?? '#D4AF37';
  canvas.width = config.width;
  canvas.height = config.height;

  // 1. Background
  ctx.fillStyle = config.backgroundColor;
  ctx.fillRect(0, 0, config.width, config.height);

  // 2. Elegant Border
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 12;
  ctx.strokeRect(20, 20, config.width - 40, config.height - 40);

  // 3. Typography Setup
  const centerX = config.width / 2;
  const leftMargin = 60;
  let cursorY = 150;

  // 4. Header (Dish Name)
  ctx.font = `bold 56px ${config.fontFamily}`;
  ctx.fillStyle = config.textColor;
  ctx.textAlign = 'center';
  
  // Wrap text functionality for long names
  const words = dish.name.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > config.width - 100 && n > 0) {
      ctx.fillText(line, centerX, cursorY);
      line = words[n] + ' ';
      cursorY += 70; // Line height
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, centerX, cursorY);

  // 5. Divider
  cursorY += 50;
  ctx.beginPath();
  ctx.moveTo(centerX - 50, cursorY);
  ctx.lineTo(centerX + 50, cursorY);
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 4;
  ctx.stroke();

  // 6. Weight
  cursorY += 80;
  ctx.font = `italic 36px ${config.fontFamily}`;
  ctx.fillStyle = '#cccccc'; // Slightly muted
  ctx.fillText(`Net Weight: ${dish.weight}`, centerX, cursorY);

  // 7. Ingredients List
  cursorY += 100;
  ctx.textAlign = 'left';
  ctx.font = `bold 32px ${config.fontFamily}`;
  ctx.fillStyle = accentColor;
  ctx.fillText('INGREDIENTS', leftMargin, cursorY);

  cursorY += 50;
  ctx.font = `32px ${config.fontFamily}`;
  ctx.fillStyle = config.textColor;

  dish.ingredients.forEach((ingredient) => {
    ctx.fillText(`• ${ingredient}`, leftMargin, cursorY);
    cursorY += 50;
  });

  // 8. Footer / Branding
  const footerY = config.height - 60;
  ctx.textAlign = 'center';
  ctx.font = `24px ${config.fontFamily}`;
  ctx.fillStyle = '#555555';
  ctx.fillText('GOURMET AR COLLECTION', centerX, footerY);

  return canvas.toDataURL('image/png');
};
