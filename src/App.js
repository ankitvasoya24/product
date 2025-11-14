import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Product from './Pages/Product';
import Header from './Component/Header';
import Cart from './Pages/Cart';
import Footer from './Footer.jsx'

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: qty } : item
        )
      );
    }
  };

  return (
    <div className="app-container">
      <ToastContainer />
      <BrowserRouter>
        <Header cart={cart} />
        <div className="content-wrap">
          <Routes>
            <Route path="/product" element={<Product addToCart={addToCart} />} />
            <Route
              path="/category/:slug"
              element={<Product addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              }
            />
          </Routes>
        </div>
        <Footer /> {/* ✅ Always visible */}
      </BrowserRouter>
    </div>
  );
}

export default App;
