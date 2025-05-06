import React, { lazy } from 'react';

// Lazy load the ProductGrid component
const ProductGrid = lazy(() => import('../Components/ProductsGrid'));

const Products = () => {
  return (
    <>
      <div className="container my-4">
          <div className='flex-3'>
            <h1 className='text-purple text-center mb-4'>All Products</h1>
            <div className='input-group mb-2'>
              <input className='form-control' placeholder='Search' type="text" />
              <button className="btn btn-outline-secondary border-color-grey" type="button"><i className="bi bi-search"></i></button>
            </div>
            <div>
              <h5>Filters:</h5>
              <div className='d-flex gap-4'>
                <div className="input-group">
                  <div className="input-group-text">
                    <input className="form-check-input mt-0" type="checkbox" value="" />
                  </div>
                  <span className="form-control">Hoodie</span>
                </div>
                <div className="input-group">
                  <div className="input-group-text">
                    <input className="form-check-input mt-0" type="checkbox" value="" />
                  </div>
                  <span className="form-control">T-Shirt</span>
                </div>
                <div className="input-group">
                  <div className="input-group-text">
                    <input className="form-check-input mt-0" type="checkbox" value="" />
                  </div>
                  <span className="form-control">Jumper</span>
                </div>
                <div className="input-group">
                  <div className="input-group-text">
                    <input className="form-check-input mt-0" type="checkbox" value="" checked />
                  </div>
                  <span className="form-control">Show All</span>
                </div>
              </div>
            </div>
          </div>
          <hr className='mt-4 mb-5'/>
          <ProductGrid />
      </div>
    </>
  );
};

export default Products;
