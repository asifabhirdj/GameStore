// models/Purchase.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  cart: [
    {
      title: { type: String, required: true },
      price: { type: String, required: true },
      image: { type: String, required: true },
    }
  ],
  creditCard: { type: String },
  cvv: { type: String },
  expiryDate: { type: String },
  paypalEmail: { type: String },
  bankAccount: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
