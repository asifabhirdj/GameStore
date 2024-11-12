const Game = require('../models/Game');

exports.getGames = async (req, res) => {
  const games = await Game.find();
  res.json(games);
};

exports.getGameById = async (req, res) => {
  const game = await Game.findById(req.params.id);
  res.json(game);
};
