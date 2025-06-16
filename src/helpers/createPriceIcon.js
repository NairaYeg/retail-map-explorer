import L from "leaflet";

/**
 * Calculates a color in the yellow-to-blue gradient based on the given price range.
 *
 * @param {number} price - The current price.
 * @param {number} min - The minimum price in the range.
 * @param {number} max - The maximum price in the range.
 * @returns {string} The calculated color in HSL format.
 */
const getPriceGradientColor = (price, min, max) => {
  if (min === max) return "#1890ff"; // Blue fallback

  const YELLOW_HUE = 60;
  const BLUE_HUE = 240;
  const SATURATION = 100;
  const LIGHTNESS = 50;

  const percentage = (price - min) / (max - min);
  const hue = percentage * (BLUE_HUE - YELLOW_HUE) + YELLOW_HUE;

  return `hsl(${hue}, ${SATURATION}%, ${LIGHTNESS}%)`;
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
