import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './PurchasePage.css';

const PurchasePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(state?.cart || []);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [bankAccount, setBankAccount] = useState('');

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      const purchaseData = {
        name,
        address,
        paymentMethod,
        cart,
        ...(paymentMethod === 'credit' && { creditCard, cvv, expiryDate }),
        ...(paymentMethod === 'paypal' && { paypalEmail }),
        ...(paymentMethod === 'bank' && { bankAccount }),
      };

      await axios.post('http://localhost:5000/api/purchase', purchaseData);
      alert('Purchase complete!');
      navigate('/');
    } catch (error) {
      console.error('Error processing purchase:', error);
      alert('An error occurred while processing your purchase. Please try again.');
    }
  };

  // Remove a game from the cart
  const removeFromCart = (gameToRemove) => {
    setCart(cart.filter(game => game.title !== gameToRemove.title));
  };

  return (
    <div className="purchase-page">
      <header className="py-8 text-center">
        <h2 className="purchase-title">Purchase Details</h2>
      </header>

      <form onSubmit={handlePurchase} className="purchase-form">
        {/* Display Cart Items within the form */}
        {cart.length > 0 ? (
          <div className="cart-items">
            {cart.map((game, index) => (
              <div key={index} className="cart-item bg-white text-black p-4 rounded-lg">
                <img src={game.image} alt={game.title} className="rounded-lg w-full" />
                <h4 className="mt-4 text-lg font-semibold">{game.title}</h4>
                <p className="text-gray-600">{game.price}</p>
                <button
                  onClick={() => removeFromCart(game)}
                  className="bg-red-500 text-white p-2 rounded-lg mt-2"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No items to purchase.</p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="purchase-input"
          required
        />
        <input
          type="text"
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="purchase-input"
          required
        />

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="purchase-input"
          required
        >
          <option value="">Select Payment Method</option>
          <option value="credit">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank">Bank Transfer</option>
        </select>

        {/* Conditional fields based on payment method */}
        {paymentMethod === 'credit' && (
          <>
            <input
              type="text"
              placeholder="Credit Card Number"
              value={creditCard}
              onChange={(e) => setCreditCard(e.target.value)}
              className="purchase-input"
              required
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="purchase-input"
              required
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="purchase-input"
              required
            />
          </>
        )}
        {paymentMethod === 'paypal' && (
          <>
            <input
              type="email"
              placeholder="PayPal Email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              className="purchase-input"
              required
            />
            <input
              type="text"
              placeholder="Transaction ID (if available)"
              className="purchase-input"
            />
          </>
        )}
        {paymentMethod === 'bank' && (
          <input
            type="text"
            placeholder="Bank Account Number"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
            className="purchase-input"
            required
          />
        )}

        <button type="submit" className="purchase-button">
          Confirm Purchase
        </button>
      </form>
    </div>
  );
};

export default PurchasePage;
