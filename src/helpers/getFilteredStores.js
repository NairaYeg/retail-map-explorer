import { createPriceIcon } from "./createPriceIcon";

/**
 * Filters stores and prepares dynamic icons.
 * @param {string|null} selectedProduct The selected product name.
 * @param {Array} stores The array of stores.
 * @param {Array} products The array of products.
 * @returns {Array} filtered stores with price info and icons
 */
export const getFilteredStores = (selectedProduct, stores, products) => {
  if (!selectedProduct) {
    return stores.map((s) => ({
      ...s,
      icon: createPriceIcon(1, 0, 1),
    }));
  }

  const productPrices = products.filter((p) => p.name === selectedProduct);
  const storeIdsWithProduct = new Set(productPrices.map((p) => p.store_id));

  // Compute min/max prices dynamically (because icons need them)
  const prices = productPrices
    .map((p) => parseInt(p.base_price, 10))
    .filter((p) => !isNaN(p));
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  // Filter stores and attach price/product info
  const filteredStores = stores
    .filter((s) => storeIdsWithProduct.has(String(s.store_id))) // Filter only stores with the product
    .map((store) => {
      const productInfo = productPrices.find(
        (p) => p.store_id === String(store.store_id)
      );
      return {
        ...store,
        base_price: productInfo?.base_price || 0,
        promo_price: productInfo?.promo_price || null,
        icon: createPriceIcon(parseInt(productInfo.base_price, 10), min, max), // Create dynamic price icon
      };
    });

  return filteredStores;
};
