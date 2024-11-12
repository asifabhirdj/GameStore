const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date },
  genre: { type: String },
  price: { type: Number },
  imageUrl: { type: String },
  rating: { type: Number },
});

module.exports = mongoose.model('Game', gameSchema);
