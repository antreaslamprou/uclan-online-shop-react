import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(){
    const location = useLocation();
    const [active, setActive] = useState('');
    const [cartItems, setCartItems] = useState(0);

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const path = location.pathname === '/' ? 'home' : location.pathname.slice(1);
        setActive(path);
        // const cartData = JSON.parse(localStorage.getItem('cart') || '[]').length;
        // setCartItems(cartData ? cartData : 0);
    }, [location.pathname]);    

   useEffect(() => {
        const handleCartUpdate = () => {
            const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartItems(updatedCart.length);
        };

        window.addEventListener('cart-updated', handleCartUpdate);

        // Optional: Initialize on mount
        handleCartUpdate();

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
        };
    }, []);

    return (
        <header className="navbar navbar-expand-lg bg-primary text-white py-4">
            <div className="container-fluid justify-content-between">
                <Link to="/" onClick={() => setActive('home')}>
                    <img className="ps-2 d-none d-lg-block" src="/images/uclanlogo.png" alt="Page Logo" />
                    <img className="ps-2 d-block d-lg-none" src="/images/uclanicon.png" alt="Page Logo" />
                </Link>
                <h1>Student Shop</h1>
                <div className="d-none d-lg-block d-flex gap-2 text-white">
                    <Link to="/" className={active === 'home' ? 'btn active' : 'btn'} onClick={() => setActive('home')}><i className="bi bi-house-fill"></i><br/>Home</Link>
                    <Link to="/products" className={active === 'products' ? 'btn active' : 'btn'} onClick={() => setActive('products')}><i className="bi bi-table"></i><br/>Products</Link>
                    <Link to="/cart" className={active === 'cart' ? 'btn active' : 'btn'} onClick={() => setActive('cart')}><i className="bi bi-cart-fill position-relative">{cartItems > 0 && (
                        <span className='position-absolute ms-1 mt-1 top-0 start-100 translate-middle badge rounded-pill bg-secondary'>{cartItems}</span>
                    )}</i><br/>Cart </Link>
                    <Link to="/profile" className={active === 'profile' || active === 'login' ? 'btn active' : 'btn'} onClick={() => setActive('profile')}><i className="bi bi-person-circle"></i><br/>Profile</Link>
                </div>
                <button className="d-block d-lg-none navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <i className="bi bi-list fs-1 text-white"></i>
                </button>
                <div className="offcanvas offcanvas-end d-lg-none bg-primary text-white" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" ref={closeButtonRef} aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <Link to="/" className={active === 'home' ? 'btn active' : 'btn'} onClick={() => {setActive('home'); if (closeButtonRef.current) closeButtonRef.current.click();}}><i className="bi bi-house-fill"></i> Home</Link>
                            <Link to="/products" className={active === 'products' ? 'btn active' : 'btn'} onClick={() => {setActive('products'); if (closeButtonRef.current) closeButtonRef.current.click();}}><i className="bi bi-table"></i> Products</Link>
                            <Link to="/cart" className={active === 'cart' ? 'btn active' : 'btn'} onClick={() => {setActive('cart'); if (closeButtonRef.current) closeButtonRef.current.click();}}><i className="bi bi-cart-fill"></i> Cart</Link>
                            <Link to="/profile" className={active === 'profile' || active === 'login' ? 'btn active' : 'btn'} onClick={() => {setActive('profile'); if (closeButtonRef.current) closeButtonRef.current.click();}}><i className="bi bi-person-circle"></i> Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}