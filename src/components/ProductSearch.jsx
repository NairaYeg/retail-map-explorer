import React, { useContext, useMemo, useState } from 'react';
import { AutoComplete } from 'antd';
import { DataContext } from '../context/DataContext';
import { PLACEHOLDERS } from '../constants/messages';

const ProductSearch = () => {
  const { products, setSelectedProduct } = useContext(DataContext);
  const [inputValue, setInputValue] = useState('');

  const productOptions = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }
    const uniqueProductNames = new Set(products.map(p => p.name));
    return Array.from(uniqueProductNames).map(name => ({ value: name, label: name }));
  }, [products]);

  const handleOnChange = (text) => {
    setInputValue(text);
    if (!text) {
      setSelectedProduct(null);
    }
  };

  const handleOnSelect = (productName) => {
    setInputValue(productName);
    setSelectedProduct(productName);
  };

  const handleOnClear = () => {
    setInputValue('');
    setSelectedProduct(null);
  };

  return (
    <AutoComplete
      value={inputValue}
      options={productOptions}
      style={{ width: '100%', marginBottom: '24px' }}
      placeholder={PLACEHOLDERS.PRODUCT_SEARCH}
      onChange={handleOnChange}
      onSelect={handleOnSelect}
      onClear={handleOnClear}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      allowClear
    />
  );
};

export default ProductSearch;