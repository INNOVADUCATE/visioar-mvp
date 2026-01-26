import "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";

// -----------------------------
// Datos mínimos (simple, sin JSON por ahora)
// -----------------------------
const MENU = [
  {
    slug: "hamburguesa",
    name: "Hamburguesa Rica Rica",
    price: "$25.900",
    weight: "220 g",
    ingredients: ["Pan brioche tostado","Doble medallón de carne","Cheddar","Lechuga y tomate","Salsa de la casa"],
    glb: "models/demo/hamburguesa.glb"
  },
  {
    slug: "papafritas",
    name: "Papas Fritas",
    price: "$9.900",
    weight: "180 g",
    ingredients: ["Papa","Sal","Aceite","Salsa (opcional)"],
    glb: "models/demo/papafritas.glb"
  },
  {
    slug: "pizzajamon",
    name: "Pizza Jamón",
    price: "$19.900",
    weight: "450 g",
    ingredients: ["Masa","Salsa","Muzza","Jamón"],
    glb: "models/demo/pizzajamon.glb"
  }
];

// UI refs
const mv = document.getElementById("mv");
const restName = document.getElementById("restName");
const dishName = document.getElementById("dishName");
const dishPrice = document.getElementById("dishPrice");

const dishSelect = document.getElementById("dishSelect");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const fontSelect = document.getElementById("fontSelect");
const toggleCardBtn = document.getElementById("toggleCardBtn");

const togglePreviewBtn = document.getElementById("togglePreviewBtn");
const panelBody = document.getElementById("panelBody");
const previewImg = document.getElementById("previewImg");

const errorBox = document.getElementById("errorBox");

// Estado
let index = 0;
let showCard = false;

function bySlug(slug){
  const i = MENU.findIndex(x => x.slug === slug);
  return i >= 0 ? i : 0;
}

function setError(msg){
  errorBox.style.display = "block";
  errorBox.textContent = msg;
}
function clearError(){
  errorBox.style.display = "none";
  errorBox.textContent = "";
}

// -----------------------------
// Ficha (Canvas -> PNG dataURL) — preview (y luego la usás para textura AR si querés)
// -----------------------------
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

function refreshPreview(){
  const item = MENU[index];
  const tex = generateInfoCardTexture(item, fontSelect.value);
  previewImg.src = tex;
}

// -----------------------------
// Render plato
// -----------------------------
function render(){
  const item = MENU[index];
  dishSelect.value = item.slug;
  dishName.textContent = item.name;
  dishPrice.textContent = item.price;

  clearError();

  // Set model (forzamos recarga limpia)
  mv.src = item.glb;

  refreshPreview();
}

// -----------------------------
// Eventos
// -----------------------------
dishSelect.addEventListener("change", () => {
  index = bySlug(dishSelect.value);
  render();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + MENU.length) % MENU.length;
  render();
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % MENU.length;
  render();
});

fontSelect.addEventListener("change", refreshPreview);

togglePreviewBtn.addEventListener("click", () => {
  panelBody.classList.toggle("open");
  togglePreviewBtn.textContent = panelBody.classList.contains("open") ? "Ocultar" : "Ver";
});

toggleCardBtn.addEventListener("click", () => {
  showCard = !showCard;
  toggleCardBtn.textContent = showCard ? "Ficha ✓" : "Ficha";
  // Por ahora solo togglear estado + preview.
  // La ficha AR real requiere que el GLB tenga un plano/material (ej: InfoCardMat).
  if(!panelBody.classList.contains("open")){
    panelBody.classList.add("open");
    togglePreviewBtn.textContent = "Ocultar";
  }
});

// Errores del model viewer
mv.addEventListener("error", () => {
  setError("No se pudo cargar el modelo 3D. Revisá que el archivo exista en: " + mv.src);
});

// Init
render();
// En mobile abrimos preview cerrado (no molesta)
panelBody.classList.remove("open");
togglePreviewBtn.textContent = "Ver";
