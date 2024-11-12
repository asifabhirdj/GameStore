// routes/purchase.js
const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

// POST /api/purchase
router.post('/', async (req, res) => {
  try {
    const { name, address, paymentMethod, cart, creditCard, cvv, expiryDate, paypalEmail, bankAccount } = req.body;

    // Create a new purchase document
    const newPurchase = new Purchase({
      name,
      address,
      paymentMethod,
      cart,
      creditCard: paymentMethod === 'credit' ? creditCard : undefined,
      cvv: paymentMethod === 'credit' ? cvv : undefined,
      expiryDate: paymentMethod === 'credit' ? expiryDate : undefined,
      paypalEmail: paymentMethod === 'paypal' ? paypalEmail : undefined,
      bankAccount: paymentMethod === 'bank' ? bankAccount : undefined,
    });

    // Save to the database
    await newPurchase.save();

    res.status(201).json({ message: 'Purchase successful!' });
  } catch (error) {
    console.error('Error saving purchase:', error);
    res.status(500).json({ message: 'An error occurred while processing the purchase.' });
  }
});

module.exports = router;
