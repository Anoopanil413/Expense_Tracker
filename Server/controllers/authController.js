const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const Secret_key = process.env.Secret_key
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hsdPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hsdPassword });

    await user.save();
    console.log("Comming down")

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      console.log("Comming down inside errorroro")

        return res.status(400).json({ message: 'Email already exists' });
      }
    if (error.errors && error.errors.email && error.errors.email.kind === 'regexp') {
        return res.status(400).json({ message: 'Invalid email format' });
      }
    res.status(500).json({ message: 'Error registering user !' });
  }
};

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log("got it on",user)

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id },Secret_key, { expiresIn: '10h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in' });
    }
  };
