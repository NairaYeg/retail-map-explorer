import L from "leaflet";

/**
 * Calculates a color on a green-to-red gradient based on the price's position between min and max.
 * @param {number} price - The price to evaluate.
 * @param {number} minPrice - The minimum price in the range.
 * @param {number} maxPrice - The maximum price in the range.
 * @returns {string} An RGB color string representing the price's position on the gradient.
 */
const getPriceGradientColor = (price, min, max) => {
  if (min === max) return "#00ff00";
  const percentage = (price - min) / (max - min);
  const hue = (1 - percentage) * 120;
  return `hsl(${hue}, 100%, 45%)`;
};

/**
 * Creates a Leaflet divIcon for a store marker, colored by the product's price.
 * @param {number} price - The product's base price at this store.
 * @param {number} minPrice - The minimum price among all stores.
 * @param {number} maxPrice - The maximum price among all stores.
 * @returns {object} A Leaflet divIcon instance with the appropriate color.
 */
export const createPriceIcon = (price, min, max) => {
  const color = getPriceGradientColor(price, min, max);
  return L.divIcon({
    className: "custom-price-icon",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
    iconSize: [24, 24],
  });
};

export default createPriceIcon;
