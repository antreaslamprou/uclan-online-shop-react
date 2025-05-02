import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(){
    const location = useLocation();
    const [active, setActive] = useState<string>('');

    // Get current page from url
    useEffect(() => {
        const path = location.pathname === '/' ? 'home' : location.pathname.slice(1);
        setActive(path);
    }, [location.pathname]);
    
    return (
        <header className="navbar navbar-expand-lg bg-primary text-white py-4">
            <div className="container-fluid">
                <Link to="/" onClick={() => setActive('home')}>
                    <img className="" src="/images/uclanlogo.png" alt="Page Logo" />
                </Link>
                <h1>Student Shop</h1>
                <div className="d-flex gap-2 text-white">
                    <Link to="/" className={active === 'home' ? 'btn active' : 'btn'} onClick={() => setActive('home')}>Home</Link>
                    <Link to="/products" className={active === 'products' ? 'btn active' : 'btn'} onClick={() => setActive('products')}>Products</Link>
                    <Link to="/cart" className={active === 'cart' ? 'btn active' : 'btn'} onClick={() => setActive('cart')}>Cart</Link>
                    <Link to="/login" className={active === 'login' ? 'btn active' : 'btn'} onClick={() => setActive('login')}>Log in</Link>
                </div>
            </div>
        </header>
    );
}