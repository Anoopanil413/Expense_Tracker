const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
  },
  budgetLimit: {
    type: Number,
    default: 0, 
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;