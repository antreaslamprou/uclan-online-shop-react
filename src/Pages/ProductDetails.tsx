import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Product from '../Components/Product';
import NotFound from './NotFound';

interface Product {
  product_id: number,
  product_title: string,
  product_desc: string,
  product_image: string,
  product_price: number,
  product_type: string
}

const ProductDetails = () => {
  const { id } = useParams();

  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async (productId: number) => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/products/${productId}`);
        setSingleProduct(res.data);
        console.log(res.data);
      } catch (error) {
        setIsError(true);
        console.error('Failed to load single product:', error);
      } finally {
        setIsLoading(false);
      }
    }
    if (id && !isNaN(Number(id))) {
      fetchProduct(Number(id));
    } else {
      setIsError(true);
    }
  }, [id]);
  
  return (
    <div className="container my-4">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
              <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
              </div>
          </div>
        ) : isError ? (
          <NotFound />
        ) : (
          <Product product={singleProduct!} dontShowLink={true} />
        )}
    </div>
  );
};

export default ProductDetails;
