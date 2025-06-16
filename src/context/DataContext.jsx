import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch('/stores_visible.json')
      .then((res) => res.json())
      .then((data) => {
        const formattedStores = data.map((store) => ({
          ...store,
          address: typeof store.address === 'string' ? JSON.parse(store.address) : store.address,
        }));
        setStores(formattedStores);
      })
      .catch((error) => console.error('Error loading stores:', error));

    fetch('/zuegg_products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error loading products:', error));
  }, []);

  return (
    <DataContext.Provider value={{ stores, products, selectedProduct, setSelectedProduct }}>
      {children}
    </DataContext.Provider>
  );
};