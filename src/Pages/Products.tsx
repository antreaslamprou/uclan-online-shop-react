import React, { lazy } from 'react';

// Lazy load the ProductGrid component
const ProductGrid = lazy(() => import('../Components/ProductsGrid'));

const Page = () => {
  return (
    <div className="container my-4">
        <ProductGrid />
    </div>
  );
};

export default Page;
