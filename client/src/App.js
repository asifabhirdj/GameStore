import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import WelcomePage from './WelcomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import CartPage from './CartPage';
import Navbar from './Navbar';
import PurchasePage from './PurchasePage';


// Create a history object
const history = createBrowserHistory();

const App = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  return (
    <HistoryRouter history={history}>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage cart={cart} setCart={setCart} />} />
        <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/purchase" element={<PurchasePage />} />
      </Routes>
    </HistoryRouter>
  );
};

export default App;
