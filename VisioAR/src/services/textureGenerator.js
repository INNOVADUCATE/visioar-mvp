function getFontStack(fontKey){
  if(fontKey === "montserrat") return {
    title: "700 34px Montserrat, Arial, sans-serif",
    body:  "500 24px Montserrat, Arial, sans-serif",
    label: "600 26px Montserrat, Arial, sans-serif"
  };
  return {
    title: "700 34px Calibri, Arial, sans-serif",
    body:  "500 24px Calibri, Arial, sans-serif",
    label: "600 26px Calibri, Arial, sans-serif"
  };
}

function roundRect(ctx, x, y, w, h, r){
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y, x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r);
  ctx.arcTo(x, y, x+w, y, r);
  ctx.closePath();
}

function drawPill(ctx, x, y, text){
  const padX = 18;
  ctx.font = "600 22px Arial, sans-serif";
  const tw = ctx.measureText(text).width;
  const pw = tw + padX*2;
  const ph = 40;

  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.strokeStyle = "rgba(245,193,108,0.35)";
  ctx.lineWidth = 3;
  roundRect(ctx, x, y, pw, ph, 18);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(245,193,108,0.95)";
  ctx.fillText(text, x+padX, y+27);
}

function generateInfoCardTexture(item, fontKey){
  const w = 1024, h = 512;
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d");
  const fonts = getFontStack(fontKey);

  // Fondo “vidrio”
  ctx.fillStyle = "rgba(15,15,20,0.86)";
  ctx.fillRect(0,0,w,h);

  // Borde
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 6;
  roundRect(ctx, 14, 14, w-28, h-28, 26);
  ctx.stroke();

  // Glow suave
  const grad = ctx.createRadialGradient(w*0.82, h*0.18, 20, w*0.82, h*0.18, 420);
  grad.addColorStop(0, "rgba(245,193,108,0.25)");
  grad.addColorStop(1, "rgba(245,193,108,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,w,h);

  // Título
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = fonts.title;
  ctx.fillText(item.name, 54, 95);

  // Peso
  drawPill(ctx, 54, 120, `Peso: ${item.weight}`);

  // Ingredientes
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = fonts.label;
  ctx.fillText("Ingredientes", 54, 195);

  ctx.fillStyle = "rgba(255,255,255,0.70)";
  ctx.font = fonts.body;

  const lines = item.ingredients.map(x => `• ${x}`);
  let y = 235;
  for(const line of lines.slice(0, 6)){
    ctx.fillText(line, 54, y);
    y += 38;
  }

  return c.toDataURL("image/png");
}

window.generateInfoCardTexture = generateInfoCardTexture;
