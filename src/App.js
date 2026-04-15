import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Navigate қосылды
import HomePage from './components/HomePage';
import DetailPage from './components/DetailPage';
import CategoryPage from './components/CategoryPage';
import CartPage from './components/CartPage';
import AuthPage from './components/AuthPage';
import "./assets/style/style.css"; 

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('myCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('myCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isExist = prevCart.find(item => item.id === product.id);
      if (isExist) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert(`${product.title} қосылды!`);
  };

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage cartCount={cartCount} user={user} setUser={setUser} />} />
        
        {/* URL-ді /login және /register деп бөлеміз */}
        <Route path="/login" element={<AuthPage setUser={setUser} />} />
        <Route path="/register" element={<AuthPage setUser={setUser} />} />
        
        {/* Егер біреу ескі /auth жолына кірсе, оны /login-ге жібереміз */}
        <Route path="/auth" element={<Navigate to="/login" />} />

        <Route path="/detail/:id" element={<DetailPage addToCart={addToCart} cartCount={cartCount} />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      </Routes>
    </div>
  );
}

export default App;