import { useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Product from '../Components/Product';

interface Product {
    product_id: number,
    product_title: string,
    product_desc: string,
    product_image: string,
    product_price: number,
    product_type: string
}

export default function ProductsGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 9;
    const didFetch = useRef(false);
    const location = useLocation();

    const [singleProduct, setSingleProduct] = useState<Product | null>(null);

    const fetchData = () => {
        if (productId === -1) fetchProducts();
        else fetchSingleProduct(productId);
    }

    const fetchSingleProduct = async (productId: number) => {
        try {
          const res = await axios.get(`http://localhost:3001/products?id=${productId}`);
          const product = res.data;
          setSingleProduct(product); // use separate state
        } catch (error) {
          console.error('Failed to load single product:', error);
        }
    };
      
    const fetchProducts = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/products?page=${page}&limit=${limit}`);
            
            if(!isLoading) await new Promise(resolve => setTimeout(resolve, 500));
            
            const newProducts = res.data;
            
              // Avoid duplicates
            setProducts(prev => {
                const productIds = new Set(prev.map((p: Product) => p.product_id));
                const unique = newProducts.filter((p: Product) => !productIds.has(p.product_id));
                return [...prev, ...unique];
            });
            setPage(prev => prev + 1);
                
            setIsLoading(false);
            if (newProducts.length < limit) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    };

    const productId = useMemo(() => {
        const param = new URLSearchParams(location.search).get('id');
        return param && !isNaN(Number(param)) ? Number(param) : -1;
    }, [location.search]);

    useEffect(() => {
        setProducts([]);        
        setPage(1);             
        setHasMore(true);       
        setSingleProduct(null); 

        fetchData();
    }, [productId]);

    useEffect(() => {
        if (didFetch.current) return;
        didFetch.current = true;
        fetchData();
    }, []);

    return(
        <>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : singleProduct ? (
                <div className='d-flex'>                   
                    <Product product={singleProduct} dontShowLink={true} />
                </div>
            ) : (
                <InfiniteScroll
                dataLength={products.length}
                next={fetchProducts}
                hasMore={hasMore}
                loader={<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
                endMessage={<p className="text-center my-3">You've reached the end.</p>}>
                    <div className='products-grid d-flex flex-row gap-3 flex-wrap justify-content-center'>
                        {products.map((product, i) => (
                            <Product key={i} product={product} />
                            ))}
                    </div>
                </InfiniteScroll>
            )}
        </>
    );
}