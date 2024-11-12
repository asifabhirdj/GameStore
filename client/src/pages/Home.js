import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/games')
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search games"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="game-list">
        {filteredGames.map((game) => (
          <div key={game._id} className="game-card">
            <img src={game.imageUrl} alt={game.title} />
            <h3>{game.title}</h3>
            <Link to={`/game/${game._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
