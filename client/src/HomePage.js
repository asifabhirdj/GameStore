import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './HomePage.css';

const HomePage = ({ cart, setCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const addToCart = (game) => {
    setCart([...cart, game]);
  };

  const games = [
    { title: 'Grand Theft Auto', price: '$49.99', image: 'https://i.pinimg.com/236x/9a/80/1e/9a801ed0e949aec1fac062cf8196597d.jpg' },
    { title: 'God of War', price: '$59.99', image: 'https://i.pinimg.com/736x/ce/8b/83/ce8b8349a2b94a043c2e3e2a1f2e32e4.jpg' },
    { title: 'Valorant', price: '$39.99', image: 'https://i.pinimg.com/564x/52/ef/a1/52efa15f98506c3ef0d5196366338084.jpg' },
    { title: 'Call of Duty', price: '$59.99', image: 'https://i.pinimg.com/236x/82/23/36/822336fff205caae3c2caca3f18814eb.jpg' },
    { title: 'Free Fire', price: '$59.99', image: 'https://i.pinimg.com/236x/39/12/18/391218a8af89be5a14d23e3c154acded.jpg' },
    { title: 'PUBG', price: '$59.99', image: 'https://i.pinimg.com/236x/3d/f1/f4/3df1f4dbeee5e8c9061514eec460d461.jpg' },
    { title: 'Mario Kart', price: '$59.99', image: 'https://i.pinimg.com/236x/3c/a0/99/3ca09981bd04a635d7378bd64b84faa9.jpg' },
    { title: 'Minecraft', price: '$59.99', image: 'https://i.pinimg.com/236x/24/b4/a1/24b4a1a3db937ab7254575f70922a103.jpg' },
    { title: 'Asphalt 9', price: '$59.99', image: 'https://i.pinimg.com/236x/f5/a2/a9/f5a2a997e8482c8a59c4ec42693c5b1a.jpg' },
    { title: 'San Andreas', price: '$59.99', image: 'https://i.pinimg.com/236x/fc/1f/4f/fc1f4f96871a1dc8d379cae9cc28044e.jpg' },
  ];

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen" style={{ backgroundImage: 'url(https://i.pinimg.com/originals/11/eb/ec/11ebecc7ef79b915f6ee2ca33a5b526a.gif)', backgroundSize: 'cover' }}>
      <header className="bg-black text-white py-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">GameStore</h1>
          <nav className="flex space-x-6">
            <Link to="/" className="hover:text-yellow-500">Home</Link>
            <Link to="/profile" className="hover:text-yellow-500">Profile</Link>
            <Link to="/cart" className="hover:text-yellow-500">Cart ({cart.length})</Link>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Search games..."
              className="py-2 px-4 rounded-lg text-black focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-2 text-gray-500" />
          </div>
        </div>
      </header>

      <section className="py-16 px-6">
        <h3 className="text-3xl font-semibold mb-6 text-center text-white">Featured Games</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredGames.map((game, index) => (
            <div className="game-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition-transform duration-300" key={index}>
              <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <h4 className="text-xl font-semibold mb-2">{game.title}</h4>
                <p className="text-gray-700 mb-4">{game.price}</p>
                <button
                  onClick={() => addToCart(game)}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transform transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate('/purchase')}
                  className="ml-2 mt-2 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg transform transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
