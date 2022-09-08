export async function getCategories() {
  // Implemente aqui
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const a = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const b = await a.json();
  return b;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
