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

const landingView = document.querySelector(".landingView");
const appView = document.querySelector(".appView");

const adminDrawer = $("#adminDrawer");
const adminStatusPill = $("#adminStatusPill");
const adminCloseBtn = $("#adminCloseBtn");
const adminJson = $("#adminJson");
const adminValidationList = $("#adminValidationList");
const adminApplyBtn = $("#adminApplyBtn");
const adminRevertBtn = $("#adminRevertBtn");
const adminClearBtn = $("#adminClearBtn");
const adminExportBtn = $("#adminExportBtn");
const adminCopyBtn = $("#adminCopyBtn");
const adminAutoApply = $("#adminAutoApply");
const adminLastSource = $("#adminLastSource");

const ADMIN_STORAGE_KEY = "visioar_admin_menu_override";

let MENU = null;
let BASE_MENU = null;
let idx = 0;
let adminMode = false;
let lastValidation = { errors: [], warnings: [] };
let lastModelWarning = null;
let autoApplyTimer = null;

function getRestaurantParam(){
  const params = new URLSearchParams(window.location.search);
  return params.get("r");
}

function syncViewMode(hasRestaurant){
  if (!landingView || !appView) return;
  landingView.classList.toggle("hidden", hasRestaurant);
  appView.classList.toggle("hidden", !hasRestaurant);
}

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
  lastModelWarning = null;

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
    const msg = `No se pudo cargar el modelo 3D. Revisá que exista en: ${item.model}`;
    showError(msg);
    lastModelWarning = msg;
    if (adminMode) updateAdminValidation(lastValidation);
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

function isAdminMode(){
  const params = new URLSearchParams(window.location.search);
  return adminMode || params.get("admin") === "1";
}

function openAdminDrawer(){
  if (!adminDrawer) return;
  adminDrawer.classList.remove("hidden");
  adminDrawer.setAttribute("aria-hidden", "false");
}

function closeAdminDrawer(){
  if (!adminDrawer) return;
  adminDrawer.classList.add("hidden");
  adminDrawer.setAttribute("aria-hidden", "true");
}

function setAdminStatus(type, label){
  if (!adminStatusPill) return;
  adminStatusPill.textContent = label;
  adminStatusPill.classList.toggle("adminStatusOk", type === "ok");
  adminStatusPill.classList.toggle("adminStatusError", type === "error");
}

function updateAdminSource(label){
  if (adminLastSource) adminLastSource.textContent = label;
}

