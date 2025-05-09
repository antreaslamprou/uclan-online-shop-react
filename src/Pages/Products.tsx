import React, { lazy } from 'react';

// Lazy load the ProductGrid component
const ProductGrid = lazy(() => import('../Components/ProductsGrid'));

const Products = () => {
  return (
    <ProductGrid />
  );
};

export default Products;
