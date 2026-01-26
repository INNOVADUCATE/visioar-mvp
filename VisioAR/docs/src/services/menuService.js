export async function loadMenu() {
  const response = await fetch("./data/menu.json");

  if (!response.ok) {
    throw new Error("Error al cargar menu.json");
  }

  return response.json();
}

export function getMenuItemBySlug(menu, slug) {
  if (!Array.isArray(menu) || menu.length === 0) {
    return null;
  }

  return menu.find((item) => item?.slug === slug) ?? menu[0];
}
