import { createPriceIcon } from "./createPriceIcon";
import L from "leaflet";

/**
 * Filters stores and prepares dynamic icons.
 * @param {string|null} selectedProduct The selected product name.
 * @param {Array} stores The array of stores.
 * @param {Array} products The array of products.
 * @returns {Array} filtered stores with price info and icons
 */
export const getFilteredStores = (selectedProduct, stores, products) => {
  if (!selectedProduct) {
    return {
      filteredStores: stores.map((s) => ({
        ...s,
        icon: new L.Icon.Default(),
      })),
      minPrice: null,
      maxPrice: null,
    };
  }

  const productPrices = products.filter((p) => p.name === selectedProduct);
  const storeIdsWithProduct = new Set(productPrices.map((p) => p.store_id));

  const prices = productPrices
    .map((p) => parseInt(p.base_price, 10))
    .filter((p) => !isNaN(p));
  const minPrice = prices.length > 0 ? Math.min(...prices) / 100 : null;
  const maxPrice = prices.length > 0 ? Math.max(...prices) / 100 : null;
  const minPriceForColor = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPriceForColor = prices.length > 0 ? Math.max(...prices) : 0;

  const filteredStores = stores
    .filter((s) => storeIdsWithProduct.has(String(s.store_id)))
    .map((store) => {
      const productInfo = productPrices.find(
        (p) => p.store_id === String(store.store_id)
      );
      return {
        ...store,
        base_price: productInfo?.base_price || 0,
        promo_price: productInfo?.promo_price || null,
        icon: createPriceIcon(
          parseInt(productInfo?.base_price || 0, 10),
          minPriceForColor,
          maxPriceForColor
        ),
      };
    });

  return {
    filteredStores,
    minPrice,
    maxPrice,
  };
};
