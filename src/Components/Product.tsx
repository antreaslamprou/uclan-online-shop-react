import { Link } from 'react-router-dom';

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
    dontShowLink?: boolean
  }

export default function Product(props: Props) {
    return (
        <div key={props.product.product_id} className="card product">
            {props.dontShowLink && (<Link to="/products" className="position-absolute top-0 left-0"><i className="bi bi-chevron-left"></i></Link>)}
            <img loading="lazy" src={props.product.product_image} className="card-img-top" alt={props.product.product_title} />
            <div className="card-body bg-body-secondary">
                <h5 className="card-title text-orange">{props.product.product_title}</h5>
                <span className="card-text">
                    {props.product.product_desc}.
                    {!props.dontShowLink && (<Link to={`/products?id=${props.product.product_id}`} className="card-text btn d-inline-block p-0 text-primary ps-1">Read More</Link>)}
                </span>
                <p className="fw-bold">£ {props.product.product_price}</p>
                <a href="#" className="btn btn-primary py-2 px-4">Buy</a>
            </div>
        </div>
    );
}