function parseMenuJson(raw){
  try {
    const data = JSON.parse(raw);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

function validateMenuSchema(menu){
  const errors = [];
  const warnings = [];

  if (!menu || typeof menu !== "object") {
    errors.push("menu.json debe ser un objeto válido.");
    return { errors, warnings };
  }

  if (typeof menu.restaurant !== "string") {
    errors.push("Falta restaurant (string).");
  }

  if (!Array.isArray(menu.items) || menu.items.length === 0) {
    errors.push("items debe ser un array no vacío.");
  } else {
    menu.items.forEach((item, index) => {
      if (!item || typeof item !== "object") {
        errors.push(`items[${index}] debe ser un objeto.`);
        return;
      }
      if (typeof item.id !== "string") errors.push(`items[${index}].id debe ser string.`);
      if (typeof item.name !== "string") errors.push(`items[${index}].name debe ser string.`);
      if (typeof item.model !== "string") errors.push(`items[${index}].model debe ser string.`);

      const viewer = item.viewer || {};
      if (viewer.scale && !/^\s*-?\d+(\.\d+)?\s+-?\d+(\.\d+)?\s+-?\d+(\.\d+)?\s*$/.test(viewer.scale)) {
        warnings.push(`items[${index}].viewer.scale debería ser "x y z".`);
      }
      if (viewer.fieldOfView && typeof viewer.fieldOfView === "string" && !viewer.fieldOfView.endsWith("deg")) {
        warnings.push(`items[${index}].viewer.fieldOfView debería terminar en "deg".`);
      }
      if (viewer.cameraOrbit && typeof viewer.cameraOrbit === "string" && !viewer.cameraOrbit.includes("deg")) {
        warnings.push(`items[${index}].viewer.cameraOrbit debería incluir "deg".`);
      }
      if (viewer.autoRotate != null && typeof viewer.autoRotate !== "boolean") {
        warnings.push(`items[${index}].viewer.autoRotate debería ser boolean.`);
      }
    });
  }

  return { errors, warnings };
}

function updateAdminValidation(report){
  if (!adminValidationList) return;
  lastValidation = report;
  const { errors, warnings } = report;
  adminValidationList.innerHTML = "";
  const items = [];
  errors.forEach((msg) => items.push({ type: "error", msg }));
  warnings.forEach((msg) => items.push({ type: "warning", msg }));
  if (lastModelWarning) items.push({ type: "warning", msg: lastModelWarning });

  if (items.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Sin errores.";
    adminValidationList.appendChild(li);
    setAdminStatus("ok", "OK");
    return;
  }

  items.forEach(({ type, msg }) => {
    const li = document.createElement("li");
    li.textContent = `${type === "error" ? "❌" : "⚠️"} ${msg}`;
    adminValidationList.appendChild(li);
  });

  if (errors.length > 0) setAdminStatus("error", "Error");
  else setAdminStatus("ok", "OK");
}

function applyMenu(menuObj, { source = "BASE_MENU", shouldRender = true } = {}){
  MENU = menuObj;
  idx = Math.max(0, Math.min(idx, MENU.items.length - 1));
  updateAdminSource(source);
  if (shouldRender) render();
}

function downloadJson(filename, obj){
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function setEditorValue(value){
  if (!adminJson) return;
  adminJson.value = value;
}

function getStoredOverride(){
  return localStorage.getItem(ADMIN_STORAGE_KEY);
}

function storeOverride(raw){
  localStorage.setItem(ADMIN_STORAGE_KEY, raw);
}

function clearOverride(){
  localStorage.removeItem(ADMIN_STORAGE_KEY);
}

function applyRawJson(raw, { source = "Override", store = false } = {}){
  const parsed = parseMenuJson(raw);
  if (parsed.error) {
    updateAdminValidation({ errors: ["JSON inválido. Revisá la sintaxis."], warnings: [] });
    return false;
  }
  const report = validateMenuSchema(parsed.data);
  updateAdminValidation(report);
  if (report.errors.length > 0) return false;
  if (store) storeOverride(raw);
  applyMenu(parsed.data, { source, shouldRender: true });
  return true;
}

function setAdminMode(enabled){
  adminMode = enabled;
  if (!adminDrawer) return;
  if (enabled) {
    openAdminDrawer();
    bindAdminUI();
    syncAdminEditor();
  } else {
    closeAdminDrawer();
  }
}

function syncAdminEditor(){
  if (!adminJson || !BASE_MENU) return;
  const baseRaw = JSON.stringify(BASE_MENU, null, 2);
  const stored = getStoredOverride();
  setEditorValue(stored || baseRaw);
}

function bindAdminUI(){
  if (!adminDrawer) return;
  if (adminDrawer.dataset.bound === "true") return;
  adminDrawer.dataset.bound = "true";

  const baseRaw = JSON.stringify(BASE_MENU, null, 2);
  syncAdminEditor();
  updateAdminValidation({ errors: [], warnings: [] });

  adminApplyBtn.addEventListener("click", () => {
    const raw = adminJson.value;
    const applied = applyRawJson(raw, { source: "Override", store: true });
    if (applied) setAdminStatus("ok", "OK");
  });

  adminRevertBtn.addEventListener("click", () => {
    const stored = getStoredOverride();
    if (stored) {
      setEditorValue(stored);
      applyRawJson(stored, { source: "Override", store: false });
    } else {
      setEditorValue(baseRaw);
      applyMenu(BASE_MENU, { source: "BASE_MENU", shouldRender: true });
      updateAdminValidation({ errors: [], warnings: [] });
      setAdminStatus("ok", "OK");
    }
  });

  adminClearBtn.addEventListener("click", () => {
    clearOverride();
    setEditorValue(baseRaw);
    applyMenu(BASE_MENU, { source: "BASE_MENU", shouldRender: true });
    updateAdminValidation({ errors: [], warnings: [] });
    setAdminStatus("ok", "OK");
  });

  adminExportBtn.addEventListener("click", () => {
    downloadJson("menu.json", MENU);
  });

  adminCopyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(adminJson.value);
      setAdminStatus("ok", "OK");
    } catch {
      setAdminStatus("error", "Error");
    }
  });

  adminCloseBtn.addEventListener("click", () => {
    setAdminMode(false);
    updateAdminUrl(false);
    applyMenu(BASE_MENU, { source: "BASE_MENU", shouldRender: true });
  });

  adminJson.addEventListener("input", () => {
    if (!adminAutoApply.checked) return;
    if (autoApplyTimer) clearTimeout(autoApplyTimer);
    autoApplyTimer = setTimeout(() => {
      const raw = adminJson.value;
      const parsed = parseMenuJson(raw);
      if (parsed.error) {
        updateAdminValidation({ errors: ["JSON inválido. Revisá la sintaxis."], warnings: [] });
        return;
      }
      const report = validateMenuSchema(parsed.data);
      updateAdminValidation(report);
      if (report.errors.length === 0) {
        storeOverride(raw);
        applyMenu(parsed.data, { source: "Override", shouldRender: true });
      }
    }, 800);
  });
}

function updateAdminUrl(enabled){
  const url = new URL(window.location.href);
  if (enabled) url.searchParams.set("admin", "1");
  else url.searchParams.delete("admin");
  window.history.replaceState({}, "", url.toString());
}

async function loadMenu(){
  const res = await fetch("./menu.json", { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo leer menu.json");
  const data = await res.json();
  if (!data.items || !data.items.length) throw new Error("menu.json no tiene items");
  BASE_MENU = data;
  applyMenu(BASE_MENU, { source: "BASE_MENU", shouldRender: false });

  if (adminMode) {
    const stored = getStoredOverride();
    if (stored) {
      const parsed = parseMenuJson(stored);
      if (parsed.error) {
        updateAdminValidation({ errors: ["JSON inválido en localStorage."], warnings: [] });
        return;
      }
      const report = validateMenuSchema(parsed.data);
      updateAdminValidation(report);
      if (report.errors.length === 0) {
        applyMenu(parsed.data, { source: "Override", shouldRender: false });
      }
    }
  }
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

  window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "a" && e.ctrlKey && e.shiftKey) {
      const nextMode = !isAdminMode();
      updateAdminUrl(nextMode);
      setAdminMode(nextMode);
      if (nextMode) {
        const stored = getStoredOverride();
        if (stored) applyRawJson(stored, { source: "Override", store: false });
      } else {
        applyMenu(BASE_MENU, { source: "BASE_MENU", shouldRender: true });
      }
    }
  });
}

(async function init(){
  try{
    const restaurantParam = getRestaurantParam();
    const hasRestaurant = Boolean(restaurantParam);
    syncViewMode(hasRestaurant);
    if (!hasRestaurant) return;

    adminMode = isAdminMode();
    await loadMenu();
    bindUI();
    if (adminMode) {
      openAdminDrawer();
      bindAdminUI();
    }
    render();
  }catch(err){
    console.error(err);
    showError("Error inicializando el menú. Revisá menu.json y rutas.");
  }
})();
