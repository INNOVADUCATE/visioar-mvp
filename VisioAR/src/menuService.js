export async function loadMenu() {
  const url = new URL("../menu.json", import.meta.url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("No se pudo cargar menu.json");
  }
  return response.json();
}
