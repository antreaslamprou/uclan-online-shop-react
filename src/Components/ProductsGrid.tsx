import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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
    const [totalProducts, setTotalProducts] = useState(0);
    const limit = 12;
    const [hasMore, setHasMore] = useState(true);

    const [search, setSearch] = useState('');

    const [activeFilters, setActiveFilters] = useState(0);
    
    const [showHoodies, setShowHoodies] = useState(false);
    const [showJumpers, setShowJumpers] = useState(false);
    const [showTshirts, setShowTshirts] = useState(false);
      
    const fetchProducts = async (pageOverride?: number) => {
        try {
            const currentPage = pageOverride ?? page;
            let searchParam = '';
            const filterParams: string[] = [];
    
            if (search !== '') {
                const searchEncoded = encodeURIComponent(search);
                searchParam = `&search=%${searchEncoded}%`;
            }
            if (showHoodies || showJumpers || showTshirts) {
                if (showHoodies) filterParams.push("&type=UCLan Hoodie");
                if (showJumpers) filterParams.push("&type=UCLan Logo Jumper");
                if (showTshirts) filterParams.push("&type=UCLan Logo Tshirt");
            }
            
            const filtersQuery = filterParams.join('');
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/products?page=${currentPage}&limit=${limit}${filtersQuery}${searchParam}`);
            setTotalProducts(res.data.total);
            const newProducts = res.data.products;
    
            setProducts(prev => {
                const productIds = new Set(prev.map((p: Product) => p.product_id));
                const unique = newProducts.filter((p: Product) => !productIds.has(p.product_id));
                return [...prev, ...unique];
            });
    
            if (newProducts.length < limit) {
                setHasMore(false);
            } else {
                setPage(currentPage + 1);
            }
    
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    };

    const clearFilters = () => {
        setShowHoodies(false);
        setShowJumpers(false);
        setShowTshirts(false);
    }

    useEffect(() => {
        setIsLoading(true);
        setProducts([]);
        setPage(2); // since we’ll fetch page 1 manually below
        setHasMore(true);
        fetchProducts(1); // always fetch first page
    }, [search, showHoodies, showJumpers, showTshirts]);

    useEffect(() => {
        var counter = 0;
        [showHoodies, showJumpers, showTshirts].map((item) => {
            if (item) counter++;
        })
        setActiveFilters(counter);
    }, [showHoodies, showJumpers, showTshirts]);

    return(
        <>
            <div className='flex-3'>
                <div className='input-group mb-4'>
                    <button className="btn btn-outline-secondary border-color-grey" type="button" disabled={true}><i className="bi bi-search"></i></button>
                    <input className='form-control' placeholder='Search' type="text" onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="accordion" id="filtersAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <h5><i className="bi bi-funnel-fill"></i> Filters {activeFilters > 0 ? (<span className='badge rounded-circle bg-primary text-white ms-2 px-2 py-1'>{activeFilters}</span>) : ''}</h5>
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#filtersAccordion">
                        <div className='row accordion-body'>
                        <div className='col-6 col-md-3 p-2'>
                            <div className="input-group">
                                <div className="input-group-text">
                                    <input className="form-check-input mt-0" type="checkbox" onChange={() => setShowHoodies(prev => !prev)} checked={showHoodies} />
                                </div>
                                <span className="form-control">Hoodie</span>
                            </div>  
                        </div>
                        <div className='col-6 col-md-3 p-2'>
                            <div className="input-group">
                                <div className="input-group-text">
                                    <input className="form-check-input mt-0" type="checkbox" onChange={() => setShowJumpers(prev => !prev)} checked={showJumpers} />
                                </div>
                                <span className="form-control">Jumper</span>
                            </div>
                        </div>
                        <div className='col-6 col-md-3 p-2'>
                            <div className="input-group">
                                <div className="input-group-text">
                                    <input className="form-check-input mt-0" type="checkbox" onChange={() => setShowTshirts(prev => !prev)} checked={showTshirts}/>
                                </div>
                                <span className="form-control">T-Shirt</span>
                            </div>
                        </div>
                        <div className='col-6 col-md-3 p-2'>
                            <div className="input-group">
                                <button onClick={clearFilters} className="btn btn-primary w-100 border-0" disabled={!(showHoodies || showJumpers || showTshirts)}>Show All</button>
                            </div>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>                    
            </div>
            <hr className='mt-4 mb-3'/>
            {products.length > 0 && <p>Showing {products.length} of {totalProducts} products:</p>}
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : products.length === 0 ? (
                <p className="text-center my-4">No products found for the selected filters.</p>
            ) : (
                <InfiniteScroll
                dataLength={products.length}
                next={() => fetchProducts()}
                hasMore={hasMore}
                className='overflow-hidden'
                loader={<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>}
                endMessage={<p className="text-center my-3">You've reached the end.</p>}>
                    <div className='row products-grid flex-wrap justify-content-center'>
                        {products.map((product) => (
                            <div key={product.product_id} className='col-6 col-lg-4 pb-4 d-flex' >
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            )}
        </>
    );
}