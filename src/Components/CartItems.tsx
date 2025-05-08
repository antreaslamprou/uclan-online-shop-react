import { useState, useEffect } from 'react';

interface Product {
    product_id: number,
    product_title: string,
    product_desc: string,
    product_image: string,
    product_price: string,
    product_type: number,
}

export default function CartItems() {
    const [cart, setCart] = useState<Product[]>([]);
    const [total, setTotal] = useState<number>(0.00);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(savedCart);
    }, []);

    useEffect(() => {
        const sum = cart.reduce((acc, item) => acc + parseFloat(item.product_price.toString()), 0);
        setTotal(parseFloat(sum.toFixed(2)));
    }, [cart]);

    const removeProduct = (id: number) => {
        const updatedCart = cart.filter(item => item.product_id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
    };

    return (
        <div>
          {cart.length === 0 ? (
            <h3 className="border border-2 rounded p-2 text-center"><i className="bi bi-cart"></i> Your cart is empty!</h3>
          ) : (
            <>
                <div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>A/a</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                        <tr key={item.product_id} className='align-middle'>
                            <td className='text-center'>{index+1}</td>
                            <td className='text-center'><img src={item.product_image} alt={item.product_title} style={{ width: '50px' }} /></td>
                            <td>{item.product_title}</td>
                            <td>£ {item.product_price}</td>
                            <td className='text-center'><button onClick={() => removeProduct(item.product_id)} className='btn border-0'><i className="bi bi-trash-fill"></i></button></td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                <hr/>
                <div className='d-inline-flex align-items-center mb-3 justify-content-between w-100 pe-3'>
                    <span>You have <span className='fw-bold'>{cart.length} {cart.length === 1 ? 'item' : 'items'}</span><br className='d-md-none'/> in your cart</span>
                    <div className='d-flex align-items-center gap-3'>
                        <h5 className='m-0'>Subtotal:</h5>
                        <span className='fw-bold pt-1'>£ {total}</span>
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-primary' onClick={clearCart}><i className="bi bi-cart-x-fill"></i> Empty Cart</button>
                    <button className='btn btn-b bg-success text-white' onClick={clearCart}><i className="bi bi-cart-check-fill"></i> Checkout</button>
                </div>
            </>
          )}
    
        </div>
    );
}