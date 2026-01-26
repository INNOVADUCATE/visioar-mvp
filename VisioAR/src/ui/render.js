const dishSelect = document.getElementById("dishSelect");
const dishName = document.getElementById("dishName");
const dishPrice = document.getElementById("dishPrice");
const previewImg = document.getElementById("previewImg");

export function renderItem(item){
  if(!item){
    return;
  }

  dishSelect.value = item.slug;
  dishName.textContent = item.name;
  dishPrice.textContent = item.price;
}

export function updatePreview(textureUrl){
  previewImg.src = textureUrl;
}
