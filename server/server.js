const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Ensure this path is correct
const Purchase = require('./models/Purchase')
require('dotenv').config(); // To use environment variables

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Atlas Connection URI from environment variable
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://bhukyabhiram1:abhi2003@cluster0.yyi2i5k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    console.log('New User Created:', newUser);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/purchase', async (req, res) => {
  try {
    const { name, address, paymentMethod, cart, creditCard, cvv, expiryDate, paypalEmail, bankAccount } = req.body;
    console.log(req.body);
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

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
