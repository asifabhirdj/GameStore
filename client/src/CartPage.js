import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import './CartPage.css'; // Import the CSS

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  // Remove a game from the cart
  const removeFromCart = (gameToRemove) => {
    setCart(cart.filter(game => game.title !== gameToRemove.title));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-extrabold text-yellow-500">Your Cart</h1>
      </header>

      <section className="py-16 px-8">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {cart.map((game, index) => (
              <div key={index} className="bg-white text-black p-4 rounded-lg">
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
          <p className="text-center">Your cart is empty. Add some games!</p>
        )}

        {/* Purchase Button */}
        {cart.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/purchase', { state: { cart } })}
              className="bg-green-500 text-white py-2 px-6 rounded-lg"
            >
              Proceed to Purchase
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default CartPage;
