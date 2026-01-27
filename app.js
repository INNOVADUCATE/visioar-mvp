const $ = (sel) => document.querySelector(sel);

const mv = $("#mv");
const prevBtn = $("#prevBtn");
const nextBtn = $("#nextBtn");
const toggleCardBtn = $("#toggleCardBtn");
const closeCardBtn = $("#closeCardBtn");
const cardOverlay = $("#cardOverlay");
const errorBox = $("#errorBox");

const restaurantName = $("#restaurantName");
const dishName = $("#dishName");
const dishPrice = $("#dishPrice");
const dishDesc = $("#dishDesc");

const cardTitle = $("#cardTitle");
const cardWeight = $("#cardWeight");
const cardIngredients = $("#cardIngredients");

const fontSelect = $("#fontSelect");

let MENU = null;
let idx = 0;

function formatARS(value){
  try {
    return new Intl.NumberFormat("es-AR", { style:"currency", currency:"ARS", maximumFractionDigits:0 }).format(value);
  } catch {
    return `$${value}`;
  }
}

function showError(msg){
  errorBox.textContent = msg;
  errorBox.classList.remove("hidden");
}
function hideError(){
  errorBox.textContent = "";
  errorBox.classList.add("hidden");
}

function openCard(){
  cardOverlay.classList.remove("hidden");
}
function closeCard(){
  cardOverlay.classList.add("hidden");
}

function setFont(mode){
  if (mode === "calibri") {
    document.body.style.fontFamily = 'Calibri, "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif';
  } else if (mode === "inter") {
    document.body.style.fontFamily = 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  } else {
    document.body.style.fontFamily = "";
  }
}

function fillCard(item){
  cardTitle.textContent = item.name;
  cardWeight.textContent = item.weight || "";
  cardIngredients.innerHTML = "";
  (item.ingredients || []).forEach(ing => {
    const li = document.createElement("li");
    li.textContent = ing;
    cardIngredients.appendChild(li);
  });
}

function fillHeader(item){
  restaurantName.textContent = MENU?.restaurant || "Restaurante";
  dishName.textContent = item.name || "";
  dishPrice.textContent = item.price != null ? formatARS(item.price) : "";
  dishDesc.textContent = item.desc || "";
}

function setModel(item){
  if (!item) return;

  hideError();

  const cfg = MENU?.viewerDefaults || {};
  const v = item.viewer || {};

  const scale = v.scale || cfg.scale || "1 1 1";
  const orbit = v.cameraOrbit || cfg.cameraOrbit || "0deg 75deg 1.3m";
  const fov = v.fieldOfView || cfg.fieldOfView || "30deg";
  const autoRotate = (typeof v.autoRotate === "boolean") ? v.autoRotate : (cfg.autoRotate !== false);
  const shadowIntensity = (typeof v.shadowIntensity === "number") ? v.shadowIntensity : (cfg.shadowIntensity ?? 1);

  // Model
  mv.src = item.model;
  mv.alt = item.name || "Plato 3D";
  mv.setAttribute("scale", scale);
  mv.setAttribute("camera-orbit", orbit);
  mv.setAttribute("field-of-view", fov);
  mv.setAttribute("shadow-intensity", String(shadowIntensity));

  if (autoRotate) mv.setAttribute("auto-rotate", "");
  else mv.removeAttribute("auto-rotate");

  // Si falla carga del modelo
  const onError = () => {
    showError(`No se pudo cargar el modelo 3D. Revisá que exista en: ${item.model}`);
  };

  mv.addEventListener("error", onError, { once:true });

  // Header / overlay
  fillHeader(item);
  fillCard(item);
}

function render(){
  const item = MENU.items[idx];
  setModel(item);
}

async function loadMenu(){
  const res = await fetch("./menu.json", { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo leer menu.json");
  const data = await res.json();
  if (!data.items || !data.items.length) throw new Error("menu.json no tiene items");
  MENU = data;
}

function bindUI(){
  prevBtn.addEventListener("click", () => {
    idx = (idx - 1 + MENU.items.length) % MENU.items.length;
    render();
  });
  nextBtn.addEventListener("click", () => {
    idx = (idx + 1) % MENU.items.length;
    render();
  });

  toggleCardBtn.addEventListener("click", () => openCard());
  closeCardBtn.addEventListener("click", () => closeCard());
  cardOverlay.addEventListener("click", (e) => {
    if (e.target === cardOverlay) closeCard();
  });

  fontSelect.addEventListener("change", () => setFont(fontSelect.value));
  setFont(fontSelect.value);

  // cerrar con ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !cardOverlay.classList.contains("hidden")) closeCard();
  });
}

(async function init(){
  try{
    await loadMenu();
    bindUI();
    render();
  }catch(err){
    console.error(err);
    showError("Error inicializando el menú. Revisá menu.json y rutas.");
  }
})();
