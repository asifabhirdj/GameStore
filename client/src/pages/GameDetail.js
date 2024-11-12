import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/games/${id}`)
      .then((res) => res.json())
      .then((data) => setGame(data));
  }, [id]);

  if (!game) return <div>Loading...</div>;

  return (
    <div>
      <h1>{game.title}</h1>
      <p>{game.description}</p>
      <p>Release Date: {game.releaseDate}</p>
      <p>Genre: {game.genre}</p>
      <p>Price: ${game.price}</p>
      <p>Rating: {game.rating}</p>
    </div>
  );
};

export default GameDetail;
