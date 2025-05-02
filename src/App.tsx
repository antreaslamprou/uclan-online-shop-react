import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Products from './Pages/Products';
import Cart from './Pages/Cart';
import Login from './Pages/Login';

function App() {
  return (
    <div className="layout d-flex flex-column">
      <NavBar/>
      <main className='container-lg my-5 flex-fill d-flex flex-column'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
