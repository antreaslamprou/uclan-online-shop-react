import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Product {
    product_id: number;
    product_title: string;
    product_desc: string;
    product_image: string;
    product_price: number;
    product_type: string;
}

interface Props {
    product: Product,
    isSingleProduct?: boolean
}

export default function Product(props: Props) {
    const [toastType, setToastType] = useState<"success" | "danger">("success");
    const [showToast, setShowToast] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
    if (showToast) {
        const timer = setTimeout(() => {
        setShowToast(false);
        }, 3000);

        return () => clearTimeout(timer);
    }
    }, [showToast, toastType]);

    function changeToast(type: "success" | "danger") {
        setToastType(type);
        setShowToast(true);
    }

    const addToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
        
        if (existingCart.some(item => item.product_id === props.product.product_id)) {
            changeToast("danger");
            return;
        } else {
            changeToast("success");
        }
        
        existingCart.push({
            product_id: props.product.product_id,
            product_title: props.product.product_title,
            product_image: props.product.product_image,
            product_price: props.product.product_price,
            product_desc: props.product.product_desc,
            product_type: props.product.product_type
        });
      
        localStorage.setItem('cart', JSON.stringify(existingCart));
    };

    function capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <> 
        {showToast && (
            <div
                className={`text-bg-${toastType} toast align-items-center border-0 position-fixed top-0 start-50 translate-middle-x p-3 show`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{ zIndex: 9999 }}
            >
                <div className="d-flex">
                <div className="toast-body">
                    {toastType === 'success' ? "Product added to cart successfully!" : "Product already added to cart!"}
                </div>
                <button
                    type="button"
                    className="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                    onClick={() => setShowToast(false)}
                ></button>
                </div>
            </div>
        )}  
        <div key={props.product.product_id} className="card product">
            {props.isSingleProduct && (<Link to="/products" className="position-absolute top-0 left-0"><i className="bi bi-chevron-left px-1"></i></Link>)}
            {!loaded && <Skeleton className='card-img-top mt-0 pt-0' style={{width: '100%', aspectRatio: '1 / 1' }}/>}
            <img 
                loading="lazy" 
                src={`/${props.product.product_image}`} 
                className="card-img-top" 
                alt={props.product.product_title} 
                onLoad={() => setLoaded(true)} />
            <div className="card-body bg-body-secondary d-flex flex-column justify-content-between">
                <h5 className="card-title text-orange">{props.product.product_title}</h5>
                <div>
                    <p className="card-text mb-0">
                        {capitalize(props.product.product_desc)}.
                    </p>
                    {!props.isSingleProduct && (<Link to={`/products/${props.product.product_id}`} className="card-text btn border-0 p-0 text-primary text-start">Read More</Link>)}
                    <p className="fw-bold">£ {props.product.product_price}</p>
                    <button onClick={addToCart} className="btn btn-primary py-2 px-4">Buy</button>
                </div>
            </div>
        </div>
        </>
    )
}