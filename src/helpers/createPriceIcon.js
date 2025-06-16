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
  if (min === max) return "#1B9E77"; // Blue-green fallback for single price

  const LOW_PRICE_COLOR = { h: 174, s: 67, l: 46 }; // Blue-green (#1B9E77)
  const HIGH_PRICE_COLOR = { h: 24, s: 98, l: 43 }; // Reddish-orange (#D95F02)

  const percentage = (price - min) / (max - min);

  const hue =
    percentage * (HIGH_PRICE_COLOR.h - LOW_PRICE_COLOR.h) + LOW_PRICE_COLOR.h;
  const saturation =
    percentage * (HIGH_PRICE_COLOR.s - LOW_PRICE_COLOR.s) + LOW_PRICE_COLOR.s;
  const lightness =
    percentage * (HIGH_PRICE_COLOR.l - LOW_PRICE_COLOR.l) + LOW_PRICE_COLOR.l;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
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
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

export default createPriceIcon;
